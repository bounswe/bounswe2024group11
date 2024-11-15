from django.contrib.auth import get_user_model
from faker import Faker
from rest_framework import serializers

from .models import (CustomUser, ForumBookmark, ForumQuestion, Quiz, QuizQuestion, RateQuiz,
                     Tag)

User = get_user_model()
queryset = User.objects.all()

class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', "full_name", "avatar")  # Include relevant fields
        read_only_fields = ('id', 'username', 'email', "full_name", "avatar")  # Make these fields read-only


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ('username', 'password', 'email', 'full_name', "avatar")

    def set_avatar(self, user):
        unique_seed = Faker().name()  # Generate a unique seed for the avatar
        avatar_url = f"https://api.dicebear.com/9.x/avataaars/webp?accessories=eyepatch,kurt,prescription01&seed={unique_seed}"
        user.avatar = avatar_url
        user.save()

    def create(self, validated_data):
        # Use Django's User model manager to create a new user
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data['email'],
            full_name=validated_data['full_name'],
        )
        self.set_avatar(user)

        return user


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('name', 'linked_data_id', 'description')


class ForumQuestionSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True)  # For nested representation of tags
    author = UserInfoSerializer(read_only=True)

    answers_count = serializers.SerializerMethodField()
    is_bookmarked = serializers.SerializerMethodField()
    is_upvoted = serializers.SerializerMethodField()
    upvotes_count = serializers.SerializerMethodField()
    is_downvoted = serializers.SerializerMethodField()
    downvotes_count = serializers.SerializerMethodField()

    class Meta:
        model = ForumQuestion
        fields = (
            'id', 'title', 'question', 'tags', 'author', 'created_at', 
            'answers_count', 'is_bookmarked', 'is_upvoted', 
            'upvotes_count', 'is_downvoted', 'downvotes_count'
        )
        read_only_fields = (
            'author', 'created_at', 'answers_count', 'is_bookmarked', 
            'is_upvoted', 'upvotes_count', 'is_downvoted', 'downvotes_count'
        )

    def get_answers_count(self, obj):
        return Faker().random_int(min=0, max=100)

    def get_is_bookmarked(self, obj):
        user = self.context['request'].user
        if not user.is_authenticated:
            return False
        return ForumBookmark.objects.filter(user=user, forum_question=obj).exists()

    def get_is_upvoted(self, obj):
        return Faker().boolean()

    def get_upvotes_count(self, obj):
        return Faker().random_int(min=0, max=100)

    def get_is_downvoted(self, obj):
        return Faker().boolean()

    def get_downvotes_count(self, obj):
        return Faker().random_int(min=0, max=100)

    def create(self, validated_data):
        # Extract tags from validated_data
        tags_data = validated_data.pop('tags')
        forum_question = ForumQuestion.objects.create(**validated_data)

        # Add tags to the ForumQuestion instance
        for tag_data in tags_data:
            tag, created = Tag.objects.get_or_create(**tag_data)
            forum_question.tags.add(tag)

        return forum_question
    
    def update(self, instance, validated_data):
        tags_data = validated_data.pop('tags')
        instance.title = validated_data.get('title', instance.title)
        instance.question = validated_data.get('question', instance.question)
        instance.save()

        # Update tags
        instance.tags.clear()
        for tag_data in tags_data:
            tag, created = Tag.objects.get_or_create(**tag_data)
            instance.tags.add(tag)

        return instance



class QuizQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizQuestion
        fields = ('id', 'question_text', 'choices', 'answer')
        # No need for 'quiz' field here, as it will be assigned in the Quiz serializer

class RatingSerializer(serializers.Serializer):
    score = serializers.FloatField(default=0.2, read_only=True)
    count = serializers.IntegerField(default=3, read_only=True)


class QuizSerializer(serializers.ModelSerializer):
    questions = QuizQuestionSerializer(many=True)  # Allow nested questions creation
    author = UserInfoSerializer(read_only=True)  # Assuming UserInfoSerializer is defined
    tags = TagSerializer(many=True)  # Assuming TagSerializer is defined

    num_taken = serializers.IntegerField(default=0, read_only=True)
    is_taken = serializers.BooleanField(default=False, read_only=True)
    rating = RatingSerializer(read_only=True, default={"score": 0.2, "count": 3})
    

    class Meta:
        model = Quiz
        fields = (
            'id', 'title', 'description', 'difficulty', "author", 
            'tags', 'type', 'created_at', 'questions', 'num_taken', "is_taken", "rating"
        )
        read_only_fields = ("difficulty", 'created_at', 'num_taken', 'is_taken', 'rating', "author")

    def create(self, validated_data):
        # Extract nested questions and tags from validated_data
        questions_data = validated_data.pop('questions', [])
        tags_data = validated_data.pop('tags', [])

        # Create the Quiz instance
        quiz = Quiz.objects.create(**validated_data)

        # Create and associate each QuizQuestion with the Quiz
        for question_data in questions_data:
            QuizQuestion.objects.create(quiz=quiz, **question_data)

        # Add tags to the Quiz instance
        for tag_data in tags_data:
            tag, created = Tag.objects.get_or_create(**tag_data)
            quiz.tags.add(tag)

        return quiz

    def update(self, instance, validated_data):
        # Handle updating nested tags and questions
        tags_data = validated_data.pop('tags', [])
        questions_data = validated_data.pop('questions', [])

        # Update quiz fields
        instance.title = validated_data.get('title', instance.title)
        instance.description = validated_data.get('description', instance.description)
        instance.difficulty = validated_data.get('difficulty', instance.difficulty)
        instance.save()

        # Update tags
        instance.tags.clear()
        for tag_data in tags_data:
            tag, created = Tag.objects.get_or_create(**tag_data)
            instance.tags.add(tag)

        # Update or create associated questions
        instance.questions.all().delete()  # Optionally clear existing questions if not updating
        for question_data in questions_data:
            QuizQuestion.objects.create(quiz=instance, **question_data)

        return instance    

class RateQuizSerializer(serializers.ModelSerializer):
    # Define ID fields

    class Meta:
        model = RateQuiz
        fields = ('id', 'quiz', "rating", "user")
        read_only_fields = ('id', "user")

    def create(self, validated_data):
        # Example condition: Check if the user has already rated the quiz
        if RateQuiz.objects.filter(quiz=validated_data["quiz"], user=validated_data["user"]).exists():
            raise serializers.ValidationError({
                "quiz": "You have already rated this quiz."
            })
        # Assuming 'quiz' and 'user' are passed as IDs
        rate_quiz = RateQuiz.objects.create(**validated_data)

        return rate_quiz  # Return the created RateQuiz instance


    def update(self, instance, validated_data):
        instance.rating = validated_data.get('rating', instance.rating)
        instance.save()
        return instance
    
class ForumBookmarkSerializer(serializers.ModelSerializer):
    class Meta:
        model = ForumBookmark
        fields = ("id", "user", "forum_question", "created_at")
        read_only_fields = ("id", "user", "created_at")

    def validate(self, attrs):
        user = self.context["request"].user
        forum_question = attrs["forum_question"]

        if ForumBookmark.objects.filter(user=user, forum_question=forum_question).exists():
            raise serializers.ValidationError("You have already bookmarked this forum question.")

        return attrs
