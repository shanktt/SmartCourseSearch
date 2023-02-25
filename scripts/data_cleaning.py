import pandas as pd
import numpy as np

enums = {
    'Nat Sci & Tech - Phys Sciences course': 'Nat Sci & Tech', 
    'Social & Beh Sci - Beh Sci': 'Social & Beh Sci', 
    'Social & Beh Sci - Soc Sci course': 'Social & Beh Sci', 
    'Advanced Composition': 'Advanced Composition', 
    'Nat Sci & Tech - Life Sciences course': 'Nat Sci & Tech', 
    'Grand Challenge-Sustainability course': 'Grand Challenge', 
    'Camp Honors/Chanc Schol course': 'Camp Honors/Chanc Schol', 
    'Nat Sci & Tech - Life Sciences': 'Nat Sci & Tech', 
    'Nat Sci & Tech - Phys Sciences': 'Nat Sci & Tech', 
    'Quantitative Reasoning II': 'Quantitative Reasoning II', 
    'Humanities - Lit & Arts': 'Humanities', 
    'Camp Honors/Chanc Schol': 'Camp Honors/Chanc Schol', 
    'Humanities - Hist & Phil': 'Humanities', 
    'Grand Challenge-Health/Well': 'Grand Challenge', 
    'Cultural Studies - Non-West': 'Cultural Studies', 
    'Social & Beh Sci - Soc Sci': 'Social & Beh Sci', 
    'Advanced Composition course': 'Advanced Composition', 
    'Quantitative Reasoning II course': 'Quantitative Reasoning II', 
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

enums_last_level = {
'Nat Sci & Tech': 0,
'Social & Beh Sci': 1,
'Advanced Composition': 2,
'Grand Challenge': 3,
'Camp Honors/Chanc Schol': 4,
'Quantitative Reasoning II': 5,
'Humanities': 6,
'Cultural Studies': 7,
'Composition I course': 8,
'Quantitative Reasoning I course': 9,
'James Scholars course': 10,
}

combined = pd.read_csv('data/combined-courses-gpas.csv')

combined['Degree Attributes'] = combined['Degree Attributes'].str.replace('.', '')
combined['Degree Attributes'] = combined['Degree Attributes'].str.replace(', and', ',')
combined['Degree Attributes'] = combined['Degree Attributes'].str.split(',')
combined['Degree Attributes Codes'] = ''

for i, row in combined.iterrows():
    value = row["Degree Attributes"]
    
    if isinstance(value, list):
        combined.at[i,'Degree Attributes Codes'] = list(map(lambda x: enums_last_level[enums[x.strip()]], value))

combined = combined[combined["Credit Hours"].str.contains("TO|OR|To|Or|to|or")==False]
combined["Credit Hours"] = combined["Credit Hours"].str.extract('(\d+)')
combined = combined[~combined['Description'].str.match(r'Same as.*')]
print(combined.shape)
combined.to_csv("data/final.csv", index=False)
