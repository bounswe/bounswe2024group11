from ..models import Quiz
from rest_framework import viewsets
from rest_framework import permissions
from ..serializers.serializers import QuizSerializer
from ..permissions import IsAuthorOrReadOnly

class QuizViewSet(viewsets.ModelViewSet):
    queryset = Quiz.objects.all().order_by('-created_at')
    serializer_class = QuizSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]

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