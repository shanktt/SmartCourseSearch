import pandas as pd
import numpy as np

enums = {
    'Nat Sci & Tech - Phys Sciences course': 'Nat Sci & Tech', 
    'Social & Beh Sci - Beh Sci': 'Social & Beh Sci', 
    'Social & Beh Sci - Soc Sci course': 'Social & Beh Sci', 
    'Advanced Composition': 'Advanced Composition', 
    'Nat Sci & Tech - Life Sciences course': 'Nat Sci & Tech', 
    'Grand Challenge-Sustainability course': 'Grand Challenge', 
    'Camp Honors/Chanc Schol course': 'Camp Honors/Chanc Schol course', 
    'Nat Sci & Tech - Life Sciences': 'Nat Sci & Tech', 
    'Nat Sci & Tech - Phys Sciences': 'Nat Sci & Tech', 
    'Quantitative Reasoning II': 'Quantitative Reasoning II', 
    'Humanities - Lit & Arts': 'Humanities', 
    'Camp Honors/Chanc Schol': 'Camp Honors/Chanc Schol', 
    'Humanities - Hist & Phil': 'Humanities', 
    'Grand Challenge-Health/Well': 'Grand Challenge', 
    'Cultural Studies - Non-West': 'Cultural Studies', 
    'Social & Beh Sci - Soc Sci': 'Social & Beh Sci', 
    'Advanced Composition course': 'Advanced Composition course', 
    'Quantitative Reasoning II course': 'Quantitative Reasoning II course', 
    'Cultural Studies - US Minority course': 'Cultural Studies', 
    'Social & Beh Sci - Beh Sci course': 'Social & Beh Sci', 
    'Grand Challenge-Sustainability': 'Grand Challenge', 
    'Composition I course': 'Composition I course', 
    'Cultural Studies - US Minority': 'Cultural Studies', 
    'Cultural Studies - Non-West course': 'Cultural Studies', 
    'Humanities - Lit & Arts course': 'Humanities', 
    'Cultural Studies - Western': 'Cultural Studies', 
    'Quantitative Reasoning I course': 'Quantitative Reasoning I course', 
    'Humanities - Hist & Phil course': 'Humanities', 
    'Cultural Studies - Western course': 'Cultural Studies', 
    'James Scholars course': 'James Scholars course', 
    'Grand Challenge-Inequality': 'Grand Challenge'
}

# enums_top_level = {
# 'Nat Sci & Tech - Phys Sciences course': 0,
# 'Social & Beh Sci - Beh Sci': 1,
# 'Social & Beh Sci - Soc Sci course': 2,
# 'Advanced Composition': 3,
# 'Nat Sci & Tech - Life Sciences course': 4,
# 'Grand Challenge-Sustainability course': 5,
# 'Camp Honors/Chanc Schol course': 6,
# 'Nat Sci & Tech - Life Sciences': 7,
# 'Nat Sci & Tech - Phys Sciences': 8,
# 'Quantitative Reasoning II': 9,
# 'Humanities - Lit & Arts': 10,
# 'Camp Honors/Chanc Schol': 11,
# 'Humanities - Hist & Phil': 12,
# 'Grand Challenge-Health/Well': 13,
# 'Cultural Studies - Non-West': 14,
# 'Social & Beh Sci - Soc Sci': 15,
# 'Advanced Composition course': 16,
# 'Quantitative Reasoning II course': 17,
# 'Cultural Studies - US Minority course': 18,
# 'Social & Beh Sci - Beh Sci course': 19, 
# 'Grand Challenge-Sustainability': 20,
# 'Composition I course': 21,
# 'Cultural Studies - US Minority': 22,
# 'Cultural Studies - Non-West course': 23,
# 'Humanities - Lit & Arts course': 24,
# 'Cultural Studies - Western': 25,
# 'Quantitative Reasoning I course': 26,
# 'Humanities - Hist & Phil course': 27,
# 'Cultural Studies - Western course': 28,
# 'James Scholars course': 29,
# 'Grand Challenge-Inequality': 30
# }

# enums_second_level = {

# }
#TODO
enums_last_level = {
'Nat Sci & Tech': 0,
'Social & Beh Sci': 1,
'Advanced Composition': 2,
'Grand Challenge': 4,
'Camp Honors/Chanc Schol course': 5,
'Quantitative Reasoning II': 6,
'Humanities': 7,
'Camp Honors/Chanc Schol': 8,
'Cultural Studies': 9,
'Advanced Composition course': 10,
'Quantitative Reasoning II course': 11,
'Cultural Studies': 12, 
'Composition I course': 13,
'Quantitative Reasoning I course': 14,
'James Scholars course': 15,
}

combined = pd.read_csv('data/combined-courses-gpas.csv')

# combined[['Sentence 1', 'Sentence 2', 'Sentence 3']] = combined['Degree Attributes'].str.split('[,|and]', expand=True)

# Strip any leading or trailing whitespace from the new columns
# combined['Sentence 1'] = combined['Sentence 1'].str.strip()
# combined['Sentence 2'] = combined['Sentence 2'].str.strip()
# combined['Sentence 3'] = combined['Sentence 3'].str.strip()

# print(combined)

# test = combined['Degree Attributes'].str.split(',')
combined['Degree Attributes'] = combined['Degree Attributes'].str.replace('.', '')
combined['Degree Attributes'] = combined['Degree Attributes'].str.replace(', and', ',')

combined['Degree Attributes'] = combined['Degree Attributes'].str.split(',')
# print(combined['Degree Attributes'].tail())
# combined['Degree Attributes'] = combined['Degree Attributes'].apply(lambda x: list(map(lambda y: enums[y], x) if pd.isnull(x) else None))
# combined.to_csv("test2.csv")
combined['Degree Attributes Codes'] = ''

for i, row in combined.iterrows():
    value = row["Degree Attributes"]
    # print(type(row))
    # print(type(value))
    # if (pd.notnull(row)).all():
    if isinstance(value, list):
        combined.at[i,'Degree Attributes Codes'] = list(map(lambda x: enums_last_level[enums[x.strip()]], value))

combined.to_csv("data/final_to_be_fixed.csv", index=False)

# Getting uniques below
# attrs = combined['Degree Attributes'].str.split(',')
# attrs = attrs.explode().to_numpy()


# unique = set()

# for a in attrs:
#     if isinstance(a, str):
#         a = a.strip()
#         unique.add(a)

# for u in unique:
#     print(u)
# print(type(attrs[9]))
# attrs = attrs[~np.isnan(attrs)]
# attrs = np.char.strip(attrs, chars=None)
# print(np.unique(attrs))
# attrs = a
# print(attrs.unique())

# print(combined['Degree Attributes'].head())
# combined.to_csv('test.csv', index=False)