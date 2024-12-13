import requests
from bs4 import BeautifulSoup

from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView

from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from ..models import ForumQuestion, Quiz
from ..serializers.serializers import QuizSerializer
from ..serializers.forum_question_serializer import ForumQuestionSerializer
# import pagination
from rest_framework.pagination import PageNumberPagination
from django.utils.decorators import method_decorator
from ..utils import get_ids




class ForumQuestionPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'per_page'
    max_page_size = 100


@method_decorator(
    name='get',
    decorator=swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter(
                'id',
                openapi.IN_QUERY,
                type=openapi.TYPE_STRING,
                description="example: `bn:00005106n`"
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
        manual_parameters=[
            openapi.Parameter(
                'id',
                openapi.IN_QUERY,
                type=openapi.TYPE_STRING,
                description="example: `bn:00028795n`"
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
    