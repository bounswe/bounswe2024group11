from django.contrib.auth import get_user_model
from rest_framework import serializers
from .serializers import ForumBookmarkSerializer
from .take_quiz_serializer import TakeQuizSerializer
from ..models import ForumBookmark, TakeQuiz, UserAchievement



class AchievementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Achievement
        fields = ('id', 'slug', 'title', 'description', 'created_at')
        read_only_fields = ('id', 'created_at')
        
class UserAchievementSerializer(serializers.ModelSerializer):
    achievement = AchievementSerializer(read_only=True)
    
    class Meta:
        model = UserAchievement
        fields = ('achievement', 'earned_at')
        read_only_fields = ('earned_at',)

User = get_user_model()

class ProfileSerializer(serializers.ModelSerializer):
    bookmarked_forums = serializers.SerializerMethodField()
    taken_quizzes = serializers.SerializerMethodField()
    score = serializers.SerializerMethodField()
    achievements = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            'id', 
            'email', 
            'full_name', 
            'avatar', 
            'taken_quizzes', 
            'bookmarked_forums', 
            'score',
            'achievements'
        ]
        read_only_fields = ['id']
    
    def get_bookmarked_forums(self, obj):
        bookmarks = ForumBookmark.objects.filter(user=obj)
        return ForumBookmarkSerializer(bookmarks, many=True).data
 
    def get_taken_quizzes(self, obj):
        quizzes = TakeQuiz.objects.filter(user=obj)
        return TakeQuizSerializer(quizzes, many=True).data
    
    def get_score(self, obj):
        quizzes = TakeQuiz.objects.filter(user=obj)
        return sum([quiz.score for quiz in quizzes])
    
    def get_achievements(self, obj):
        from .serializers import UserAchievementSerializer
        user_achievements = UserAchievement.objects.filter(user=obj).order_by('-earned_at')
        return UserAchievementSerializer(user_achievements, many=True).data