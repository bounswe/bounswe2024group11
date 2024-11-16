from rest_framework import viewsets, permissions
from ..models import ForumBookmark
from ..serializers.serializers import ForumBookmarkSerializer

class ForumBookmarkViewSet(viewsets.ModelViewSet):
    queryset = ForumBookmark.objects.all()
    serializer_class = ForumBookmarkSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        # Allow users to see only their own bookmarks
        return self.queryset.filter(user=self.request.user)
