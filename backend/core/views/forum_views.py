from ..models import ForumQuestion, ForumAnswer
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.response import Response
from ..serializers.serializers import ForumAnswerSerializer
from ..serializers.forum_question_serializer import ForumQuestionSerializer
from ..permissions import IsAuthorOrReadOnly
from django.shortcuts import get_object_or_404
from rest_framework.pagination import PageNumberPagination
import requests
import os
from dotenv import load_dotenv
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from .semantic_search_views import get_ids

load_dotenv()
api_key = os.getenv('BABELNET_API_KEY')


class ForumQuestionPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'per_page'
    max_page_size = 100


class ForumQuestionViewSet(viewsets.ModelViewSet):
    queryset = ForumQuestion.objects.all().order_by('-created_at')
    serializer_class = ForumQuestionSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]
    pagination_class = ForumQuestionPagination
        

    def perform_create(self, serializer):
        # Set the author to the current authenticated user
        serializer.save(author=self.request.user)

    @swagger_auto_schema(
        operation_description="Retrieve a list of forum questions with optional filters and sorting.",
        manual_parameters=[
            openapi.Parameter(
                name="tag",
                in_=openapi.IN_QUERY,
                type=openapi.TYPE_STRING,
                description="example: `bn:00005106n`"
            ),
            openapi.Parameter(
                name="sort",
                in_=openapi.IN_QUERY,
                type=openapi.TYPE_STRING,
                enum=["oldest", "newest", "popular"],
                description="Sort forum questions by creation date or popularity. Defaults to 'newest'."
            )
        ],
        responses={200: ForumQuestionSerializer(many=True)},
    )

    def list(self, request, *args, **kwargs):
        # queryset = ForumQuestion.objects.all().order_by('-created_at')
        # serializer = ForumQuestionSerializer(queryset, many=True, context={'request': request})
        # return Response(serializer.data)

        word_id = self.request.query_params.get('tag')
        if word_id:
            linked_data_ids = get_ids(word_id)
            queryset = ForumQuestion.objects.filter(tags__linked_data_id__in=linked_data_ids)
        else:
            queryset = ForumQuestion.objects.all()

        sort = self.request.query_params.get('sort')
        if sort == 'oldest':
            queryset = queryset.order_by('created_at')
        elif sort == 'newest':
            queryset = queryset.order_by('-created_at')
        elif sort == 'popular':
            queryset = queryset.order_by('-upvotes')
        else:
            queryset = queryset.order_by('-created_at')
        """
        Handle pagination explicitly.
        """
        # queryset = self.filter_queryset(self.get_queryset()).order_by('-created_at')

        # Apply pagination
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        # Fallback: If pagination is not applied, return the full dataset
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = ForumQuestionSerializer(instance, context={'request': request})
        return Response(serializer.data)
    
    def get_permissions(self):
        if self.action == 'list':  # If listing, allow anyone
            return [permissions.AllowAny()]
        return super().get_permissions()
    
class ForumAnswerViewSet(viewsets.ModelViewSet):
    queryset = ForumAnswer.objects.all().order_by('created_at')
    serializer_class = ForumAnswerSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]

    def get_queryset(self):
        # Filter answers by the question ID
        return ForumAnswer.objects.filter(forum_question_id=self.kwargs['forum_question_pk']).order_by('created_at')
    
    def perform_create(self, serializer):
        # Set the author to the current authenticated user
        serializer.save(author=self.request.user, forum_question_id=self.kwargs['forum_question_pk'])
   
    def get_permissions(self):
        if self.action == 'list':  # If listing, allow anyone
            return [permissions.AllowAny()]
        return super().get_permissions()


