import requests
import json
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

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
        url = f"{BASE_URL}/getSynset?id=bn:{id}&targetLang={targetLang}&key={API_KEY}"
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

        synonym_array = [synonym.replace('_', ' ') for synonym in synonym_array]

        return {
            "synonyms": list(set(synonym_array)),
            "definitions": list(set(definitions)),
            "examples": list(set(examples)),
            "images": list(set(image_array)),
        }
    except Exception as e:
        return {"error": str(e)}

class HintView(APIView):
    """
    APIView to fetch hints (synonyms, definitions, examples, and images) from BabelNet.
    """
    @swagger_auto_schema(
        operation_summary="Fetch hints for a word using BabelNet",
        operation_description=(
            "This endpoint fetches synonyms, definitions, examples, and images "
            "for a given word's synset ID from the BabelNet API. It allows restricting "
            "synonyms to high-quality ones and excludes the queried word itself from synonyms."
        ),
        manual_parameters=[
            openapi.Parameter(
                "synset_id",
                openapi.IN_QUERY,
                description="The synset ID for which to fetch hints without `bn:` prefix (e.g., instead of `bn:00007309n` use `00007309n`).",
                type=openapi.TYPE_STRING,
                required=True,
            ),
            openapi.Parameter(
                "target_lang",
                openapi.IN_QUERY,
                description="The target language for the results (default is `EN`).",
                type=openapi.TYPE_STRING,
                required=False,
            ),
            openapi.Parameter(
                "word",
                openapi.IN_QUERY,
                description="The original word to avoid including in the synonyms.",
                type=openapi.TYPE_STRING,
                required=False,
            ),
        ],
        responses={
            200: openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={
                    "synonyms": openapi.Schema(
                        type=openapi.TYPE_ARRAY,
                        items=openapi.Schema(type=openapi.TYPE_STRING),
                        description="List of high-quality synonyms for the synset."
                    ),
                    "definitions": openapi.Schema(
                        type=openapi.TYPE_ARRAY,
                        items=openapi.Schema(type=openapi.TYPE_STRING),
                        description="List of definitions for the synset."
                    ),
                    "examples": openapi.Schema(
                        type=openapi.TYPE_ARRAY,
                        items=openapi.Schema(type=openapi.TYPE_STRING),
                        description="List of example sentences for the synset."
                    ),
                    "images": openapi.Schema(
                        type=openapi.TYPE_ARRAY,
                        items=openapi.Schema(type=openapi.TYPE_STRING),
                        description="List of up to 5 image URLs associated with the synset."
                    ),
                },
                example={
                    "synonyms": ["explanation", "clarification", "interpretation"],
                    "definitions": [
                        "A statement that makes something comprehensible by describing the relevant structure.",
                        "The act of explaining; making something plain or intelligible."
                    ],
                    "examples": [
                        "The explanation was clear.",
                        "She provided a detailed explanation."
                    ],
                    "images": [
                        "https://imageurl1.com",
                        "https://imageurl2.com"
                    ]
                }
            ),
            400: openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={
                    "error": openapi.Schema(type=openapi.TYPE_STRING, example="Parameter 'synset_id' is required.")
                },
            ),
            500: openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={
                    "error": openapi.Schema(type=openapi.TYPE_STRING, example="Error fetching hints.")
                },
            ),
        },
    )

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
