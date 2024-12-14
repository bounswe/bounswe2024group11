# serializers.py
from rest_framework import serializers
from ..models import Achievement, UserAchievement

class AchievementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Achievement
        fields = '__all__'

class UserAchievementSerializer(serializers.ModelSerializer):
    achievement = AchievementSerializer()

    class Meta:
        model = UserAchievement
        fields = '__all__'