from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from ..models import CustomUser
from ..serializers.serializers import UserInfoSerializer
from ..serializers.leaderboard_serializer import LeaderboardSerializer


class LeaderboardView(APIView):
    @swagger_auto_schema(
        responses={200: LeaderboardSerializer(many=True)},
        operation_description="Get leaderboard of users sorted by score in descending order."
    )
    def get(self, request):
        try:
            # Step 1: Fetch all users sorted by score
            users = CustomUser.objects.all().order_by('-score')

            # Step 2: Create leaderboard data
            leaderboard_data = []
            for user in users:
                # Serialize each user's information
                user_info_serializer = UserInfoSerializer(user, context={'request': request})
                leaderboard_data.append({
                    'score': user.score,
                    'user_info': user_info_serializer.data,
                })
                
            # Step 3: Serialize the final leaderboard data
            serializer = LeaderboardSerializer(leaderboard_data, many=True,context={'request': request})
            return Response(data=serializer.data, status=status.HTTP_200_OK)

        except Exception as e:
            # Handle errors gracefully
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
