from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from ..models import Block, TakeQuiz, ForumQuestion, Quiz, Follow, Tag, Follow, Block, CustomUser
from ..serializers.forum_question_serializer import ForumQuestionSerializer
from ..serializers.serializers import QuizSerializer, UserInfoSerializer
from ..utils import get_ids
from django.db.models import Count



def get_users_to_follow(request):
    user = request.user
    if user.is_authenticated:
        # Get the users that the current user follows
        following = Follow.objects.filter(follower=user).values_list('following', flat=True)
        # Get the users that those users follow
        followed_by_following = Follow.objects.filter(follower__in=following).values_list('following', flat=True)
        # Exclude the current user, blocked users, and users the current user already follows
        blocked_users = Block.objects.filter(blocker=user).values_list('blocking', flat=True)
        users = CustomUser.objects.filter(id__in=followed_by_following).exclude(id__in=blocked_users).exclude(id__in=following).exclude(username=user.username)
        if len(users) == 0:
            users = CustomUser.objects.exclude(id__in=blocked_users).exclude(username=user.username)
    else:
        users = CustomUser.objects.all()

    users = users.annotate(
        forum_question_count=Count('forumquestion'),
        forum_answer_count=Count('forumanswer'),
        quiz_count=Count('quiz'),
        total_count=Count('forumquestion') + Count('forumanswer') + Count('quiz')
    ).order_by('-total_count')[:6]

    serializer = UserInfoSerializer(users, many=True, context={'request': request})
    return Response(serializer.data)

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

        blocked_users = Block.objects.filter(blocker=user).values_list('blocking__id', flat=True)  # !!!!!! Changed blocked users

        followed_users = Follow.objects.filter(follower=user).values_list('following', flat=True)

        forum_questions_by_followed_users = ForumQuestion.objects.filter(       # Forum questions by followed users
            author__id__in=followed_users 
        ).exclude(author__id__in=blocked_users).order_by('-created_at')[:4] # !!!!!! Changed filtering for forum questions

        taken_quizzes = TakeQuiz.objects.filter(user=user).values_list('quiz_id', flat=True)

        quizzes_by_followed_users = Quiz.objects.filter(                        # Quizzes by followed users
            author__id__in=followed_users
        ).exclude(author__id__in=blocked_users).exclude(id__in=taken_quizzes).order_by('-created_at').filter(difficulty=user.proficiency)[:4] # !!!!!! Changed filtering for quizzes
        
        interest_tags = user.interests.all()

        forum_questions_by_interests = ForumQuestion.objects.filter(        # Forum questions related to user's interests
            tags__in=interest_tags
        ).exclude(author__id__in=blocked_users).distinct().order_by('-created_at')[:4] # !!!!!! Added .exclude(author__id__in=blocked_users)

        quizzes_by_interests = Quiz.objects.filter(                         # Quizzes related to user's interests
            tags__in=interest_tags
        ).exclude(author__id__in=blocked_users).exclude(id__in=taken_quizzes).distinct().order_by('-created_at').filter(difficulty=user.proficiency)[:4]  # !!!!!! Added .exclude(author__id__in=blocked_users)

        interest_tag_ids = [tag.linked_data_id for tag in interest_tags]
        all_related_ids = set()
        for tag_id in interest_tag_ids:
            try:
                related_ids = get_ids(tag_id)  # Use the provided get_ids method
                all_related_ids.update(related_ids)
            except Exception as e:
                print(f"Error fetching related IDs for {tag_id}: {e}")
        
        related_tags = Tag.objects.filter(linked_data_id__in=all_related_ids).exclude(id__in=interest_tags)

        related_tags_for_forum_questions = (                                # Semantically related tags for forum questions
            related_tags.filter(forumquestion__isnull=False)
            .distinct()
            .order_by("-forumquestion__created_at")[:5]
        )
        unique_tags_forum = []
        seen_linked_ids = set()
        for tag in related_tags_for_forum_questions:
            if tag.linked_data_id not in seen_linked_ids:
                unique_tags_forum.append(tag)
                seen_linked_ids.add(tag.linked_data_id)
                if len(unique_tags_forum) == 5:  # Stop when we reach 5 unique tags
                    break

        related_tags_for_quizzes = (                                        # Semantically related tags for quizzes
            related_tags.filter(quiz__isnull=False)
            .distinct()
            .order_by('-quiz__created_at')[:5]
        )
        unique_tags_quiz = []
        seen_linked_ids = set()
        for tag in related_tags_for_quizzes:
            if tag.linked_data_id not in seen_linked_ids:
                unique_tags_quiz.append(tag)
                seen_linked_ids.add(tag.linked_data_id)
                if len(unique_tags_quiz) == 5:  # Stop when we reach 5 unique tags
                    break

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
            for tag in unique_tags_forum
        ]
        related_tags_for_quizzes_serialized = [
            {"name": tag.name, "description": tag.description, "linked_data_id": tag.linked_data_id}
            for tag in unique_tags_quiz
        ]

        users_to_follow = get_users_to_follow(request)

        # Combine and return the results
        feed_data = {
            "forum_questions_by_followed_users": forum_questions_serialized,
            "quizzes_by_followed_users": quizzes_serialized,
            "forum_questions_by_interests": forum_questions_by_interests_serialized,
            "quizzes_by_interests": quizzes_by_interests_serialized,
            "related_tags_for_forum_questions": related_tags_for_forum_questions_serialized,
            "related_tags_for_quizzes": related_tags_for_quizzes_serialized,
            "users_to_follow": users_to_follow.data,
        }
        return Response(feed_data)
    

def helper(obj):
    max_number_of_related_questions = 4
    if obj.tags.count() == 0:
        return ForumQuestion.objects.none()
    
    all_ids = []
    for tag in obj.tags.all():
        all_ids = all_ids + get_ids(tag.linked_data_id)

    return ForumQuestion.objects.filter(tags__linked_data_id__in=all_ids)\
        .exclude(id=obj.id)\
        .distinct()\
        .order_by('-created_at')[:max_number_of_related_questions]
