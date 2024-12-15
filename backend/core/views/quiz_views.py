from ..models import Quiz
from rest_framework import viewsets
from rest_framework import permissions
from ..serializers.serializers import QuizSerializer
from ..permissions import IsAuthorOrReadOnly
from rest_framework.pagination import PageNumberPagination
from ..models import Block
from ..utils import get_ids
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

class QuizPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'per_page'
    max_page_size = 100

class QuizViewSet(viewsets.ModelViewSet):
    queryset = Quiz.objects.all().order_by('-created_at')
    serializer_class = QuizSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]
    pagination_class = QuizPagination

    def calculate_difficulty(self, questions):
        # implement this method to calculate the difficulty of a quiz via external api
        return 1

    def perform_create(self, serializer):
        # Set the author to the current authenticated user
        serializer.save(author=self.request.user, difficulty=self.calculate_difficulty(serializer.validated_data['questions']))
    
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
        return super().list(request, *args, **kwargs)
    def get_queryset(self):  #  Overrided to make it customized :p,  need more testing.
        queryset = super().get_queryset()
        user = self.request.user
        if user.is_authenticated:
            blocked_users = Block.objects.filter(blocker=user).values_list('blocking__id', flat=True)  # Fetch ing blocked users
            queryset = queryset.exclude(author__id__in=blocked_users)  # ! Excluding quizzes by blocked users

        linked_data_id = self.request.query_params.get('linked_data_id')
        if linked_data_id:
            linked_data_ids = get_ids(linked_data_id)
            queryset = queryset.filter(tags__linked_data_id__in=linked_data_ids).order_by('-created_at')

        return queryset
   
    def get_permissions(self):
        if self.action == 'list':  # If listing, allow anyone
            return [permissions.AllowAny()]
        return super().get_permissions()