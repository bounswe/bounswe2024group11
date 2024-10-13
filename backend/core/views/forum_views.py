from ..models import ForumQuestion
from rest_framework import viewsets
from rest_framework import permissions
from ..serializers import ForumQuestionSerializer
from ..permissions import IsAuthorOrReadOnly


class ForumQuestionViewSet(viewsets.ModelViewSet):
    queryset = ForumQuestion.objects.all()
    serializer_class = ForumQuestionSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]

    def perform_create(self, serializer):
        # Set the author to the current authenticated user
        serializer.save(author=self.request.user)
