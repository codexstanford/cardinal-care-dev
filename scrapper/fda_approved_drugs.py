# unzip
import zipfile
import csv
import requests
import pandas as pd

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
        drug_name = row['DrugName'].lower().replace(' ', '_')
        strength = str(row['Strength']).lower().replace(' ', '_').replace('%', 'percent').replace('/', 'per').replace(',', '').replace('.', '_')
        market_type = MarketStatusLookup[str(row['MarketingStatusID']).strip()]
        f.write(f'fda_approved_drug(drug_{i}).'+'\n')
        f.write(f'fda_drug_name(drug_{i}, {drug_name}).'+'\n')
        f.write(f'fda_strength(drug_{i}, {strength}).'+'\n')
        f.write(f'fda_market_type(drug_{i}, {market_type}).'+'\n')
    f.write('\n\n')