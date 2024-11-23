import requests
from bs4 import BeautifulSoup
import os
from dotenv import load_dotenv

from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.views import APIView
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from ..models import ForumQuestion
from ..serializers.serializers import ForumQuestionSerializer


load_dotenv()
api_key = os.getenv('BABELNET_API_KEY')


def get_ids(word_id):
    return_array = []

    url = 'https://babelnet.io/v9/getOutgoingEdges'
    params = {
        'id': word_id,
        'key': api_key,
    }
    response = requests.get(url, params=params)

    if response.status_code != 200:
        raise Exception(f"Error fetching from BabelNet API. Status code: {response.status_code}")
    
    data = response.json()
    for value in data:
        if value.get("language") == "EN" or value.get("language") == "TR":
            if value.get("pointer").get("shortName") != "related":
                return_array.append(value)    
    
    return return_array


def ForumSemanticSearchView(ListAPIView):
    queryset = ForumQuestion.objects.all()
    serializer_class = ForumQuestionSerializer
    # permission_classes = [permissions.IsAuthenticated, IsAuthorOwnerOrReadOnly]

    @swagger_auto_schema(
        responses={200: openapi.TYPE_ARRAY},
        manual_parameters=[
            openapi.Parameter('id', openapi.IN_QUERY, description="ID of the word", type=openapi.TYPE_STRING),
        ]
    )
    
    def get(self, request):     # Complete?
        try:
            word_id = request.query_params.get('id')

            if not word_id:
                return Response({'error': 'Parameter "id" is required.'}, status=status.HTTP_400_BAD_REQUEST)

            linked_data_ids = get_ids(word_id)
            self.queryset = self.queryset.filter(tags__linked_data_id__in=linked_data_ids)

            serializers = self.serializer_class(self.queryset, many=True)

            return Response(serializers.data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
