from ..models import TakeQuiz
from rest_framework import viewsets
from rest_framework import permissions
from ..serializers import TakeQuizSerializer
from ..permissions import IsAuthorOrReadOnly

class TakeQuizViewSet(viewsets.ModelViewSet):
    queryset = TakeQuiz.objects.all()
    serializer_class = TakeQuizSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]

    def perform_create(self, serializer):
        # Set the author to the current authenticated user
        print("INSIDE PERFORM CREATE")
        print("self.request.user",self.request.user)
        serializer.save(quiz_taker_user_id=self.request.user.id)
        print(serializer.data)

    def get_permissions(self):
        if self.action == 'list':
            return [permissions.AllowAny()]
        return super().get_permissions()
        