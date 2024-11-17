from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import ForumQuestion, Tag, ForumAnswer
from faker import Faker

User = get_user_model()
queryset = User.objects.all()

class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', "full_name", "avatar")  # Include relevant fields


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
        fields = ('id', 'name', 'linked_data_id', 'description')

class ForumAnswerSerializer(serializers.ModelSerializer):
    author = UserInfoSerializer(read_only=True)
    created_at = serializers.DateTimeField(source='date', read_only=True)

    class Meta:
        model = ForumAnswer
        fields = ('id', 'forum_question', 'answer', 'author', 'created_at')
        read_only_fields = ('author', 'created_at')

    def create(self, validated_data):
        return ForumAnswer.objects.create(**validated_data)

class ForumQuestionSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True)  # For nested representation of tags
    author = UserInfoSerializer(read_only=True)
    answers = ForumAnswerSerializer(many=True, read_only=True, required=False)
    created_at = serializers.DateTimeField(source='date', read_only=True)  # Map 'date' field to 'created_at'
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
            'upvotes_count', 'is_downvoted', 'downvotes_count', 'answers'
        )
        read_only_fields = (
            'author', 'created_at', 'answers_count', 'is_bookmarked', 
            'is_upvoted', 'upvotes_count', 'is_downvoted', 'downvotes_count', 'answers'
        )

    def get_answers_count(self, obj):
        return obj.answers.count()

    def get_is_bookmarked(self, obj):
        return Faker().boolean()

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
