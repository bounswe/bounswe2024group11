import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from bs4 import BeautifulSoup


class TaggingView(APIView):
    # query params: word, lang
    def get(self, request):
        word = request.query_params['word']
        lang = request.query_params['lang']
        url = f"https://babelnet.org/search?word={word}&lang={lang}"
        headers = {"User-Agent": "Mozilla/5.0"}

        try:
            # Send a GET request to the URL
            response = requests.get(url)
            response.raise_for_status()  # Raise an error for bad responses

            # Parse the HTML content
            soup = BeautifulSoup(response.text, 'html.parser')

            # Iterate through lines of the HTML content
            for line in response.text.splitlines():
                if word.lower() in line.lower():
                    print(f"Found: {line.strip()}")

            return Response(data={"message": "Success"}, status=status.HTTP_200_OK)

        except requests.exceptions.RequestException as e:
            print(f"Error fetching the URL: {str(e)}")
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)