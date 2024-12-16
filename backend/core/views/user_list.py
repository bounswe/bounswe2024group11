from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Count, F, Q
from ..models import CustomUser, Block, Follow, ForumQuestion, ForumAnswer, Quiz
from ..serializers.serializers import UserInfoSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly

class UserListView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request):
        user = request.user
        print(user)
        if user.is_authenticated:
            # Get the users that the current user follows
            following = Follow.objects.filter(follower=user).values_list('following', flat=True)
            # Get the users that those users follow
            followed_by_following = Follow.objects.filter(follower__in=following).values_list('following', flat=True)
            # Exclude the current user, blocked users, and users the current user already follows
            blocked_users = Block.objects.filter(blocker=user).values_list('blocking', flat=True)
            users = CustomUser.objects.filter(id__in=followed_by_following).exclude(id__in=blocked_users).exclude(id__in=following).exclude(id=user.id)
        else:
            users = CustomUser.objects.all()

        users = users.annotate(
            forum_question_count=Count('forumquestion'),
            forum_answer_count=Count('forumanswer'),
            quiz_count=Count('quiz'),
            total_count=Count('forumquestion') + Count('forumanswer') + Count('quiz')
        ).order_by('-total_count')[:5]

        serializer = UserInfoSerializer(users, many=True, context={'request': request})
        return Response(serializer.data)