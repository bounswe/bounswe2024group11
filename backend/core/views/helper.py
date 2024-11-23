import requests
from bs4 import BeautifulSoup
import os
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv('BABELNET_API_KEY')

def see_output(id):
    print("Searched word: \n" + BeautifulSoup(requests.get('https://babelnet.org/synset', params={'id': id,'lang': 'EN',}).text, 'html.parser').find('span', class_='synonim').text.strip())
    my_list = get_ids(id)
    for x in my_list:
        print(x)  
    print(len(my_list))

def id_getter(word_string):
    url = 'https://babelnet.io/v9/getSynsetIds'
    response = requests.get(url, params={
        'lemma': word_string,
        'searchLang': 'EN',
        'key': api_key,
        })
    if response.status_code != 200:
        raise Exception(f"Error fetching from BabelNet API. Status code: {response.status_code}")
    
    return response.json()
    

 
def show_fields(json_object):
    target = json_object.get("target")
    url = 'https://babelnet.org/synset'
    response = requests.get(url, params={
        'id': target,
        'lang': 'EN',
        }) 
    if response.status_code != 200:
        raise Exception(f"Error fetching from BabelNet API. Status code: {response.status_code}")

    soup = BeautifulSoup(response.text, 'html.parser')

    content = soup.find('span', class_='synonim').text.strip()
    shortName = json_object.get("pointer").get("shortName")
    
    return {"word": content, "id": target, "type": shortName}


# hep ingilizce sonuclar donuyor. Turkce donmuyor
# ingilizcesi de turkcesi de ayni id'ye bagli. Bu yuzden tr veya ing ayrimi yapmaya gerek yok
def get_ids(word_id):
    return_array = []

    api_key = os.getenv('BABELNET_API_KEY')
    url = 'https://babelnet.io/v9/getOutgoingEdges'
    params = {
        'id': word_id,
        'key': api_key,
    }
    response = requests.get(url, params=params)

    if response.status_code != 200:
        raise Exception(f"Error fetching from BabelNet API. Status code: {response.status_code}")
    
    data = response.json()
    for value in data:
        if value.get("language") == "EN" or value.get("language") == "TR":
            if value.get("pointer").get("shortName") != "related":
                # return_array.append(value.get("target"))    # Gunluk limite ulasildi. Web request icin            # Duz id donuyor
                # return_array.append({value.get("target"), value.get("language")})                                 # Id ve dili donuyor
                return_array.append(show_fields(value))                                                             # Id, kelime ve type donuyor        
            # return_array.append({value.get("pointer").get("shortName"), value.get("target")})
    return_array = list({v['id']: v for v in return_array}.values())
    return return_array


see_output("bn:00030747n")

# url = "https://babelnet.io/v9/getSynset?id=bn:00035144n&key=f5807175-d6af-406b-be0a-859e1b9a4d3b"

# response = requests.get(url)
# print(response.json())
# for each in response.json().get("senses"):
#     print(each)

# while(1):
#     word = input("Enter a word: ")
#     print(id_getter(word))




# helper
# test et
# tr kismi
# viewset kismi 
