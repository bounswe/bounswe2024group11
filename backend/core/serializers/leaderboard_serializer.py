from rest_framework import serializers
from .serializers import UserInfoSerializer

class LeaderboardSerializer(serializers.Serializer):
    score = serializers.IntegerField(help_text="Score of the user")
    user_info = UserInfoSerializer(help_text="User information")
