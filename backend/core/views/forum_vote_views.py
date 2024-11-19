from rest_framework import viewsets, permissions
from ..models import ForumUpvote, ForumDownvote, ForumAnswerUpvote, ForumAnswerDownvote
from ..serializers.forum_vote_serializer import ForumUpvoteSerializer, ForumDownvoteSerializer, ForumAnswerUpvoteSerializer, ForumAnswerDownvoteSerializer


class ForumUpvoteViewSet(viewsets.ModelViewSet):
    queryset = ForumUpvote.objects.all()
    serializer_class = ForumUpvoteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        # Allow users to see only their own upvotes
        return self.queryset.filter(user=self.request.user)
    
class ForumDownvoteViewSet(viewsets.ModelViewSet):
    queryset = ForumDownvote.objects.all()
    serializer_class = ForumDownvoteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        # Allow users to see only their own downvotes
        return self.queryset.filter(user=self.request.user)
    

class ForumAnswerUpvoteViewSet(viewsets.ModelViewSet):
    queryset = ForumAnswerUpvote.objects.all()
    serializer_class = ForumAnswerUpvoteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        # Allow users to see only their own upvotes
        return self.queryset.filter(user=self.request.user)
    
class ForumAnswerDownvoteViewSet(viewsets.ModelViewSet):
    queryset = ForumAnswerDownvote.objects.all()
    serializer_class = ForumAnswerDownvoteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        # Allow users to see only their own downvotes
        return self.queryset.filter(user=self.request.user)