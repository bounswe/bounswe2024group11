import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from bs4 import BeautifulSoup
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework import serializers


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
        description_boxes = box.find_all('div', class_='synset')  # Example: Assuming the description boxes have class 'synsetBox'

        # Extract descriptions and IDs
        descriptions = []
        for box in description_boxes:
            # Get the ID of the box
            # print(box.find('div', class_='definition').text.strip())
            if box.find('div', class_='definition') is not None:
                 descriptions.append({
                    'word': word,
                    'id': box.get('data-id'),
                    'description': box.find('div', class_='definition').text.strip()
                })

        entity_dict[pos] = descriptions
    return entity_dict


class WordDefinitionSerializer(serializers.Serializer):
    id = serializers.IntegerField(help_text="Unique ID for the word definition")
    definition = serializers.CharField(help_text="Definition of the word")

class TaggedWordSerializer(serializers.Serializer):
    ADV = serializers.ListField(
        child=WordDefinitionSerializer(),
        required=False,
        help_text="List of adverbs with their definitions",
    )
    VERB = serializers.ListField(
        child=WordDefinitionSerializer(),
        required=False,
        help_text="List of verbs with their definitions",
    )
    ADJ = serializers.ListField(
        child=WordDefinitionSerializer(),
        required=False,
        help_text="List of adjectives with their definitions",
    )
    NOUN = serializers.ListField(
        child=WordDefinitionSerializer(),
        required=False,
        help_text="List of nouns with their definitions",
    )

# Optionally create a response schema for Swagger with drf-spectacular
# tagging_schema_response = openapi.Response(
#     description="Response for tagged words",
#     schema=openapi.Schema(
#         type=openapi.TYPE_OBJECT,
#         properties={
#             'ADV': openapi.Schema(type=openapi.TY, description='Adverb'),
#             'VERB': openapi.Schema(type=openapi.TYPE_STRING, description='Verb'),
#             'ADJ': openapi.Schema(type=openapi.TYPE_STRING, description='Adjective'),
#             'NOUN': openapi.Schema(type=openapi.TYPE_STRING, description='Noun'),
#         }
#     )
# )

class TaggingView(APIView):
    # query params: word, lang
    @swagger_auto_schema(responses={200: TaggedWordSerializer}, manual_parameters=[
        openapi.Parameter('word', openapi.IN_QUERY, description="Word to search", type=openapi.TYPE_STRING),
        openapi.Parameter('lang', openapi.IN_QUERY, description="Language of the word", type=openapi.TYPE_STRING),
    ])
    def get(self, request):


        try:
            word = request.query_params['word']
            lang = request.query_params['lang']
            # Send a GET request to the URL
            entity_dict = helper(word, lang)

            return Response(data=entity_dict, status=status.HTTP_200_OK, content_type="application/json")

        except Exception as e:
            print(f"Error fetching the URL: {str(e)}")
            return Response(status=status.HTTP_400_BAD_REQUEST)