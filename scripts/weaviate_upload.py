import weaviate

client = weaviate.Client(
    url = "https://smartcoursesearch2.weaviate.network",  # Replace with your endpoint
)

class_obj = {
    "class": "Question",
    "vectorizer": "text2vec-openai"  # Or "text2vec-cohere" or "text2vec-huggingface"
}

client.schema.create_class(class_obj)