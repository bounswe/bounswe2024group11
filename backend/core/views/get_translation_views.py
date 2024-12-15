import requests
from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.views import APIView
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from turkish_string import lower_tr

# Helper function to fetch translations from BabelNet API
def get_translation(word_id, target_lang):
    api_key = '9866532b-0a17-4cd6-9bf8-d6c21d1fba60'  
    url = 'https://babelnet.io/v9/getSynset'
    params = {
        'id': "bn:" + word_id,
        'targetLang': target_lang,
        'key': api_key,
        'source': 'OMWIKI',
    }
    response = requests.get(url, params=params)
    if response.status_code != 200:
        raise Exception(f"Error fetching from BabelNet API. Status code: {response.status_code}")
    data = response.json()
    # Extract translations from data
    translations = []
    
    for sense in data.get('senses', []):
        language = sense.get('properties',[]).get('language')
        if language == target_lang:
            lemma = sense.get('properties', {}).get('fullLemma')
            if lemma:
                lemma = lemma.replace("_", " ").strip()
                lemma = lower_tr(lemma)
                if lemma not in translations:
                    lemma = lemma.replace("_", " ").lower().strip()
                    translations.append(lemma)
                    # print(lemma)

    return translations


# Serializer for the response
class TranslationSerializer(serializers.Serializer):
    translations = serializers.ListField(
        child=serializers.CharField(),
        help_text='List of translations'
    )

# APIView for handling translation requests
class TranslationView(APIView):
    @swagger_auto_schema(
        responses={200: TranslationSerializer},
        manual_parameters=[
            openapi.Parameter('type', openapi.IN_QUERY, description="Type of question (type1 or type2)", type=openapi.TYPE_STRING),
            openapi.Parameter('id', openapi.IN_QUERY, description="ID of the word without `bn:` prefix. E.g., instead of `bn:00007381n` use `00007381n`", type=openapi.TYPE_STRING),
        ]
    )
    def get(self, request):
        try:
            question_type = request.query_params.get('type')
            word_id = request.query_params.get('id')

            if not question_type or not word_id:
                return Response({'error': 'Parameters "type" and "id" are required.'}, status=status.HTTP_400_BAD_REQUEST)

            if question_type == 'type1':
                target_lang = 'TR'
            elif question_type == 'type2':
                target_lang = 'EN'
            else:
                return Response({'error': 'Invalid type parameter. Must be "type1" or "type2".'}, status=status.HTTP_400_BAD_REQUEST)

            translations = get_translation(word_id, target_lang)
            if not translations:
                return Response({'error': 'No translations found.'}, status=status.HTTP_404_NOT_FOUND)

            data = {'translations': translations}
            serializer = TranslationSerializer(data)
            return Response(data=serializer.data, status=status.HTTP_200_OK, content_type="application/json")

        except Exception as e:
            print(f"Error: {str(e)}")
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

# try:
#     data = ['bn:00012710n','bn:00020080n','bn:00078799n','bn:00031588n','bn:00010360n','bn:00051066n','bn:00066441n']
#     for word_id in data:
#         target_lang = 'TR'
#         translations = get_translation(word_id, target_lang)
#         print(" TR Translations:", translations)
   
#     word_ids = [
#     "bn:00087355v",
#     "bn:13605151n",
#     "bn:00110509a",
#     "bn:00037512n"
# ]
#     for word_id in word_ids:
#         target_lang = 'EN'
#         translations = get_translation(word_id, target_lang)
#         print(" EN Translations:", translations)
# except Exception as e:
#     print("Error:", str(e))