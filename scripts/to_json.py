import json
import pandas as pd

df = pd.read_csv('data/final.csv')
df = df

data = []
columns = df.columns
# print(columns)

def fix_list (bad_list):
    res = bad_list.strip('][').split(', ')
    res = [int(x) for x in res]
    return res

def fix_list_str (bad_list):
    res = bad_list.strip('][').split(', ')
    res = [x.replace("'", "").strip() for x in res]
    return res


for i, row in df.iterrows():
    dic_entry = {}
    for idx, (col,val) in enumerate(zip(columns,row)):
        if idx == 4:
            dic_entry[col] = int(val)
        elif idx == 5:
            if isinstance(val, str):
                dic_entry[col] = fix_list_str (val)
            else:
                dic_entry[col] = []
        elif idx == 7:
            if isinstance(val, float):
                dic_entry[col] = 'None'
            else:
                dic_entry[col] = val
        elif idx == 8:
            if isinstance(val, str):
                dic_entry[col] = fix_list(val)
            else:
                dic_entry[col] = []
        else:
            dic_entry[col] = val

    data.append((dic_entry))
    # break
    # for c, v in 

# result = df.to_json(orient="split")
# parsed = json.loads(result)
# # print(json.dumps(parsed, indent=4))
# test = json.dumps(parsed)

# # print(type(parsed))

with open("final.json", "w") as outfile:
    outfile.write(json.dumps(data))
