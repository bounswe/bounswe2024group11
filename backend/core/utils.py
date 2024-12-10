# utils.py
import os
import requests

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