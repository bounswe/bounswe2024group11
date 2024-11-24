from ..models import Quiz
from rest_framework import viewsets
from rest_framework import permissions
from ..serializers.serializers import QuizSerializer
from ..permissions import IsAuthorOrReadOnly
from rest_framework.pagination import PageNumberPagination
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
import requests
import os
from dotenv import load_dotenv
from .semantic_search_views import get_ids

load_dotenv()
api_key = os.getenv('BABELNET_API_KEY')

class QuizPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'per_page'
    max_page_size = 100

class QuizViewSet(viewsets.ModelViewSet):
    queryset = Quiz.objects.all().order_by('-created_at')
    serializer_class = QuizSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]
    pagination_class = QuizPagination

    @swagger_auto_schema(
        operation_description="Retrieve a list of quizzes with optional filters and sorting.",
        manual_parameters=[
            openapi.Parameter(
                name="tag",
                in_=openapi.IN_QUERY,
                type=openapi.TYPE_STRING,
                description="example: `bn:00028795n`"
            ),
            openapi.Parameter(
                name="sort",
                in_=openapi.IN_QUERY,
                type=openapi.TYPE_STRING,
                enum=["oldest", "newest", "popular"],
                description="Sort quizzes by creation date or popularity. Defaults to 'newest'."
            )
        ],
        responses={200: QuizSerializer(many=True)},
    )
    def list(self, request, *args, **kwargs):
        word_id = self.request.query_params.get('tag')
        if word_id:
            linked_data_ids = get_ids(word_id)
            queryset = Quiz.objects.filter(tags__linked_data_id__in=linked_data_ids)
        else:
            queryset = Quiz.objects.all()

        sort = self.request.query_params.get('sort')
        if sort == 'oldest':
            queryset = queryset.order_by('created_at')
        elif sort == 'newest':
            queryset = queryset.order_by('-created_at')
        elif sort == 'popular':
            queryset = queryset.order_by('-upvotes')
        else:
            queryset = queryset.order_by('-created_at')
        # Handle pagination explicitly.
        
        # queryset = self.filter_queryset(self.get_queryset()).order_by('-created_at')

        # Apply pagination
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        # Fallback: If pagination is not applied, return the full dataset
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def calculate_difficulty(self, questions):
        # implement this method to calculate the difficulty of a quiz via external api
        return 1

    def perform_create(self, serializer):
        # Set the author to the current authenticated user
        serializer.save(author=self.request.user, difficulty=self.calculate_difficulty(serializer.validated_data['questions']))
   
    def get_permissions(self):
        if self.action == 'list':  # If listing, allow anyone
            return [permissions.AllowAny()]
        return super().get_permissions()