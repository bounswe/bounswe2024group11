from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.authtoken.models import Token
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
import requests



my_dict = {
    "born in new york": "Q60",
    "born in new jersey": "Q1408",
    "born in themyscira":"Q2809472",
    "born in iowa":"Q1546"
  
}


@swagger_auto_schema(
    method='post',
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
@api_view(["POST"])
def search(request):
    required_fields = ['keyword']
    if not all([field in request.data for field in required_fields]):
        return Response({"error":"Please provide a keyword."}, status=status.HTTP_400_BAD_REQUEST)
    try:
        keyword = request.data.get("keyword").lower()
    except:
        return Response({"error":"Please provide a valid keyword."}, status=status.HTTP_400_BAD_REQUEST)
    #this part should be changed because we should use post to get keyword.
    if request.method == 'POST':
        #keyword = request.POST.get(request.data.get("keyword"), '')
        keyword = request.data["keyword"].lower()
       
        # Construct SPARQL query
        try:
            qid = my_dict[keyword]
        except:
            return(Response({'error': 'wrong keyword value.'}, status=400))
    

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
    #else:
    #    return Response({'error': 'Invalid request method. Only GET method is allowed.'}, status=405)
