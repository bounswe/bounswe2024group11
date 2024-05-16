from requests import request
import requests
from rest_framework.response import Response
from rest_framework import status
from . import queries

def born_in_wikidata(qid):
    birthOfPlace_query_formatted = queries.born_in%qid
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

        

        birth_of_results = [{
                             'qid': item['item']['value'].split('/')[-1],
                            'label': item['itemLabel']['value'], 
                            # 'description': item['itemDescription']['value'],
                            # 'place': item.get('placeOfBirthLabel',{}).get('value','Unknown'),
                            'siteLinks': item.get('sitelinks',{}).get('value','Unknown'),


                            } for item in birth_data['results']['bindings']]
        

        combined_results = birth_of_results
        
        
        
        return Response({'keyword': qid, 'results': combined_results})
    else:
        return Response({'error': 'Failed to retrieve data from Wikidata.'}, status=400)
    

def enemy_of_wikidata(qid):
    enemy_of_query_formatted = queries.enemy_of_query%qid
    enemy_of_query_params = {
            'query': enemy_of_query_formatted,
            'format': 'json'  # Response format
    }
    # API endpoint
    url = 'https://query.wikidata.org/sparql'

    # Make the API call

    try:
        enemy_of_response = requests.get(url, params=enemy_of_query_params)
    except:
        return(Response({'error': 'Wrong query format.'}, status=400))
    
    # Check if the request was successful
    if enemy_of_response.status_code == 200 :
        
        # Parse JSON response
        enemy_data = enemy_of_response.json()
        #character_data = character_response.json()

        

        enemy_of_results = [{
                             'qid': item['enemy']['value'].split('/')[-1],
                            'label': item['enemyLabel']['value'], 
                            'siteLinks': item.get('sitelinks',{}).get('value','Unknown'),


                            } for item in enemy_data['results']['bindings']]
        

        combined_results = enemy_of_results
        
        
        
        return Response({'keyword': qid, 'results': combined_results})
    else:
        return Response({'error': 'Failed to retrieve data from Wikidata.'}, status=400)
    
def occupation_wikidata(qid):
    occupation_query_formatted = queries.occupation%qid
    occupation_query_params = {
            'query': occupation_query_formatted,
            'format': 'json'  # Response format
    }
    # API endpoint
    url = 'https://query.wikidata.org/sparql'

    # Make the API call

    try:
        occupation_response = requests.get(url, params=occupation_query_params)
    except:
        return(Response({'error': 'Wrong query format.'}, status=400))
    
    # Check if the request was successful
    if occupation_response.status_code == 200 :
        
        # Parse JSON response
        occupation_data = occupation_response.json()
        #character_data = character_response.json()

        

        occupation_results = [{ 
                             'qid': item['item']['value'].split('/')[-1],
                            'label': item['itemLabel']['value'], 
                            'siteLinks': item.get('sitelinks',{}).get('value','Unknown'),


                            } for item in occupation_data['results']['bindings']]
        

        combined_results = occupation_results
        
        
        
        return Response({'keyword': qid, 'results': combined_results})
    else:
        return Response({'error': 'Failed to retrieve data from Wikidata.'}, status=400)
    
def present_in_wikidata(qid):
    present_in_work_query_formatted = queries.present_in_work%qid
    present_in_work_query_params = {
            'query': present_in_work_query_formatted,
            'format': 'json'  # Response format
    }
    # API endpoint
    url = 'https://query.wikidata.org/sparql'

    # Make the API call

    try:
        present_in_work_response = requests.get(url, params=present_in_work_query_params)
    except:
        return(Response({'error': 'Wrong query format.'}, status=400))
    
    # Check if the request was successful
    if present_in_work_response.status_code == 200 :
        
        # Parse JSON response
        present_in_work_data = present_in_work_response.json()
        #character_data = character_response.json()

        

        present_in_work_results = [{ 
                             'qid': item['item']['value'].split('/')[-1],
                            'label': item['itemLabel']['value'], 
                            'siteLinks': item.get('sitelinks',{}).get('value','Unknown'),


                            } for item in present_in_work_data['results']['bindings']]
        

        combined_results = present_in_work_results
        
        
        
        return Response({'keyword': qid, 'results': combined_results})
    else:
        return Response({'error': 'Failed to retrieve data from Wikidata.'}, status=400)

def educated_at_wikidata(qid):
    educated_at_query_formatted = queries.educated_at%qid
    educated_at_query_params = {
            'query': educated_at_query_formatted,
            'format': 'json'  # Response format
    }
    # API endpoint
    url = 'https://query.wikidata.org/sparql'

    # Make the API call

    try:
        educated_at_response = requests.get(url, params=educated_at_query_params)
    except:
        return(Response({'error': 'Wrong query format.'}, status=400))
    
    # Check if the request was successful
    if educated_at_response.status_code == 200 :
        
        # Parse JSON response
        educated_at_data = educated_at_response.json()
        #character_data = character_response.json()

        

        educated_at_results = [{ 
                             'qid': item['item']['value'].split('/')[-1],
                            'label': item['itemLabel']['value'], 
                            'siteLinks': item.get('sitelinks',{}).get('value','Unknown'),


                            } for item in educated_at_data['results']['bindings']]
        

        combined_results = educated_at_results
        
        
        
        return Response({'keyword': qid, 'results': combined_results})
    else:
        return Response({'error': 'Failed to retrieve data from Wikidata.'}, status=400)

def member_of_wikidata(qid):
    member_of_query_formatted = queries.member_of%qid
    member_of_query_params = {
            'query': member_of_query_formatted,
            'format': 'json'  # Response format
    }
    # API endpoint
    url = 'https://query.wikidata.org/sparql'

    # Make the API call

    try:
        member_of_response = requests.get(url, params=member_of_query_params)
    except:
        return(Response({'error': 'Wrong query format.'}, status=400))
    
    # Check if the request was successful
    if member_of_response.status_code == 200 :
        
        # Parse JSON response
        member_of_data = member_of_response.json()
        #character_data = character_response.json()

        

        member_of_results = [{ 
                             'qid': item['item']['value'].split('/')[-1],
                            'label': item['itemLabel']['value'], 
                            'siteLinks': item.get('sitelinks',{}).get('value','Unknown'),


                            } for item in member_of_data['results']['bindings']]
        

        combined_results = member_of_results
        
        
        
        return Response({'keyword': qid, 'results': combined_results})
    else:
        return Response({'error': 'Failed to retrieve data from Wikidata.'}, status=400)