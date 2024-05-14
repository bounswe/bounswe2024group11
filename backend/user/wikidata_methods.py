from requests import request
import requests
from rest_framework.response import Response
from rest_framework import status
from . import queries

def birth_of_place_wikidata(request):
    qid = request.GET.get('qid', None)
    category = request.GET.get('category', None)
    # qid = request.data["qid"]
    # category = request.data["category"]
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
    

