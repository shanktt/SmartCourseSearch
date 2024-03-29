import prisma from '../lib/prisma.js'
import { pipeline } from '@xenova/transformers';
import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config({ path: '../.env.development.local' })


if (!process.env.POSTGRES_URL) {
  throw new Error('process.env.POSTGRES_URL is not defined. Please set it.')
}
// TODO add check to see if db already seeded
async function main() {
    // Get the path to the JSON file from the command line arguments
    const filePath = process.argv[2]
    if (!filePath) {
      console.error('Please provide a path to the JSON file')
      process.exit(1)
    }
  
    // Read the file and parse the JSON
    const fileContents = fs.readFileSync(filePath, 'utf-8')
    const records = JSON.parse(fileContents)
  
    // Initialize sentence-embedding model
    const pipe = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2', {
        quantized: false,
    });

    // Iterate over each record and create a new entry in the database
    for (let record of records) {  
        // const course = await prisma.course.create({
        //     data: {
        //         Major: record.Major,
        //         MajorAbbreviation: record['Major Abbreviation'],
        //         CourseNumber: record['Course Number'],
        //         CourseName: record['Course Name'],
        //         Description: record.Description,
        //         CreditHours: record['Credit Hours'],
        //         AverageGPA: record['Average GPA'],
        //         MinCreditHours: record.min_credit_hours,
        //         MaxCreditHours: record.max_credit_hours,
        //         DegreeAttributes: record['Degree Attributes']
        //     }
        // })

        // Add the embedding
        let embedding = await pipe(record.Description, { pooling: 'mean', normalize: true });
        let embeddingArray = Array.from(embedding.data);
        console.log(embeddingArray.toString());
        break
        // await prisma.$executeRaw`
        //     UPDATE Course
        //     SET embedding = ${embeddingArray}::vector
        //     WHERE id = ${course.id}
        // `
         
        // console.log(`Added ${course['MajorAbbreviation']} ${course['CourseNumber']}`)
    }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })