from openai.embeddings_utils import get_embedding, cosine_similarity
import openai
import pandas as pd
import numpy as np

def get_embedding(text, model="text-embedding-ada-002"):
   text = text.replace("\n", " ")
   return openai.Embedding.create(input = [text], model=model)['data'][0]['embedding']

df = pd.read_csv('data/final.csv')
df['ada_embedding'] = df['Description Vectorized'].apply(eval).apply(np.array)
# df['ada_embedding'] = df.combined.apply(lambda x: get_embedding(x, model='text-embedding-ada-002'))
# df.to_csv('output/embedded_1k_reviews.csv', index=False)

def search_reviews(df, product_description, n=3, pprint=True):
   embedding = get_embedding(product_description, model='text-embedding-ada-002')
   df['similarities'] = df.ada_embedding.apply(lambda x: cosine_similarity(x, embedding))
   res = df.sort_values('similarities', ascending=False).head(n)
   return res
 
res = search_reviews(df, 'vr development', n=3)