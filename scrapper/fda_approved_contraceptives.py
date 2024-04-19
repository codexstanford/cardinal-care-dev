# get data from https://www.fda.gov/consumers/free-publications-women/birth-control
# and save it to a csv file

import requests
from bs4 import BeautifulSoup
import csv

url = 'https://www.fda.gov/consumers/free-publications-women/birth-control'

response = requests.get(url)
soup = BeautifulSoup(response.text, 'html.parser')

# get main and then article tag. get all h4 and h3 tags in it. filter out if the child is not <b> or <strong>
main = soup.find('main')
article = main.find('article')
h4_tags = article.find_all('h4')
h3_tags = article.find_all('h3')
all_tags = h4_tags + h3_tags
filtered_tags = [tag for tag in all_tags if tag.findChild('b') or tag.findChild('strong')]
filtered_tags = [tag for tag in all_tags if not tag.findChild('a') and not tag.findChild('img')]

# get the representative text. If there are double inverted commas in the text, then it is the representative text
# if not, then text before <br> and inside <b> or <strong> is the representative text

# get the representative text
def get_representative_text(tag):
    text = tag.text
    if '“' in text:
        return text.strip().split('“')[1].split('”')[0].strip()
    if "<br>" in tag:
        return tag.text.split('<br>')[0]
    
    # get the <b> or <strong> tag
    b_tag = tag.findChild('b')
    if not b_tag:
        b_tag = tag.findChild('strong')
    return b_tag.text.split('(')[0].strip()

# get the representative text for each tag
representative_texts = ["_".join(get_representative_text(tag).lower().split()) for tag in filtered_tags]

with open('../external_data/fda_approved_contraceptive.hdf','w') as f:
    for m in representative_texts:
        if m=='other_contraception':
            continue
        f.write(f'fda_approved({m}).'+'\n')