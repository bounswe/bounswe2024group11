from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from ..models import ForumQuestion, Quiz, Follow, Tag
from ..serializers.forum_question_serializer import ForumQuestionSerializer
from ..serializers.serializers import QuizSerializer


class FeedViewSet(ViewSet):
    permission_classes = [IsAuthenticated]  # Only authenticated users can access the feed

    def list(self, request):
        """
        Fetch the feed containing:
        - Forum questions and quizzes by followed users.
        - Forum questions and quizzes related to user's interests.
        - Semantically related tags for forum questions and quizzes (separated).
        """
        user = request.user

        # Retrieve the followed users using the Follow model
        followed_users = Follow.objects.filter(follower=user).values_list('following', flat=True)

        # Fetch the 4 most recent forum questions by followed users
        forum_questions_by_followed_users = ForumQuestion.objects.filter(
            author__id__in=followed_users
        ).order_by('-created_at')[:4]

        # Fetch the 4 most recent quizzes by followed users
        quizzes_by_followed_users = Quiz.objects.filter(
            author__id__in=followed_users
        ).order_by('-created_at')[:4]

        # Fetch the user's interest tags
        interest_tags = user.interests.all()

        # Fetch forum questions related to the user's interests
        forum_questions_by_interests = ForumQuestion.objects.filter(
            tags__in=interest_tags
        ).distinct().order_by('-created_at')[:4]

        # Fetch quizzes related to the user's interests
        quizzes_by_interests = Quiz.objects.filter(
            tags__in=interest_tags
        ).distinct().order_by('-created_at')[:4]

        # Fetch semantically related tags for forum questions
        related_tags_for_forum_questions = (
            Tag.objects.filter(
                forumquestion__in=ForumQuestion.objects.filter(tags__in=interest_tags)
            )
            .distinct()
            .order_by('-forumquestion__created_at')[:5]
        )

        # Fetch semantically related tags for quizzes
        related_tags_for_quizzes = (
            Tag.objects.filter(
                quiz__in=Quiz.objects.filter(tags__in=interest_tags)
            )
            .distinct()
            .order_by('-quiz__created_at')[:5]
        )

        # Serialize the data
        forum_questions_serialized = ForumQuestionSerializer(
            forum_questions_by_followed_users, many=True, context={'request': request}
        ).data
        quizzes_serialized = QuizSerializer(
            quizzes_by_followed_users, many=True, context={'request': request}
        ).data
        forum_questions_by_interests_serialized = ForumQuestionSerializer(
            forum_questions_by_interests, many=True, context={'request': request}
        ).data
        quizzes_by_interests_serialized = QuizSerializer(
            quizzes_by_interests, many=True, context={'request': request}
        ).data
        related_tags_for_forum_questions_serialized = [
            {"name": tag.name, "description": tag.description, "linked_data_id": tag.linked_data_id}
            for tag in related_tags_for_forum_questions
        ]
        related_tags_for_quizzes_serialized = [
            {"name": tag.name, "description": tag.description, "linked_data_id": tag.linked_data_id}
            for tag in related_tags_for_quizzes
        ]

        # Combine and return the results
        feed_data = {
            "forum_questions_by_followed_users": forum_questions_serialized,
            "quizzes_by_followed_users": quizzes_serialized,
            "forum_questions_by_interests": forum_questions_by_interests_serialized,
            "quizzes_by_interests": quizzes_by_interests_serialized,
            "related_tags_for_forum_questions": related_tags_for_forum_questions_serialized,
            "related_tags_for_quizzes": related_tags_for_quizzes_serialized,
        }
        return Response(feed_data)
