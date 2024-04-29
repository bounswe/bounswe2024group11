from rest_framework.response import Response
from rest_framework.decorators import api_view
from user.models import User
from .serializer import UserSerializer
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.shortcuts import get_object_or_404 
import requests

@api_view(['POST'])
def register(request):
    required_fields = ['username', 'password', 'email']
    if not all([field in request.data for field in required_fields]):
        return Response({"res":"Please provide all required fields."}, status=status.HTTP_400_BAD_REQUEST)
    
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        user = User.objects.get(username=request.data['username'])
        user.set_password(request.data['password'])
        user.save()
        token = Token.objects.create(user=user)
        return Response({"token": token.key, "user": serializer.data}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login(request):
    required_fields = ['username', 'password']
    if not all([field in request.data for field in required_fields]):
        return Response({"res":"Please provide both username and password."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.get(username=request.data['username'])
    except User.DoesNotExist:
        return Response({"res": "Username not found."}, status=status.HTTP_401_UNAUTHORIZED)

    if not user.check_password(request.data['password']):
        return Response({"res":"password does not match."}, status=status.HTTP_401_UNAUTHORIZED)
    token, created = Token.objects.get_or_create(user=user)
    serializer = UserSerializer(instance=user)
    return Response({"token": token.key, "user": serializer.data}, status=status.HTTP_200_OK)


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
        SELECT DISTINCT ?item ?itemLabel ?comic ?comicLabel ?description ?image ?author  WHERE {
          ?comic wdt:P31/wdt:P279* wd:Q1004;
                 wdt:P50 ?author;
                 schema:description ?description;
                 rdfs:label ?comicLabel.

          ?item wdt:P31/wdt:P279* wd:Q1004;
                rdfs:label ?itemLabel.
          OPTIONAL{
            ?comic wdt:P18 ?image.
          
          }
          FILTER (lang(?comicLabel) = 'en' && lang(?description)= "en" && regex(?comicLabel, "%s", "i"))
        }
        LIMIT 5
        """ %keyword

        # Construct SPARQL query for comic characters
        character_query = """
        SELECT DISTINCT ?item ?itemLabel ?description ?image 
        WHERE {
        ?item wdt:P31/wdt:P279* wd:Q1114461;
              
              schema:description ?description;
              rdfs:label ?itemLabel.
              OPTIONAL{
                ?item wdt:P18 ?image
              }
              FILTER (lang(?itemLabel) = 'en' && lang(?description)= "en" && regex(?itemLabel, "%s", "i"))
            }
        LIMIT 5

        """% keyword

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
           

            comic_results = [{'type': 'comic', 
                              'label': item['comicLabel']['value'], 
                              'item': item['itemLabel']['value'],

                              'description': item.get('description', {}).get('value', 'No image available'),
                              'image': item.get('image', {}).get('value', 'No image available'), 
                              'author': item.get('author', {}).get('value', 'No image available')} for item in comic_data['results']['bindings']]
            character_results = [{'type': 'character', 
                                'label': item['itemLabel']['value'], 
                                'description': item['description']['value'], 
                                 'image' : item.get('image', {}).get('value', 'No image available')
                                

                                
                                } for item in character_data['results']['bindings']]

            combined_results = comic_results + character_results
            
            print(combined_results)
            
            
            return Response({'keyword': keyword, 'results': combined_results})
        else:
            return Response({'error': 'Failed to retrieve data from Wikidata.'}, status=500)
    else:
        return Response({'error': 'Invalid request method. Only GET method is allowed.'}, status=405)
