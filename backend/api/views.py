from rest_framework.response import Response
from rest_framework.decorators import api_view
from user.models import User
from .serializer import UserSerializer
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.shortcuts import get_object_or_404
from django.shortcuts import render
import requests
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



def search_wikidata(request):
    if request.method == 'POST':
        keyword = request.POST.get('keyword')
        
        # Construct SPARQL query
        sparql_query = """
        SELECT ?item ?itemLabel ?description ?image
        WHERE {
            ?item ?label "%s"@en.
            OPTIONAL { ?item schema:description ?description. FILTER(LANG(?description) = "en") }
            OPTIONAL { ?item wdt:P18 ?image }
            SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
        }
        LIMIT 10
        """ % keyword

        # Send SPARQL query to Wikidata
        response = requests.get('https://query.wikidata.org/sparql', params={'query': sparql_query, 'format': 'json'})
        
        if response.status_code == 200:
            # Process the response
            data = response.json()
            results = data['results']['bindings']
            
            return render(request, 'search_results.html', {'results': results})
        else:
            # Handle error
            return render(request, 'error.html', {'message': 'Error occurred while fetching data from Wikidata.'})
    else:
        return render(request, 'search_form.html')