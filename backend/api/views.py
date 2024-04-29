from rest_framework.response import Response
from rest_framework.decorators import api_view
from user.models import User
from .serializer import UserSerializer
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.shortcuts import get_object_or_404
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
import requests

@swagger_auto_schema(
    method='post',
    operation_description="Register a user with a unique username, a unique email and a password.",
    operation_summary="register a user",
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'username': openapi.Schema(type=openapi.TYPE_STRING),
            'email': openapi.Schema(type=openapi.TYPE_STRING),
            'password': openapi.Schema(type=openapi.TYPE_STRING)    
        },
        required=['username', 'email', 'password']
    ),    responses={
        201: "Created",
        400: "Missing required fields or nonunique username/email"
    },
    operation_id='signup',
)
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


@swagger_auto_schema(
    method='post',
    operation_description="Login with a username and a password.",
    operation_summary="login",
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'username': openapi.Schema(type=openapi.TYPE_STRING),
            'password': openapi.Schema(type=openapi.TYPE_STRING)    
        },
        required=['username', 'password']
    ),

    responses={
        200: "Success",
        400: "Missing required fields",
        401: "Unauthorized, wrong username or password"
    },
    operation_id='login'
)
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
my_dict = {
    "born in new york": "Q60",
    "born in new jersey": "Q1408",
    "born in themyscira":"Q2809472",
    "born in iowa":"Q1546"
  
}

@api_view(["GET"])
def search(request):
    #this part should be changed because we should use post to get keyword.
    if request.method == 'GET':
        #keyword = request.POST.get(request.data.get("keyword"), '')
        keyword = request.data["keyword"].lower()
       
        # Construct SPARQL query
        try:
            qid = my_dict[keyword]
        except:
            return(Response({'error': 'Wrong dictionary format.'}, status=400))
    

        birtOfPlace_query = """
        #New York doğumlu insanlar
        #title: Humans born in New York City
        SELECT DISTINCT ?item ?itemLabel ?itemDescription ?sitelinks ?placeOfBirthLabel 
        WHERE {
            ?item wdt:P31 wd:Q1114461;            # Any instance of a human
                  wdt:P19/wdt:P131* wd:%s;
                 
                  wikibase:sitelinks ?sitelinks.
                  OPTIONAL{
                   ?item wdt:P19 ?placeOfBirth.
                   ?placeOfBirth rdfs:label ?placeOfBirthLabel.
                   FILTER(LANG(?placeOfBirthLabel) ="en").
                  }
                  
                    # Who was born in any value (eg. a hospital)
        # that has the property of 'administrative area of' New York City or New York City itself.

        # Note that using wdt:P19 wd:Q60;  # Who was born in New York City.
        # Doesn't include humans with the birth place listed as a hospital
        # or an administrative area or other location of New York City.

                
            SERVICE wikibase:label { bd:serviceParam wikibase:language "en" }
        }
        ORDER BY DESC(?sitelinks)
        """ %qid

        # Construct SPARQL query for comic characters
        

        # Parameters for the API call
        birtOfPlace_query_params = {
            'query': birtOfPlace_query,
            'format': 'json'  # Response format
        }
        
        

        # API endpoint
        url = 'https://query.wikidata.org/sparql'

        # Make the API call
        try:
            birtOfPlace_response = requests.get(url, params=birtOfPlace_query_params)
        except:
            return(Response({'error': 'Wrong query format.'}, status=400))

        #character_response = requests.get(url, params=character_params)
        
        # Check if the request was successful
        if birtOfPlace_response.status_code == 200 :
            
            # Parse JSON response
            birth_data = birtOfPlace_response.json()
            #character_data = character_response.json()

           

            birth_of_results = [{'type': 'character', 
                              'label': item['itemLabel']['value'], 
                              'description': item['itemDescription']['value'],
                              'place': item.get('placeOfBirthLabel',{}).get('value','Unknown'),
                              'siteLinks': item.get('sitelinks',{}).get('value','Unknown'),


                             } for item in birth_data['results']['bindings']]
          

            combined_results = birth_of_results
            
            #print(combined_results)
            
            
            return Response({'keyword': keyword, 'results': combined_results})
        else:
            return Response({'error': 'Failed to retrieve data from Wikidata.'}, status=400)
    else:
        return Response({'error': 'Invalid request method. Only GET method is allowed.'}, status=405)