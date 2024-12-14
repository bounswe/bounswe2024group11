# utils.py
import os
import requests
from dotenv import load_dotenv


def compress_image_tinify(image_file):
    """
    Compress image using Tinify API and return the URL
    """
    try:
        url = "https://api.tinify.com/shrink"
        api_key = os.getenv('TINIFY_API_KEY')
        
        auth = ('api', api_key)
        
        image_data = image_file.read()
        
        response = requests.post(
            url,
            auth=auth,
            data=image_data
        )
        
        if response.status_code == 201:
            print(response.json())
            compressed_url = response.json()['output']['url']
            return compressed_url
            
        return None
            
    except Exception as e:
        print(f"Error compressing image: {str(e)}")
        return None
    

load_dotenv()
api_key = os.getenv('BABELNET_API_KEY')


def get_ids(word_id):
    return_array = [word_id]

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
        # if value.get("language") == "EN" or value.get("language") == "TR":
            # if value.get("pointer").get("shortName") != "related":
        return_array.append(value.get("target"))    # Indent this to the right when activating the language if statement
    # print(len(return_array))          # Debugging
    return return_array
