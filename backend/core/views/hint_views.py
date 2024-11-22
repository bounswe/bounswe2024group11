import requests
import json
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# BabelNet API configuration
BASE_URL = "https://babelnet.io/v6"
API_KEY = "e5252315-c71f-461e-89cf-93e938db15c6"  # Replace with your API key

def get_hint(id, targetLang="EN", word = ""):
    try:
        # Initialize arrays inside the function to reset them for each call
        synonym_array = []
        definitions = []
        examples = []
        image_array = []

        # BabelNet API URL
        url = f"{BASE_URL}/getSynset?id={id}&targetLang={targetLang}&key={API_KEY}"
        response = requests.get(url)
        response.raise_for_status()  # Raise an exception for HTTP errors

        # Parse JSON response
        synsets = response.json()


        # Extract synonyms
        for i in synsets.get("senses", []):
            lemma = i.get("properties", {}).get("lemma", {}).get("lemma")
            lemma_type = i.get("properties", {}).get("lemma", {}).get("type")
            if lemma and lemma_type == "HIGH_QUALITY" and lemma.lower() not in synonym_array and lemma.lower() != word.lower() :
                synonym_array.append(lemma)

        # Extract definitions
        for definition in synsets.get("glosses", []):
            if definition["gloss"] not in definitions:
                definitions.append(definition["gloss"])

        # Extract examples
        for example in synsets.get("examples", []):
            if example["example"] not in examples:
                examples.append(example["example"])

        # Extract images
        for image in synsets.get("images", []):
            if len(image_array) >= 5:
                    break
            elif image.get("url") not in image_array:
                image_array.append(image["url"])


        return {
            "synonyms": synonym_array,
            "definitions": definitions,
            "examples": examples,
            "images": image_array,
        }
    except Exception as e:
        return {"error": str(e)}

class HintView(APIView):
    """
    APIView to fetch hints (synonyms, definitions, examples, and images) from BabelNet.
    """

    def get(self, request):
        # Get synset_id and targetLang from query parameters
        synset_id = request.query_params.get("synset_id")
        target_lang = request.query_params.get("target_lang", "EN")  
        word = request.query_params.get("word")

        if not synset_id:
            return Response(
                {"error": "Parameter 'synset_id' is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Fetch hints using the get_hint function
        hints = get_hint(synset_id, target_lang, word)
        if "error" in hints:
            return Response(
                {"error": hints["error"]},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        return Response(hints, status=status.HTTP_200_OK)
