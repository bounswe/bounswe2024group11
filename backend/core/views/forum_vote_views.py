from rest_framework import viewsets, permissions
from ..models import ForumUpvote
from ..serializers.forum_vote_serializer import ForumUpvoteSerializer


class ForumUpvoteViewSet(viewsets.ModelViewSet):
    queryset = ForumUpvote.objects.all()
    serializer_class = ForumUpvoteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        # Allow users to see only their own upvotes
        return self.queryset.filter(user=self.request.user)
    