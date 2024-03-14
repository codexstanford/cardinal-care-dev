import requests
from bs4 import BeautifulSoup
import pandas as pd

url = 'https://client.formularynavigator.com/Search.aspx?siteCode=0777247909&targetScreen=1&drugSearchText='

response = requests.get(url)
soup = BeautifulSoup(response.text, 'html.parser')

a_tags = soup.find_all('a', id=lambda x: x and x.startswith('lbDrug_'))
drug_list = [a['onclick'].split('drugNameClicked(')[-1].split(');')[0].split(',') for a in a_tags]
drug_info = []
while len(drug_list) > 0:
    drug_name, _, drug_id = drug_list[-1]
    drug_name = drug_name.strip("'")
    drug_id = drug_id.strip("'")
    drug_url = 'https://client.formularynavigator.com/Search.aspx?siteCode=0777247909&targetScreen=3&drugBrandListBaseKey=' + drug_name + '&drugId=' + drug_id
    try:
        drug_response = requests.get(drug_url)
        drug_soup = BeautifulSoup(drug_response.text, 'html.parser')
    except:
        continue
    drug_list.pop()
    table = drug_soup.find('table', id='tblResults')
    if not table:
        continue
    print(drug_name, drug_id, drug_url)
    tr = table.find('tr')
    tr = tr.find_next('tr')
    while tr:
        tds = tr.find_all('td')
        brand_name = tds[0].find('span', 'brandName')
        if brand_name:
            brand_name = brand_name.text
        generic_name = tds[0].find('span', 'genericName')
        if not generic_name:
            generic_name = tds[0].find('span', 'tableSubItem')
        if not generic_name:
            generic_name = tds[0]
        generic_name = generic_name.text
        print(brand_name, generic_name)
        therapeutic_classes = tds[1].find_all('a')
        therapeutic_class = therapeutic_classes[0].text.replace('-', '_')
        subtherapeutic_class = therapeutic_classes[1].text.replace('-', '_')
        dose = tds[2].text
        status = tds[3].find('img')['alt']
        notes = []
        for a in tds[4].find_all('a'):
            img = a.find('img')
            if not img:
                continue
            details = a['onclick'].split('Details: |')[-1].split("'")[0].strip()
            notes.append(img['alt'] + ': ' + details)

        drug_info.append([drug_id, generic_name, '' if brand_name is None else brand_name, therapeutic_class, subtherapeutic_class, dose, status, notes])
        tr = tr.find_next_sibling('tr')

cols = ['drug_id', 'generic_name', 'brand_name', 'therapeutic_class', 'subtherapeutic_class', 'dose', 'status', 'notes']

df = pd.DataFrame(drug_info, columns=cols)
df.to_csv('../external_data/aetna_drugs.csv', index=False, mode='w', header=False)

with open('../external_data/aetna_drugs.hdf', 'w') as f:
    for i, values in df.iterrows():
        for col in cols[:-1]:
            f.write(f'aetna_drugs.{col}(prescription_drug_{i}, {str(values[col]).replace(" ", "_").lower()})\n')
        for note in values['notes']:
            if notes == '':
                continue
            type = note.split(': ')[0].replace(' ', '_').lower()
            note = note.split(': ')[1].replace(' ', '_').lower().replace('.', '').replace('(', '').replace(')', '')
            f.write(f'aetna_drugs.note(prescription_drug_{i}, {type}, {note})\n')
        f.write('\n')