from django.contrib.auth import get_user_model
from rest_framework import serializers
from .serializers import TagSerializer, UserInfoSerializer, FollowSerializer, QuizSerializer, RateQuizSerializer
from .take_quiz_serializer import TakeQuizSerializer
from ..models import ForumQuestion, ForumBookmark, TakeQuiz, UserAchievement, Achievement, Tag, Follow, CustomUser, Block, Quiz, RateQuiz
from core import models
from django.db.models import Sum
from .forum_question_serializer import ForumQuestionSerializer

class AchievementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Achievement
        fields = ('id', 'slug', 'title', 'description', 'created_at', 'category')
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
    quizzes_taken = serializers.SerializerMethodField()
    score = serializers.SerializerMethodField()
    achievements = UserAchievementSerializer(many=True, source='userachievement_set', read_only=True)
    interests = TagSerializer(many=True)
    followings = serializers.SerializerMethodField()
    followers = serializers.SerializerMethodField()
    blockings = serializers.SerializerMethodField()
    bookmarked_forums = serializers.SerializerMethodField()
    is_following = serializers.SerializerMethodField()
    is_blocked = serializers.SerializerMethodField()
    proficiency = serializers.ChoiceField(
        choices=CustomUser.PROFICIENCY_LEVELS, 
        required=False  # Allow partial updates
    )
    my_quizzes = serializers.SerializerMethodField()
    my_forum_questions = serializers.SerializerMethodField()
    my_forum_answers = serializers.SerializerMethodField()


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
            'interests',
            'followings',
            'followers',
            'blockings',
            'is_following',
            'is_blocked',
            'proficiency',
            'my_quizzes',
            'my_forum_questions',
            'my_forum_answers',
        ]
        read_only_fields = [
            'id', 
            "score", 
            "quizzes_taken",
            "achievements", 
            "bookmarked_forums", 
            "is_following", 
            "is_blocked", 
            "my_quizzes", 
            "my_forum_questions", 
            "my_forum_answers", 
        ]

    def update(self, instance, validated_data):
        print(validated_data)
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
        if interests_data is not None:
            interest_instances = []
            for interest_data in interests_data:
                # Fetch or create the tag using the provided data
                tag, _ = Tag.objects.get_or_create(
                    linked_data_id=interest_data['linked_data_id'],
                    defaults={
                        'name': interest_data.get('name'),
                        'description': interest_data.get('description', ''),
                    }
                )
                interest_instances.append(tag)

            # Update the interests of the instance
            instance.interests.set(interest_instances)
        
        
        proficiency_data = validated_data.pop('proficiency', None)
        if proficiency_data is not None:
            if proficiency_data in dict(CustomUser.PROFICIENCY_LEVELS):  # Validate choice
                instance.proficiency = proficiency_data
                instance.save()
            else:
                raise serializers.ValidationError({"proficiency": "Invalid proficiency level."})
         
               
            


        return super().update(instance, validated_data)
    
    def partial_update(self, instance, validated_data):
        return self.update(instance, validated_data)


    def get_context_data(self):
        return {'request': self.context.get('request')}
    
    def get_my_quizzes(self, obj):
        my_quizzes = Quiz.objects.filter(author=obj)
        my_quizzes_serialized = []
        for quiz in my_quizzes:

            quiz_serialized = QuizSerializer(quiz, context=self.get_context_data()).data
            rate_quizzes = RateQuiz.objects.filter(quiz=quiz)
            quiz_serialized['rate_quizzes'] = []
            request = self.context.get('request')
            if request and request.user == obj:
                for rate_quiz in rate_quizzes:
                    rate_quiz_serialized = RateQuizSerializer(rate_quiz, context=self.get_context_data()).data
                    rate_quiz_author_serialized = UserInfoSerializer(rate_quiz.user, context=self.get_context_data()).data
                    rate_quiz_serialized['user'] = rate_quiz_author_serialized
                    quiz_serialized['rate_quizzes'].append(rate_quiz_serialized)
            my_quizzes_serialized.append(quiz_serialized)

        return my_quizzes_serialized
    
    def get_my_forum_questions(self, obj):
        my_forum_questions = ForumQuestion.objects.filter(author=obj)
        return ForumQuestionSerializer(my_forum_questions, many=True, context=self.context).data
    
    def get_my_forum_answers(self, obj):
        my_forum_answers = ForumQuestion.objects.filter(answers__author=obj)
        return ForumQuestionSerializer(my_forum_answers, many=True, context=self.context).data
    
    def get_is_following(self, obj):
        request = self.context.get('request')
        if request:
            user = request.user
            if user.is_authenticated:
                follow_instance = Follow.objects.filter(follower=user, following=obj).first()
                if follow_instance:
                    return follow_instance.id
                return None  # Or another default value if no follow exists
        return None
    
    def get_is_blocked(self, obj):
        request = self.context.get('request')
        if request:
            user = request.user
            if user.is_authenticated:
                block_instance = Block.objects.filter(blocker=user, blocking=obj).first()
                if block_instance:
                    return block_instance.id
                return None  # Or another default value if no block exists
        return None
    
    def get_bookmarked_forums(self, obj):
        if obj:
            try:
                user = CustomUser.objects.get(username=obj)
                forum_question_ids = ForumBookmark.objects.filter(user=user).values_list('forum_question_id', flat=True)
                forum_questions = ForumQuestion.objects.filter(id__in=forum_question_ids).order_by('-created_at')
                return ForumQuestionSerializer(forum_questions, many=True, context=self.context).data
            except CustomUser.DoesNotExist:
                return []
        return []


    def get_quizzes_taken(self, obj):
        take_quizzes = TakeQuiz.objects.filter(user=obj)
        quiz_ids = take_quizzes.values_list('quiz', flat=True) 
        quizzes = Quiz.objects.filter(id__in=quiz_ids)
        return QuizSerializer(quizzes, many=True, context=self.context).data 
        


    def get_score(self, obj):
        # Change from Python sum to database aggregation
        return CustomUser.objects.filter(id=obj.id).first().score or 0
        # return TakeQuiz.objects.filter(user=obj).aggregate(
        #     total_score=Sum('score')  # Use the correct Sum function
        # )['total_score'] or 0


    def get_achievements(self, obj):
        from .serializers import UserAchievementSerializer
        user_achievements = UserAchievement.objects.filter(user=obj).order_by('-earned_at')
        return UserAchievementSerializer(user_achievements, many=True).data

    def get_followers(self, obj):
        followers = User.objects.filter(following__following=obj)
        return UserInfoSerializer(followers, many=True, context=self.context).data

    def get_followings(self, obj):
        followings = User.objects.filter(followers__follower=obj)
        return UserInfoSerializer(followings, many=True, context=self.context).data
    
    def get_blockings(self, obj):
        blockings = User.objects.filter(blockers__blocker=obj)
        return UserInfoSerializer(blockings, many=True, context=self.context).data
    
    def get_proficiency(self, obj):
        return obj.get_proficiency_display()
    def to_representation(self, instance):
        """Customize the representation of proficiency to show the display value."""
        representation = super().to_representation(instance)
        representation['proficiency'] = instance.get_proficiency_display()  # Return display name
        return representation

    
    
