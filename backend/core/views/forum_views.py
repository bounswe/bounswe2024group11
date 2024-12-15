from ..models import ForumQuestion, ForumAnswer, Block
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.response import Response
from ..serializers.serializers import ForumAnswerSerializer
from ..serializers.forum_question_serializer import ForumQuestionSerializer
from ..permissions import IsAuthorOrReadOnly
from django.shortcuts import get_object_or_404
from rest_framework.pagination import PageNumberPagination
from rest_framework.parsers import MultiPartParser, FormParser
from ..utils import get_ids
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

class ForumQuestionPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'per_page'
    max_page_size = 100


class ForumQuestionViewSet(viewsets.ModelViewSet):
    serializer_class = ForumQuestionSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]
    pagination_class = ForumQuestionPagination
    # parser_classes = (MultiPartParser, FormParser)  # Add this

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            blocked_users = Block.objects.filter(blocker=user).values_list('blocking', flat=True)
            return ForumQuestion.objects.exclude(author__in=blocked_users).order_by('-created_at')
        return ForumQuestion.objects.all().order_by('-created_at')
    
    def get_parsers(self):
        if getattr(self, 'swagger_fake_view', False):
            return []

        return super().get_parsers()
    

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    @swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter(
                'linked_data_id',
                openapi.IN_QUERY,
                type=openapi.TYPE_STRING,
                description="ID for linked data semantic search"
            ),
        ]
    )
    def list(self, request, *args, **kwargs):
        """
        Handle pagination explicitly.
        """
        linked_data_id = self.request.query_params.get('linked_data_id')
        if linked_data_id:
            linked_data_ids = get_ids(linked_data_id)
            queryset = self.filter_queryset(self.get_queryset()).filter(tags__linked_data_id__in=linked_data_ids).order_by('-created_at')
        else:
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
    serializer_class = ForumAnswerSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            blocked_users = Block.objects.filter(blocker=user).values_list('blocking', flat=True)
            # Filter answers by the question ID and blocked users
            return ForumAnswer.objects.filter(forum_question_id=self.kwargs['forum_question_pk']).exclude(author__in=blocked_users).order_by('created_at')
        return ForumAnswer.objects.filter(forum_question_id=self.kwargs['forum_question_pk']).order_by('created_at')
    
    def perform_create(self, serializer):
        # Set the author to the current authenticated user
        serializer.save(author=self.request.user, forum_question_id=self.kwargs['forum_question_pk'])
   
    def get_permissions(self):
        if self.action == 'list':  # If listing, allow anyone
            return [permissions.AllowAny()]
        return super().get_permissions()


