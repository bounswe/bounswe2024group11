from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from ..models import Achievement, UserAchievement
from ..serializers.profile_serializer import AchievementSerializer

class AchievementListView(APIView):
    """
    API endpoint to fetch all achievements with user-specific acquisition status and earned time.
    """
    permission_classes = [permissions.IsAuthenticated]

    @swagger_auto_schema(
        operation_summary="Get all achievements with acquisition status and earned time",
        responses={
            200: openapi.Response(
                description="List of achievements",
                examples={
                    "application/json": [
                        {
                            "id": 1,
                            "slug": "first-quiz-created",
                            "title": "First Quiz Created",
                            "description": "Awarded for creating your first quiz.",
                            "category": "Quiz",
                            "created_at": "2024-12-01T12:00:00Z",
                            "is_acquired": True,
                            "earned_at": "2024-12-15T10:30:00Z"
                        },
                        {
                            "id": 2,
                            "slug": "first-forum-post",
                            "title": "First Forum Post Created",
                            "description": "Awarded for creating your first forum post.",
                            "category": "Forum",
                            "created_at": "2024-12-02T12:00:00Z",
                            "is_acquired": False,
                            "earned_at": None
                        },
                    ]
                },
            ),
            401: "Unauthorized",
        },
    )
    def get(self, request):
        """
        Return all achievements with acquisition status and earned time for the authenticated user.
        """
        user = request.user  # Get the authenticated user

        # Fetch all achievements
        achievements = Achievement.objects.all()

        # Fetch user achievements with earned_at
        user_achievements = UserAchievement.objects.filter(user=user)
        user_achievement_map = {
            ua.achievement_id: ua.earned_at for ua in user_achievements
        }

        # Serialize achievements and add `is_acquired` and `earned_at` fields
        data = []
        for achievement in achievements:
            serialized_achievement = AchievementSerializer(achievement).data
            achievement_id = achievement.id
            serialized_achievement['is_acquired'] = achievement_id in user_achievement_map
            serialized_achievement['earned_at'] = user_achievement_map.get(achievement_id)  # None if not acquired
            data.append(serialized_achievement)

        return Response(data, status=status.HTTP_200_OK)
