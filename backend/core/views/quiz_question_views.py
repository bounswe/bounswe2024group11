from ..models import Quiz, QuizQuestion
from rest_framework import viewsets
from rest_framework import permissions
from ..serializers import QuizQuestionSerializer
from ..permissions import IsAuthorOrReadOnly

# WE PLAN TO NOT USE IT. MAY DELETE LATER
class QuizQuestionViewSet(viewsets.ModelViewSet):
    queryset = QuizQuestion.objects.all()
    serializer_class = QuizQuestionSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]

    def perform_create(self, serializer):
        # Extract the quiz_id from the URL and fetch the related Quiz instance
        quiz_id = self.kwargs['quiz_id']  # Extract quiz_id from URL parameters
        quiz = Quiz.objects.get(id=quiz_id)  # Fetch the Quiz instance
        
        # Save the QuizQuestion with the associated Quiz and current user as the author if needed
        serializer.save(quiz=quiz)

   
    def get_permissions(self):
        if self.action == 'list':  # If listing, allow anyone
            return [permissions.AllowAny()]
        return super().get_permissions()