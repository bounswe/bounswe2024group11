import requests
from bs4 import BeautifulSoup
import os
from dotenv import load_dotenv

# from rest_framework import serializers, status
# from rest_framework.response import Response
# from rest_framework.views import APIView
# from drf_yasg import openapi
# from drf_yasg.utils import swagger_auto_schema
# from models import ForumQuestion
# from serializers.serializers import ForumQuestionSerializer


load_dotenv()


def see_output(id):
    my_list = get_ids(id)
    print(my_list)
    print(len(my_list))
    # print(BeautifulSoup(requests.get('https://babelnet.org/synset', params={'id': id,'lang': 'EN',}).text, 'html.parser').find('span', class_='synonim').text.strip())

 
def get_fields(json_object):
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
                return_array.append(get_fields(value))    # Gunluk limite ulasildi. Web request icin
                # return_array.append({value.get("target"), value.get("language")})
            # return_array.append({value.get("pointer").get("shortName"), value.get("target")})
    
    return return_array


see_output("bn:00035144n")

# def ForumSemanticSearchView(ListAPIView):
#     queryset = ForumQuestion.objects.all()
#     serializer_class = ForumQuestionSerializer
#     # permission_classes = [permissions.IsAuthenticated, IsAuthorOwnerOrReadOnly]

#     @swagger_auto_schema(
#         responses={200: openapi.TYPE_ARRAY},
#         manual_parameters=[
#             openapi.Parameter('id', openapi.IN_QUERY, description="ID of the word", type=openapi.TYPE_STRING),
#         ]
#     )
    
#     def get(self, request):     # Complete?
#         try:
#             word_id = request.query_params.get('id')

#             if not word_id:
#                 return Response({'error': 'Parameter "id" is required.'}, status=status.HTTP_400_BAD_REQUEST)

#             ids = get_ids(word_id)
#             return Response(ids, status=status.HTTP_200_OK)

#         except Exception as e:
#             return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



# helper
# test et
# tr kismi
# viewset kismi 
