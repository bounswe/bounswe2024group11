from faker import Faker
from rest_framework import serializers
from ..views.difficulty_views import get_difficulty
from django.contrib.auth import get_user_model
from ..models import (CustomUser, ForumQuestion, Quiz, QuizQuestion, QuizQuestionChoice, RateQuiz,
                     Tag, ForumBookmark, ForumAnswer, ForumUpvote, ForumDownvote, TakeQuiz, ForumAnswerDownvote, ForumAnswerUpvote, QuizQuestionHint)
from .forum_vote_serializer import ForumUpvoteSerializer, ForumDownvoteSerializer
from .take_quiz_serializer import TakeQuizSerializer
from .serializers import QuizQuestionSerializer, QuizQuestionChoiceSerializer, UserInfoSerializer, TagSerializer, ForumAnswerSerializer
from core.utils import compress_image_tinify

User = get_user_model()
queryset = User.objects.all()


class ForumQuestionSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True, required=False)  # For nested representation of tags
    author = UserInfoSerializer(read_only=True)
    answers = ForumAnswerSerializer(many=True, read_only=True, required=False)
    answers_count = serializers.SerializerMethodField()
    is_bookmarked = serializers.SerializerMethodField()
    is_upvoted = serializers.SerializerMethodField()
    upvotes_count = serializers.SerializerMethodField()
    is_downvoted = serializers.SerializerMethodField()
    downvotes_count = serializers.SerializerMethodField()
    is_my_forum_question = serializers.SerializerMethodField()
    quiz_question_id = serializers.PrimaryKeyRelatedField(queryset=QuizQuestion.objects.all(), required=False, allow_null=True, write_only=True)
    quiz_question = QuizQuestionSerializer(read_only=True, required=False, source="quiz_question_id", allow_null=True)
    quiz_question_type = serializers.SerializerMethodField()
    image_file = serializers.ImageField(max_length=None, required=False, allow_null=True, write_only=True)
    image_url = serializers.CharField(max_length=None, required=False, allow_null=True, read_only=True)

    class Meta:
        model = ForumQuestion
        fields = (
            'id', 'title', 'question', 'tags', 'author', 'created_at', 
            'answers_count', 'is_bookmarked', 'is_upvoted', 
            'upvotes_count', 'is_downvoted', 'downvotes_count', 'answers',
            'is_my_forum_question', "quiz_question", "quiz_question_id", "quiz_question_type", "image_file", "image_url"
        )
        read_only_fields = (
            'author', 'created_at', 'answers_count', 'is_bookmarked', 
            'is_upvoted', 'upvotes_count', 'is_downvoted', 'downvotes_count', 'answers',
            'is_my_forum_question', "quiz_question", "image_url"
        )

    def set_image_url(self, forum_question, image_file):
        if image_file:
            compressed_image = compress_image_tinify(image_file)
            if compressed_image:
                forum_question.image_url = compressed_image
                forum_question.save()
            else:
                raise serializers.ValidationError("Error compressing image")
        else:
            raise serializers.ValidationError("Image file is required")

    def get_quiz_question_type(self, obj):
        # Find the relevant quiz, containing the quiz question and then return the type
        if not obj.quiz_question_id: 
            return None
        quiz = Quiz.objects.get(id=obj.quiz_question_id.quiz_id)
        return quiz.type

    def get_answers_count(self, obj):
        return obj.answers.count()

    def get_is_bookmarked(self, obj):
        user = self.context['request'].user
        if not user.is_authenticated:
            return None
        bookmark = ForumBookmark.objects.filter(user=user, forum_question=obj).first()
        return bookmark.id if bookmark else None

    def get_is_upvoted(self, obj):
        user = self.context['request'].user
        if not user.is_authenticated:
            return None
        upvote = ForumUpvote.objects.filter(user=user, forum_question=obj).first()
        return upvote.id if upvote else None

    def get_upvotes_count(self, obj):
        return obj.upvotes.count()

    def get_is_downvoted(self, obj):
        user = self.context['request'].user
        if not user.is_authenticated:
            return None
        downvote = ForumDownvote.objects.filter(user=user, forum_question=obj).first()
        return downvote.id if downvote else None

    def get_downvotes_count(self, obj):
        return obj.downvotes.count()

    def get_is_my_forum_question(self, obj):
        user = self.context['request'].user
        if not user.is_authenticated:
            return False
        return obj.author == user

    def create(self, validated_data):
        # Extract tags from validated_data
        print(validated_data)
        tags_data = validated_data.pop('tags', None)
        image_file = validated_data.pop('image_file', None)
        forum_question = ForumQuestion.objects.create(**validated_data)
        # Add tags to the ForumQuestion instance
        if tags_data:
            for tag_data in tags_data:
                tag, created = Tag.objects.get_or_create(**tag_data)
                forum_question.tags.add(tag)

        # Set the image URL
        print(image_file)
        if image_file:
            self.set_image_url(forum_question, image_file)

        return forum_question
    
    def update(self, instance, validated_data):
        tags_data = validated_data.pop('tags', None)
        image_file = validated_data.get('image_file', None)

        instance.title = validated_data.get('title', instance.title)
        instance.question = validated_data.get('question', instance.question)
        instance.save()

        if image_file:
            self.set_image_url(instance, image_file)

        # Update tags
        if tags_data:
            instance.tags.clear()
            for tag_data in tags_data:
                tag, created = Tag.objects.get_or_create(**tag_data)
                instance.tags.add(tag)

        return instance
