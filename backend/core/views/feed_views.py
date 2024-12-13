from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from ..models import ForumQuestion, Quiz, Follow
from ..serializers.forum_question_serializer import ForumQuestionSerializer
from ..serializers.serializers import QuizSerializer


class FeedViewSet(ViewSet):
    permission_classes = [IsAuthenticated]  # Only authenticated users can access the feed

    def list(self, request):
        """
        Fetch the 4 most recently shared forum questions and quizzes posted by users the current user follows.
        """
        followed_users = Follow.objects.filter(follower=request.user).values_list('following', flat=True)
        
        forum_questions = ForumQuestion.objects.filter(author__id__in=followed_users).order_by('-created_at')[:4]
        quizzes = Quiz.objects.filter(author__id__in=followed_users).order_by('-created_at')[:4]

        forum_questions_serialized = ForumQuestionSerializer(forum_questions, many=True, context={'request': request}).data
        quizzes_serialized = QuizSerializer(quizzes, many=True, context={'request': request}).data

        feed_data = {
            "forum_questions": forum_questions_serialized,
            "quizzes": quizzes_serialized
        }
        return Response(feed_data)
