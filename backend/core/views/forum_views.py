from ..models import ForumQuestion, ForumAnswer
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.response import Response
from ..serializers.serializers import ForumAnswerSerializer
from ..serializers.forum_question_serializer import ForumQuestionSerializer
from ..permissions import IsAuthorOrReadOnly
from django.shortcuts import get_object_or_404
from rest_framework.pagination import PageNumberPagination
from rest_framework.parsers import MultiPartParser, FormParser


class ForumQuestionPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'per_page'
    max_page_size = 100


class ForumQuestionViewSet(viewsets.ModelViewSet):
    queryset = ForumQuestion.objects.all().order_by('-created_at')
    serializer_class = ForumQuestionSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]
    pagination_class = ForumQuestionPagination
    # parser_classes = (MultiPartParser, FormParser)  # Add this


    def get_parsers(self):
        if getattr(self, 'swagger_fake_view', False):
            return []

        return super().get_parsers()
    

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def list(self, request, *args, **kwargs):
        """
        Handle pagination explicitly.
        """
        queryset = self.filter_queryset(self.get_queryset()).order_by('-created_at')

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
        serializer = ForumQuestionSerializer(instance, context={'request': request, 'include_related_questions': True})
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


