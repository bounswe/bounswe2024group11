import requests
from bs4 import BeautifulSoup
import os
from dotenv import load_dotenv

from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView

from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from ..models import ForumQuestion, Quiz
from ..serializers.serializers import ForumQuestionSerializer, QuizSerializer
# import pagination
from rest_framework.pagination import PageNumberPagination
from django.utils.decorators import method_decorator


load_dotenv()
api_key = os.getenv('BABELNET_API_KEY')


def get_ids(word_id):
    return_array = [word_id]

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
            # if value.get("pointer").get("shortName") != "related":
            #     return_array.append(value.get("target"))
            return_array.append(value.get("target"))    
    
    return return_array


class ForumQuestionPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'per_page'
    max_page_size = 100


@method_decorator(
    name='get',
    decorator=swagger_auto_schema(
        responses={200: openapi.TYPE_ARRAY},
        manual_parameters=[
            openapi.Parameter(
                'id', 
                openapi.IN_QUERY, 
                description="ID of the word", 
                type=openapi.TYPE_STRING
            ),
        ]
    )
)

class ForumSemanticSearchView(ListAPIView):
    queryset = ForumQuestion.objects.all().order_by('-created_at')
    serializer_class = ForumQuestionSerializer
    pagination_class = ForumQuestionPagination
    
    def get_queryset(self):
        word_id = self.request.query_params.get('id')
        if not word_id:
            raise ValueError('Parameter "id" is required.')
        linked_data_ids = get_ids(word_id)  # Make sure this function exists
        return self.queryset.filter(tags__linked_data_id__in=linked_data_ids)

    def handle_exception(self, exc):
        if isinstance(exc, ValueError):
            return Response({'error': str(exc)}, status=status.HTTP_400_BAD_REQUEST)
        return super().handle_exception(exc)


class QuizPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'per_page'
    max_page_size = 100

@method_decorator(
    name='get',
    decorator=swagger_auto_schema(
        responses={200: openapi.TYPE_ARRAY},
        manual_parameters=[
            openapi.Parameter(
                'id', 
                openapi.IN_QUERY, 
                description="ID of the word", 
                type=openapi.TYPE_STRING
            ),
        ]
    )
)

class QuizSemanticSearchView(ListAPIView):
    queryset = Quiz.objects.all().order_by('-created_at')
    serializer_class = QuizSerializer
    pagination_class = QuizPagination

    def get_queryset(self):
        word_id = self.request.query_params.get('id')
        if not word_id:
            raise ValueError('Parameter "id" is required.')
        linked_data_ids = get_ids(word_id)  # Make sure this function exists
        return self.queryset.filter(tags__linked_data_id__in=linked_data_ids)

    def handle_exception(self, exc):
        if isinstance(exc, ValueError):
            return Response({'error': str(exc)}, status=status.HTTP_400_BAD_REQUEST)
        return super().handle_exception(exc)
    