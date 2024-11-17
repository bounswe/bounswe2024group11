from ..models import ForumQuestion, ForumAnswer
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.response import Response
from ..serializers.serializers import ForumQuestionSerializer, ForumAnswerSerializer
from ..permissions import IsAuthorOrReadOnly


class ForumQuestionViewSet(viewsets.ModelViewSet):
    queryset = ForumQuestion.objects.all().order_by('-created_at')
    serializer_class = ForumQuestionSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]

    def perform_create(self, serializer):
        # Set the author to the current authenticated user
        serializer.save(author=self.request.user)

    def list(self, request, *args, **kwargs):
        queryset = ForumQuestion.objects.all().order_by('-created_at')
        serializer = ForumQuestionSerializer(queryset, many=True, context={'request': request})
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
    queryset = ForumAnswer.objects.all()
    serializer_class = ForumAnswerSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]

    def get_queryset(self):
        # Filter answers by the question ID
        return ForumAnswer.objects.filter(forum_question_id=self.kwargs['forum_question_pk'])
    
    def perform_create(self, serializer):
        # Set the author to the current authenticated user
        serializer.save(author=self.request.user, forum_question_id=self.kwargs['forum_question_pk'])
   
    def get_permissions(self):
        if self.action == 'list':  # If listing, allow anyone
            return [permissions.AllowAny()]
        return super().get_permissions()


