// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
const weaviate = require("weaviate-client");

const client = weaviate.client({
  scheme: "https",
  host: process.env.WV_HOST,
  authClientSecret: new weaviate.AuthUserPasswordCredentials({
    username: process.env.WV_USERNAME,
    password: process.env.WV_SECRET,
    scopes: ["offline_access"]  // optional, depends on the configuration of your identity provider (not required with WCS)
  }),
});

const getEmbeddings = async (query) => {
  let payload = {
    'inputs': query
  }
  const response = await fetch(
      process.env.HF_API_URL,
      {
        headers: { Authorization: `Bearer ${process.env.HF_API_SECRET}`, 'Content-Type': 'application/json'},
        method: "POST",
        body: JSON.stringify(payload),
      }
  );
  const result = await response.json();
  return result['embeddings'];
}

const getSimilarCourses = async (query, filterOptions) => {
  const embedding = await getEmbeddings(query)
  const CLASS_NAME = 'Course'

// IMPLEMENT SEARCH
  // return search

  return embedding
}



export default async function handler(req, res) {
  const {query, filterOptions} = req.body;
  const similarCourses = getSimilarCourses(query, filterOptions)
  console.log({query})
  console.log({filterOptions})
  res.status(200).json(similarCourses)
}
