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
        sparql_query = """
        SELECT DISTINCT ?comic ?comicLabel ?author ?publicationDate ?description ?image WHERE {
          ?comic wdt:P31/wdt:P279* wd:Q1004;
                 rdfs:label ?comicLabel;
                 wdt:P50 ?author;
                 wdt:P577 ?publicationDate;
                 wdt:P18 ?image;
                 schema:description ?description.
          FILTER (lang(?comicLabel) = 'en' && contains(?comicLabel, "%s"))
        }
        LIMIT 30
        """ % keyword

        # Parameters for the API call
        params = {
            'query': sparql_query,
            'format': 'json'  # Response format
        }

        # API endpoint
        url = 'https://query.wikidata.org/sparql'

        # Make the API call
        response = requests.get(url, params=params)

        # Check if the request was successful
        if response.status_code == 200:
            # Parse JSON response
            data = response.json()
            results = []
            bindings = data['results']['bindings']
            print(bindings)
            if bindings:
                for item in bindings:
                    comic_info = {
                        'label': item['comicLabel']['value']
                        #'author': item['author']['value'],
                        #'publication_date': item['publicationDate']['value'],
                        #'description': item['description']['value'],
                        #'image': item['image']['value']
                    }
                    results.append(comic_info)
            else:
                results.append("No comics found.")
            return JsonResponse({'keyword': keyword, 'results': results})
        else:
            return JsonResponse({'error': 'Failed to retrieve data from Wikidata.'}, status=500)
    else:
        return JsonResponse({'error': 'Invalid request method.'}, status=400)