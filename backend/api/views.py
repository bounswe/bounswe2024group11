from rest_framework.response import Response
from rest_framework.decorators import api_view
from user.models import User
from .serializer import UserSerializer
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.shortcuts import get_object_or_404
from django.shortcuts import render
import requests
import json
from django.http import JsonResponse
@api_view(['POST'])
def register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        user = User.objects.get(username=request.data['username'])
        user.set_password(request.data['password'])
        user.save()
        token = Token.objects.create(user=user)
        return Response({"token": token.key, "user": serializer.data})
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login(request):
    user = get_object_or_404(User, username=request.data['username'])
    if not user.check_password(request.data['password']):
        return Response({"res":"password does not match."}, status=status.HTTP_404_NOT_FOUND)
    token, created = Token.objects.get_or_create(user=user)
    serializer = UserSerializer(instance=user)
    return Response({"token": token.key, "user": serializer.data})


#@api_view(['GET'])
#def test_token(request):
#    return Response({"res":"Token is valid!"})

@api_view(["POST"])
def search(request):
    #this part should be changed because we should use post to get keyword.
    if request.method == 'POST':
        #keyword = request.POST.get(request.data.get("keyword"), '')
        keyword = request.data["keyword"]
        print(keyword)
        # Construct SPARQL query
        comic_query = """
        SELECT DISTINCT ?comic ?comicLabel ?description WHERE {
          ?comic wdt:P31 wd:Q1004;
                rdfs:label ?comicLabel;
                schema:description ?description.
                
          
          FILTER (lang(?comicLabel) = 'en' && regex(?comicLabel, "%s", "i"))
        }
        LIMIT 3
        """ % keyword

        # Construct SPARQL query for comic characters
        character_query = """
        SELECT DISTINCT ?character ?characterLabel ?description WHERE {
        ?character rdfs:label ?characterLabel;
                    schema:description ?description;
                    wdt:P31/wdt:P279* wd:Q1114461.
        
        FILTER (lang(?description) = 'en' && regex(?characterLabel, "%s", "i"))
        }
        LIMIT 10

        """ % keyword

        # Parameters for the API call
        comic_params = {
            'query': comic_query,
            'format': 'json'  # Response format
        }
        
        character_params = {
            'query': character_query,
            'format': 'json'  # Response format
        }

        # API endpoint
        url = 'https://query.wikidata.org/sparql'

        # Make the API call
        comic_response = requests.get(url, params=comic_params)
        character_response = requests.get(url, params=character_params)
        
        # Check if the request was successful
        if comic_response.status_code == 200 and character_response.status_code== 200:
            # Parse JSON response
            comic_data = comic_response.json()
            character_data = character_response.json()

            #print(comic_response.json())
            #print(character_response.json())
           

            comic_results = [{'type': 'comic', 'label': item['comicLabel']['value'], 'description': item['description']['value']} for item in comic_data['results']['bindings']]
            character_results = [{'type': 'character', 'label': item['characterLabel']['value'], 'description': item['description']['value']} for item in character_data['results']['bindings']]

            combined_results = comic_results + character_results
            
            print(combined_results)
            
            
            return Response({'keyword': keyword, 'results': combined_results})
        else:
            return Response({'error': 'Failed to retrieve data from Wikidata.'}, status=500)
    else:
        return Response({'error': 'Invalid request method. Only GET method is allowed.'}, status=405)