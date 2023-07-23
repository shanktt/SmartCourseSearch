import requests
import argparse
import pandas as pd
import json

def download_gpa_csv(term, year):
    base_url = "https://raw.githubusercontent.com/wadefagen/datasets/master/gpa/raw/"
    file_name = f"{term}{year}.csv"
    url = base_url + file_name

    response = requests.get(url)
    response.raise_for_status()  # Ensure we got a valid response

    downloaded_file_name = f"{term}{year}_gpa.csv"
    with open(downloaded_file_name, 'wb') as f:
        f.write(response.content)

    print(f"Downloaded {downloaded_file_name}")
    return downloaded_file_name

def get_min_max_gpa(record):
    credit_hours_str = record['Credit Hours'].lower()
    credit_hours_str = credit_hours_str.replace(' hours.', '').replace(' hour.', '')
    
    if ' to ' in credit_hours_str:
        min_hours, max_hours = map(float, credit_hours_str.split(' to '))
    elif ' or ' in credit_hours_str:
        min_hours, max_hours = map(float, credit_hours_str.split(' or '))
    else:  # it's a single number
        min_hours = max_hours = float(credit_hours_str)

    return min_hours,max_hours

# TODO clean up files
def combine_course_gpa_datasets(gpa_data, course_file):
    df = pd.read_csv(gpa_data) 
    df = df[['Subject','Course', 'Average Grade']]
    condensed_gpa_data = df.groupby(['Subject','Course']).mean().round(2).reset_index() 
    gpa_data_dict = condensed_gpa_data.to_dict(orient='records')
    gpa_records = {(d['Subject'], str(d['Course'])): d['Average Grade'] for d in gpa_data_dict}

    with open(course_file, 'r') as f:
        course_data = json.load(f)

    for record in course_data:
        key = (record['Major Abbreviation'], record['Course Number'])
        record['Average GPA'] = gpa_records.get(key, 0)

        min_hours, max_hours = get_min_max_gpa(record)

        record['min_credit_hours'] = min_hours
        record['max_credit_hours'] = max_hours

    print('Combined GPA and Course Datasets')

    new_course_file_name = course_file.replace('courses', 'gpa-courses')
    with open(new_course_file_name, 'w') as f:
        json.dump(course_data, f, indent=4)


    return new_course_file_name

# TODO add optional args to specify output file name / path
if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Download CSV file from GitHub.")
    parser.add_argument("term", type=str, help="Term of the file (sp, su, wi, fa)")
    parser.add_argument("year", type=str, help="Year of the file (four digit year)")
    parser.add_argument("course_data", type=str, help="Path to courses dataset in json format")

    args = parser.parse_args()

    gpa_data = download_gpa_csv(args.term, args.year)
    combined_courses_and_gpa_data = combine_course_gpa_datasets(gpa_data, args.course_data)
