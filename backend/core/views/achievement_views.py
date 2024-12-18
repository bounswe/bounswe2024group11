from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from ..permissions import IsAuthorOrReadOnly
from ..models import Achievement, UserAchievement
from ..serializers.profile_serializer import AchievementSerializer

class AchievementListView(APIView):
    """
    API endpoint to fetch all achievements with user-specific acquisition status and earned time.
    """
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]

    @swagger_auto_schema(
        operation_summary="Get all achievements with acquisition status and earned time",
        responses={
            200: openapi.Response(
                description="List of achievements",
                examples={
                    "application/json": [
                        {
                            "achievement_details": {
                                "id": 1,
                                "slug": "first-quiz-created",
                                "title": "First Quiz Created",
                                "description": "Awarded for creating your first quiz.",
                                "category": "Quiz",
                                "created_at": "2024-12-01T12:00:00Z"
                            },
                            "earned_at": "2024-12-15T10:30:00Z"
                        }
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
        # Fetch all achievements
        achievements = Achievement.objects.all()
        
        # Initialize user_achievement_map
        user_achievement_map = {}
        
        # Only fetch user achievements if user is authenticated
        if request.user.is_authenticated:
            user_achievements = UserAchievement.objects.filter(user=request.user)
            user_achievement_map = {
                ua.achievement_id: ua.earned_at for ua in user_achievements
            }

        # Serialize achievements and nest fields under `achievement_details`
        data = []
        for achievement in achievements:
            serialized_achievement = AchievementSerializer(achievement).data
            achievement_id = achievement.id
            data.append({
                "achievement": serialized_achievement,
                "earned_at": user_achievement_map.get(achievement_id)  # None if not acquired
            })

        return Response(data, status=status.HTTP_200_OK)