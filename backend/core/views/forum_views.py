from ..models import ForumQuestion
from rest_framework import viewsets
from rest_framework import permissions
from ..serializers import ForumQuestionSerializer
from ..permissions import IsAuthorOrReadOnly


class ForumQuestionViewSet(viewsets.ModelViewSet):
    queryset = ForumQuestion.objects.all().order_by('-created_at')
    serializer_class = ForumQuestionSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]

    def perform_create(self, serializer):
        # Set the author to the current authenticated user
        serializer.save(author=self.request.user)
   
    def get_permissions(self):
        if self.action == 'list':  # If listing, allow anyone
            return [permissions.AllowAny()]
        return super().get_permissions()


