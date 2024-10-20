from ..models import ForumQuestion, Vote
from rest_framework import viewsets
from rest_framework import permissions
from ..serializers import ForumQuestionSerializer, VoteSerializer
from ..permissions import IsAuthorOrReadOnly
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import action



class ForumQuestionViewSet(viewsets.ModelViewSet):
    queryset = ForumQuestion.objects.all().order_by('-date')
    serializer_class = ForumQuestionSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]

    def perform_create(self, serializer):
        # Set the author to the current authenticated user
        serializer.save(author=self.request.user)
   
    def get_permissions(self):
        if self.action == 'list':  # If listing, allow anyone
            return [permissions.AllowAny()]
        return super().get_permissions()


class VoteViewSet(viewsets.ModelViewSet):
    queryset = Vote.objects.all()  # Retrieves all Vote instances
    serializer_class = VoteSerializer
    permission_classes = [permissions.IsAuthenticated]  # Require authentication to interact

    def get_queryset(self):
        # Filter votes by the authenticated user
        return Vote.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Automatically set the user to the authenticated user when creating a vote
        serializer.save(user=self.request.user)
    
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        
        # Check if the authenticated user is the one who created the vote
        if instance.user != request.user:
            return Response(
                {"error": "You are not authorized to delete this vote."},
                status=status.HTTP_403_FORBIDDEN
            )
        
        # If authorized, perform the delete operation
        self.perform_destroy(instance)
        return Response(
            {"message": "Vote deleted successfully."}, 
            status=status.HTTP_204_NO_CONTENT
        )
    
    @action(detail=True, methods=['get'], url_path='vote-summary')
    def vote_summary(self, request, pk=None):
        """
        Get the count of positive and negative votes for a specific forum question.
        """
        # Retrieve the forum question by its ID (passed as pk)
        forum_question_id = pk
        
        # Count positive votes (voted=True) and negative votes (voted=False)
        positive_votes = Vote.objects.filter(forum_question_id=forum_question_id, voted=True).count()
        negative_votes = Vote.objects.filter(forum_question_id=forum_question_id, voted=False).count()

        return Response(
            {
                "positive_votes": positive_votes,
                "negative_votes": negative_votes
            },
            status=status.HTTP_200_OK
        )