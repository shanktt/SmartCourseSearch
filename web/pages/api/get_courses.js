// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import filterOptions from "@/components/FilterOptions";
import {console} from "next/dist/compiled/@edge-runtime/primitives/console";
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

const getPath = (option) => {
  if (option.value < 11) {
    return "degree_attrs_codes"
  } else {
    return "credit_hours"
  }
}

const getFilterObj = (filterOptions) => {
  let operands = []
  for (let i = 0; i < filterOptions.length; i++) {
    let path = getPath(filterOptions[i])
    let val = filterOptions[i].value
    if (val >= 12) {
      val -= 11
    }
    let opObj = {
      "path": [path],
        "operator": "Equal",
        "valueInt": val
    }
    operands.push(opObj)
  }
  return {
    "operator": "And",
    "operands":operands
  }
}

const getSimilarCourses = async (query, filterOptions) => {
  const embedding = await getEmbeddings(query)
  const CLASS_NAME = 'Course'
  const filterObj = getFilterObj(filterOptions)
  let weaviateRes;
  if (filterOptions.length > 0) {
    weaviateRes = await client.graphql
        .get()
        .withClassName(CLASS_NAME)
        .withFields(["subject", "course", "name", "avg_grade", "description", "degree_attrs_codes"])
        .withWhere(filterObj)
        .withNearVector({vector: embedding})
        .withLimit(7)
        .do()
  } else {
    weaviateRes = await client.graphql
        .get()
        .withClassName(CLASS_NAME)
        .withFields(["subject", "course", "name", "avg_grade", "description", "degree_attrs_codes"])
        .withNearVector({vector: embedding})
        .withLimit(7)
        .do()
  }
  const matchingText = weaviateRes.data.Get[CLASS_NAME]
  return matchingText

// IMPLEMENT SEARCH
  // return search

  return embedding
}



export default async function handler(req, res) {
  const {query, filterOptions} = req.body;
  const similarCourses = await getSimilarCourses(query, filterOptions)
  res.status(200).json(similarCourses)
}
