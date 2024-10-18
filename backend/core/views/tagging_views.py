import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from bs4 import BeautifulSoup



# Function to fetch and parse the BabelNet search results page
def helper(word, lang):
    # URL structure for BabelNet (you need to adapt this based on the actual BabelNet URL structure)
    url = f"https://babelnet.org/search?word={word}&lang={lang}"
    
    # Fetch the webpage content
    response = requests.get(url)
    if response.status_code != 200:
        raise Exception(f"Error fetching the page. Status code: {response.status_code}")
    
    # Parse the HTML content using BeautifulSoup
    soup = BeautifulSoup(response.text, 'html.parser')

    # Find all boxes with descriptions (Assuming they are inside <div> tags or similar containers)
    # You need to adapt the selector to fit the actual HTML structure of BabelNet pages
    position_boxes = soup.find_all('div', class_='pos-results')  # Example: Assuming the description boxes have class 'synsetBox'
    entity_dict = {}
    for box in position_boxes:
        
        pos = box.find('span', class_='pos').get('data-pos')
        print(pos)
        description_boxes = box.find_all('div', class_='synset')  # Example: Assuming the description boxes have class 'synsetBox'

        # Extract descriptions and IDs
        descriptions = []
        for box in description_boxes:
            # Get the ID of the box
            descriptions.append({'id': box.get('data-id'), 'description': box.find('div', class_='definition').text.strip()})

        entity_dict[pos] = descriptions
    
    return entity_dict


class TaggingView(APIView):
    # query params: word, lang
    def get(self, request):
        word = request.query_params['word']
        lang = request.query_params['lang']
        
        try:
            # Send a GET request to the URL
            entity_dict = helper(word, lang)
            
            return Response(data=entity_dict, status=status.HTTP_200_OK, content_type="application/json", charset="utf-8")

        except requests.exceptions.RequestException as e:
            print(f"Error fetching the URL: {str(e)}")
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)