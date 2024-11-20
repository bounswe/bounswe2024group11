from ..models import TakeQuiz
from rest_framework import viewsets
from rest_framework import permissions
from ..serializers.take_quiz_serializer import TakeQuizSerializer
from ..permissions import IsAuthorOrReadOnly

class TakeQuizViewSet(viewsets.ModelViewSet):
    queryset = TakeQuiz.objects.all().order_by('id')
    serializer_class = TakeQuizSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]

    def perform_create(self, serializer):
        # Set the author to the current authenticated user
        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
        # Set the author to the current authenticated user
        serializer.save(user=self.request.user)

    def get_permissions(self):
        if self.action == 'list':
            return [permissions.AllowAny()]
        return super().get_permissions()
