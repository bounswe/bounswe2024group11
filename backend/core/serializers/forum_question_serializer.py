from faker import Faker
from rest_framework import serializers
from ..views.difficulty_views import get_difficulty
from django.contrib.auth import get_user_model
from ..models import (CustomUser, ForumQuestion, Quiz, QuizQuestion, QuizQuestionChoice, RateQuiz,
                     Tag, ForumBookmark, ForumAnswer, ForumUpvote, ForumDownvote, TakeQuiz, ForumAnswerDownvote, ForumAnswerUpvote, QuizQuestionHint)
from .forum_vote_serializer import ForumUpvoteSerializer, ForumDownvoteSerializer
from .take_quiz_serializer import TakeQuizSerializer
from .serializers import QuizQuestionSerializer, QuizQuestionChoiceSerializer, UserInfoSerializer, TagSerializer, ForumAnswerSerializer
from ..utils import get_ids

User = get_user_model()
queryset = User.objects.all()


class ForumQuestionSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True)  # For nested representation of tags
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
    related_forum_questions = serializers.SerializerMethodField()  

    class Meta:
        model = ForumQuestion
        fields = (
            'id', 'title', 'question', 'tags', 'author', 'created_at', 
            'answers_count', 'is_bookmarked', 'is_upvoted', 
            'upvotes_count', 'is_downvoted', 'downvotes_count', 'answers',
            'is_my_forum_question', "quiz_question", "quiz_question_id", 
            "quiz_question_type", "related_forum_questions"  
        )
        read_only_fields = (
            'author', 'created_at', 'answers_count', 'is_bookmarked', 
            'is_upvoted', 'upvotes_count', 'is_downvoted', 'downvotes_count', 'answers',
            'is_my_forum_question', "quiz_question"
        )

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

    def get_related_forum_questions(self, obj):
        if self.context.get('include_related_questions', False):
            related_questions = helper(obj)
            return ForumQuestionSerializer(
                related_questions, many=True, context={'request': self.context['request'], 'include_related_questions': False}
            ).data
        return None
    

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


def helper(obj):
    max_number_of_related_questions = 4
    if obj.tags.count() == 0:
        return ForumQuestion.objects.none()
    
    all_ids = []
    for tag in obj.tags.all():
        all_ids = all_ids + get_ids(tag.linked_data_id)

    return ForumQuestion.objects.filter(tags__linked_data_id__in=all_ids)\
        .exclude(id=obj.id)\
        .distinct()\
        .order_by('-created_at')[:max_number_of_related_questions]
