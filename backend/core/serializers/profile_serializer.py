from django.contrib.auth import get_user_model
from rest_framework import serializers
from .serializers import ForumBookmarkSerializer, TagSerializer
from .take_quiz_serializer import TakeQuizSerializer
from ..models import ForumBookmark, TakeQuiz, UserAchievement, Achievement
from core import models
from django.db.models import Sum



class AchievementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Achievement
        fields = ('id', 'slug', 'title', 'description', 'created_at')
        read_only_fields = ('id', 'created_at')
        ordering = ['-created_at']
        
class UserAchievementSerializer(serializers.ModelSerializer):
    achievement = AchievementSerializer(read_only=True)
    
    class Meta:
        model = UserAchievement
        fields = ('achievement', 'earned_at')
        read_only_fields = ('earned_at',)

User = get_user_model()

class ProfileSerializer(serializers.ModelSerializer):
    bookmarked_forums = serializers.SerializerMethodField()
    quizzes_taken = serializers.SerializerMethodField()
    score = serializers.SerializerMethodField()
    achievements = UserAchievementSerializer(many=True, source='userachievement_set') 
    interests = TagSerializer(many=True)


    class Meta:
        model = User
        fields = [
            'id', 
            'email', 
            'full_name', 
            'avatar', 
            'quizzes_taken', 
            'bookmarked_forums', 
            'score',
            'achievements',
            'interests'
        ]
        read_only_fields = ['id']
        
    def update(self, instance, validated_data):
        achievements_data = validated_data.pop('userachievement_set', None)
        if achievements_data is not None:
            if not achievements_data:
                instance.achievements.clear()
            else:
                current_achievements = set()
                for achievement_data in achievements_data:
                    achievement = achievement_data['achievement']
                    user_achievement, created = UserAchievement.objects.get_or_create(
                        user=instance,
                        achievement=achievement
                    )
                    current_achievements.add(user_achievement.achievement.id)
                
                instance.userachievement_set.exclude(
                    achievement__id__in=current_achievements
                ).delete()

        interests_data = validated_data.pop('interests', None)
        print(interests_data)
        # find the unique entry in tags using linked_data_id as the unique identifier from tags model
        tag_ids = [tag['linked_data_id'] for tag in interests_data]
        tags = models.Tag.objects.filter(linked_data_id__in=tag_ids)
        print(tags)
        if interests_data is not None:
            instance.interests.set([1])
            instance.save()

        return super().update(instance, validated_data)
    
        
    def get_context_data(self):
        return {'request': self.context.get('request')}
    
    def get_bookmarked_forums(self, obj):
        bookmarks = ForumBookmark.objects.filter(user=obj)
        return ForumBookmarkSerializer(bookmarks, many=True).data
 
    def get_quizzes_taken(self, obj):
        quizzes = TakeQuiz.objects.filter(user=obj)
        return TakeQuizSerializer(quizzes, many=True).data
    

    def get_score(self, obj):
        # Change from Python sum to database aggregation
        return TakeQuiz.objects.filter(user=obj).aggregate(
            total_score=Sum('score')  # Use the correct Sum function
        )['total_score'] or 0

    
    def get_achievements(self, obj):
        from .serializers import UserAchievementSerializer
        user_achievements = UserAchievement.objects.filter(user=obj).order_by('-earned_at')
        return UserAchievementSerializer(user_achievements, many=True).data
    