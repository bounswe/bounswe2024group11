from requests import request
import requests
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import User
from .serializer import UserSerializer
from rest_framework import status
from rest_framework.authtoken.models import Token
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from . import queries

# Create your views here.
@swagger_auto_schema(
    method='post',
    operation_description="Register a user with a unique username, a unique email, a password and full name.",
    operation_summary="register a user",
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'username': openapi.Schema(type=openapi.TYPE_STRING),
            'email': openapi.Schema(type=openapi.TYPE_STRING),
            'password': openapi.Schema(type=openapi.TYPE_STRING),
            'fullname': openapi.Schema(type=openapi.TYPE_STRING) 
        },
        required=['username', 'email', 'password', 'fullname']
    ),    responses={
        201: "Created",
        400: "Missing required fields or nonunique username/email"
    },
    operation_id='signup',
)
@api_view(['POST'])
def register(request):
    required_fields = ['username', 'password', 'email', 'fullname']
    if not all([field in request.data for field in required_fields]):
        return Response({"error":"Please provide all required fields."}, status=status.HTTP_400_BAD_REQUEST)
    
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
        return Response({"error":"Please provide both username and password."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.get(username=request.data['username'])
    except User.DoesNotExist:
        return Response({"error": "Username not found."}, status=status.HTTP_401_UNAUTHORIZED)

    if not user.check_password(request.data['password']):
        return Response({"error":"password does not match."}, status=status.HTTP_401_UNAUTHORIZED)
    token, created = Token.objects.get_or_create(user=user)
    serializer = UserSerializer(instance=user)
    return Response({"token": token.key, "user": serializer.data}, status=status.HTTP_200_OK)



@swagger_auto_schema(
    method='get',
    operation_description="wikidata semantic search api.",
    operation_summary="wikidata api",
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'keyword': openapi.Schema(type=openapi.TYPE_STRING),
        },
        required=['keyword']
    ),

    responses={
        200: "Success",
        400: "Missing required fields",
    },
    operation_id='wikidata_search'
)
@api_view(["GET"])
def wikidata_suggestions(request):
    required_fields = ['keyword']
    if not all([field in request.data for field in required_fields]):
        return Response({"error":"Please provide a keyword."}, status=status.HTTP_400_BAD_REQUEST)
    try:
        keyword = request.data["keyword"].lower().strip().split(" ")
        keyword = "%20".join(keyword)
    except:
        return Response({"error":"Please provide a valid keyword."}, status=status.HTTP_400_BAD_REQUEST)
    url = f"https://www.wikidata.org/w/api.php?action=wbsearchentities&format=json&language=en&limit=20&search={keyword}&type=item&uselang=en"
    try:
        response = requests.get(url)
    except:
        return(Response({'error': 'wrong keyword value.'}, status=400))
    if response.status_code == 200:
        # Parse JSON response
        data = response.json()
    
        # Extract required information from the response
        entities = []
        for item in data.get("search", []):
            # Check if label is a dictionary or a string
            if isinstance(item.get("label"), dict):
                label = item["label"]["value"]
            else:
                label = item.get("label", "")
            
            if isinstance(item.get("description"), dict):
                description = item["description"]["value"]
            else:
                description = item.get("description", "")
            
            # Concatenate label and description with a separator
            label_description = f"{label}: {description}"
            entity_info = {
                "id": item.get("id", ""),
                "label_description": label_description
            }
            entities.append(entity_info)


        return Response(entities, status=status.HTTP_200_OK)
    else:
        # Handle error
        return Response({'error': 'Failed to fetch data from Wikidata API'}, status=status.HTTP_400_BAD_REQUEST)

@swagger_auto_schema(
    method="get",
    operation_description="Search for related posts",
    operation_summary="User enters a key. This endpoint executes a Wikidata Query. Using these results, it searches for related posts in the database.",
    responses={
        200: "Success",
        400: "Missing required fields"
    },
    operation_id='search'
)
@api_view(["GET"])
def post_search(request):
    required_fields = ["qid", "category"]
    if not all([field in request.data for field in required_fields]):
        return Response({"error": "Please provide qid and category."}, status=status.HTTP_400_BAD_REQUEST)
    qid = request.data["qid"]
    category = request.data["category"]
    birthOfPlace_query_formatted = queries.birthOfPlace_query%qid
    birthOfPlace_query_params = {
            'query': birthOfPlace_query_formatted,
            'format': 'json'  # Response format
    }
    # API endpoint
    url = 'https://query.wikidata.org/sparql'

    # Make the API call
    try:
        birthOfPlace_response = requests.get(url, params=birthOfPlace_query_params)
    except:
        return(Response({'error': 'Wrong query format.'}, status=400))

    #character_response = requests.get(url, params=character_params)
    
    # Check if the request was successful
    if birthOfPlace_response.status_code == 200 :
        
        # Parse JSON response
        birth_data = birthOfPlace_response.json()
        #character_data = character_response.json()

        

        birth_of_results = [{'type': 'character', 
                            'label': item['itemLabel']['value'], 
                            'description': item['itemDescription']['value'],
                            'place': item.get('placeOfBirthLabel',{}).get('value','Unknown'),
                            'siteLinks': item.get('sitelinks',{}).get('value','Unknown'),


                            } for item in birth_data['results']['bindings']]
        

        combined_results = birth_of_results
        
        #print(combined_results)
        
        
        return Response({'keyword': qid, 'results': combined_results})
    else:
        return Response({'error': 'Failed to retrieve data from Wikidata.'}, status=400)