import prisma from '@/lib/prisma'
import PipelineSingleton from '@/lib/pipeline';

const getEmbeddings = async (query) => {
  const pipe = await PipelineSingleton.getInstance();

  let embedding = await pipe(query, { pooling: 'mean', normalize: true });
  let embeddingArray = Array.from(embedding.data);

  return embeddingArray;
}

const getSimilarCourses = async (query, filterOptions, filterOptionsCreditHours) => {
  const embedding = await getEmbeddings(query);
  const vectorQuery = `[${embedding.join(',')}]`

  // Check if filterOptions is defined, if not set it to an empty array
  filterOptions = filterOptions || [];

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
