from ..models import RateQuiz
from rest_framework import viewsets
from rest_framework import permissions
from ..serializers import RateQuizSerializer
from ..permissions import IsAuthorOrReadOnly

class RateQuizViewSet(viewsets.ModelViewSet):
    queryset = RateQuiz.objects.all()
    serializer_class = RateQuizSerializer
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
        