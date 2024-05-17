# unzip
import zipfile
import csv
import requests
import pandas as pd
import re 

drug_url = "https://www.fda.gov/media/89850/download?attachment"
response = requests.get(drug_url)
with open('../raw_data/fda_approved_drugs.zip', 'wb') as f:
    f.write(response.content)

with zipfile.ZipFile('../raw_data/fda_approved_drugs.zip', 'r') as zip_ref:
    zip_ref.extractall('../raw_data/fda_approved_drugs')

f = open('../raw_data/fda_approved_drugs/Products.txt', 'r')
r = f.read()
f.close()
r = r.replace('\t\t', '\t')
f = open('../raw_data/fda_approved_drugs/Products.txt', 'w')
f.write(r)
f.close()

df = pd.read_csv('../raw_data/fda_approved_drugs/Products.txt', sep='\t', header=0)
df2 = pd.read_csv('../raw_data/fda_approved_drugs/MarketingStatus.txt', sep='\t', header=0, index_col=['ApplNo', 'ProductNo'])

df = df.join(df2, on=['ApplNo', 'ProductNo'], how='inner', validate='one_to_one')

MarketStatusLookup = {
    '1':	'prescription',
    '2':	'otc',
    '3':	'discontinued',
    '4':	'none',
    '5':	'for_further_manufacturing_use'
}


with open('../external_data/fda_approved_drugs.hdf', 'w') as f:
    for i,row in df.iterrows():
        drug_name = row['DrugName'].lower().replace(' ', '_').replace('%', 'percent').replace('/', 'per').replace(',', '').replace('.', '_')
        if drug_name.find('(') != -1:
            extra_info = drug_name.split('(')[-1].split(')')[0]
            if extra_info not in ['k']:
                drug_name = drug_name.split('(')[0]
            else:
                extra_info = None
        else:
            extra_info = None
        drug_name = re.sub('[^0-9a-zA-Z]+', '_', drug_name)
        strength = str(row['Strength']).lower().replace(' ', '_').replace('%', 'percent').replace('/', 'per').replace(',', '').replace('.', '_')
        strength = re.sub('[^0-9a-zA-Z]+', '_', strength)
        market_type = MarketStatusLookup[str(row['MarketingStatusID']).strip()]
        f.write(f'fda_approved_drug(drug_{i}).'+'\n')
        f.write(f'fda_drug_name(drug_{i}, {drug_name}).'+'\n')
        f.write(f'fda_strength(drug_{i}, {strength}).'+'\n')
        f.write(f'fda_market_type(drug_{i}, {market_type}).'+'\n')
        if extra_info:
            f.write(f'fda_extrainfo(drug_{i}, {extra_info}).'+'\n')
        f.write('\n\n')