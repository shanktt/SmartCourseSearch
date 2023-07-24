import prisma from '@/lib/prisma'
import { pipeline } from '@xenova/transformers';

const getEmbeddings = async (query) => {
  // Initialize sentence-embedding model
  const pipe = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2', {
    quantized: false,
  });

  let embedding = await pipe(query, { pooling: 'mean', normalize: true });
  let embeddingArray = Array.from(embedding.data);

  return embeddingArray;
}

const getPath = (option) => {
  if (option.value < 11) {
    return "degree_attrs_codes"
  } else {
    return "credit_hours"
  }
}

const getFilterObj = (filterOptions) => {

}

const formatArrayForSql = (arr) => {
  return arr.map(value => `'${value.replace(/'/g, "''")}'`).join(', ');
}

const getSimilarCourses = async (query, filterOptions, filterOptionsCreditHours) => {
  const embedding = await getEmbeddings(query);
  const vectorQuery = `[${embedding.join(',')}]`

  // Extract attribute values
  const attributeValues = filterOptions.map(option => option.value);

  // Extract credit hour count
  const creditHourCount = filterOptionsCreditHours ? filterOptionsCreditHours.value : undefined;

  let result;

  if (attributeValues.length > 0 && creditHourCount !== undefined) {
    result = await prisma.$queryRaw`
      SELECT 
        "id", 
        "Major", 
        "MajorAbbreviation", 
        "CourseNumber", 
        "CourseName", 
        "Description", 
        "CreditHours", 
        "AverageGPA", 
        "MinCreditHours", 
        "MaxCreditHours", 
        "DegreeAttributes"
      FROM "course"
      WHERE ARRAY[${attributeValues}] <@ "DegreeAttributes"
      AND "MinCreditHours" <= ${creditHourCount}
      AND "MaxCreditHours" >= ${creditHourCount}
      ORDER BY "embedding" <=> ${vectorQuery}::vector
      LIMIT 7;
    `
  } else if (attributeValues.length > 0) {
    result = await prisma.$queryRaw`
      SELECT 
        "id", 
        "Major", 
        "MajorAbbreviation", 
        "CourseNumber", 
        "CourseName", 
        "Description", 
        "CreditHours", 
        "AverageGPA", 
        "MinCreditHours", 
        "MaxCreditHours", 
        "DegreeAttributes"
      FROM "course"
      WHERE ARRAY[${attributeValues}] <@ "DegreeAttributes"
      ORDER BY "embedding" <=> ${vectorQuery}::vector
      LIMIT 7;
    `
  } else if (creditHourCount !== undefined) {
    result = await prisma.$queryRaw`
      SELECT 
        "id", 
        "Major", 
        "MajorAbbreviation", 
        "CourseNumber", 
        "CourseName", 
        "Description", 
        "CreditHours", 
        "AverageGPA", 
        "MinCreditHours", 
        "MaxCreditHours", 
        "DegreeAttributes"
      FROM "course"
      WHERE "MinCreditHours" <= ${creditHourCount}
      AND "MaxCreditHours" >= ${creditHourCount}
      ORDER BY "embedding" <=> ${vectorQuery}::vector
      LIMIT 7;
    `
  } else {
    result = await prisma.$queryRaw`
      SELECT 
        "id", 
        "Major", 
        "MajorAbbreviation", 
        "CourseNumber", 
        "CourseName", 
        "Description", 
        "CreditHours", 
        "AverageGPA", 
        "MinCreditHours", 
        "MaxCreditHours", 
        "DegreeAttributes"
      FROM "course"
      ORDER BY "embedding" <=> ${vectorQuery}::vector
      LIMIT 7;
    `
  }

  // console.log(result);

  return result;
}




export default async function handler(req, res) {
  const {query, filterOptions, filterOptionsCreditHours} = req.body;
  const similarCourses = await getSimilarCourses(query, filterOptions, filterOptionsCreditHours);
  res.status(200).json(similarCourses)
  // res.status(200).json('hi')
}
