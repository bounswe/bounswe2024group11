from rest_framework.response import Response
from rest_framework.decorators import api_view
from user.models import User
from .serializer import UserSerializer
from django.shortcuts import render
import requests

@api_view(['GET'])
def getUsers(request):
    items = User.objects.all()
    serializer = UserSerializer(items, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def addUser(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['PUT'])
def updateUser(request, pk):
    item = User.objects.get(id=pk)
    serializer = UserSerializer(instance=item, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['DELETE'])
def deleteUser(request, pk):
    item = User.objects.get(id=pk)
    item.delete()
    return Response({"res":"Object deleted!"})

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