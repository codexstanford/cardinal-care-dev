# unzip
import zipfile
import csv
import requests

drug_url = "https://www.fda.gov/media/89850/download?attachment"
response = requests.get(drug_url)
with open('../raw_data/fda_approved_drugs.zip', 'wb') as f:
    f.write(response.content)

with zipfile.ZipFile('../raw_data/fda_approved_drugs.zip', 'r') as zip_ref:
    zip_ref.extractall('../raw_data/fda_approved_drugs')

with open('../raw_data/fda_approved_drugs/Products.txt', 'r') as f:
    reader = csv.reader(f, delimiter='\t')
    next(reader)
    f = open('../external_data/fda_approved_drugs.hdf','w')
    for row in reader:
        drug_name = row[5].lower().replace(' ', '_')
        with open('../external_data/fda_approved_drugs.hdf','a') as f:
            f.write(f'fda_approved_drug({drug_name}).'+'\n')