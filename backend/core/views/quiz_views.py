from ..models import Quiz
from rest_framework import viewsets
from rest_framework import permissions
from ..serializers import QuizSerializer
from ..permissions import IsAuthorOrReadOnly

class QuizViewSet(viewsets.ModelViewSet):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]

    def perform_create(self, serializer):
        # Set the author to the current authenticated user
        serializer.save(author=self.request.user)
   
    def get_permissions(self):
        if self.action == 'list':  # If listing, allow anyone
            return [permissions.AllowAny()]
        return super().get_permissions()