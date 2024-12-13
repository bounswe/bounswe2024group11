from faker import Faker
from rest_framework import serializers
from ..views.difficulty_views import get_difficulty
from django.contrib.auth import get_user_model
from ..models import (CustomUser, ForumQuestion, Quiz, QuizQuestion, QuizQuestionChoice, RateQuiz,
                     Tag, ForumBookmark, ForumAnswer, ForumUpvote, ForumDownvote, TakeQuiz, ForumAnswerDownvote, ForumAnswerUpvote, QuizQuestionHint)
from .forum_vote_serializer import ForumUpvoteSerializer, ForumDownvoteSerializer
from .take_quiz_serializer import TakeQuizSerializer
from core.utils import compress_image_tinify

User = get_user_model()
queryset = User.objects.all()

class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', "full_name", "avatar")  # Include relevant fields
        read_only_fields = ('id', 'username', 'email', "full_name", "avatar")  # Make these fields read-only


class RegisterSerializer(serializers.ModelSerializer):
    avatar = serializers.CharField(required=False, allow_null=True)  # Add these parameters
    avatar_file = serializers.ImageField(write_only=True, required=False)
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ('username', 'password', 'email', 'full_name', 'avatar', 'avatar_file')

    def set_avatar(self, user, validated_data):
        if validated_data.get('avatar_file', None):
            compressed_url = compress_image_tinify(validated_data['avatar_file'])
            if compressed_url:
                user.avatar = compressed_url
                user.save()
                return
                
        # If no avatar_file or compression fails, use default avatar
        unique_seed = Faker().name()
        avatar_url = f"https://api.dicebear.com/9.x/avataaars/webp?accessories=eyepatch,kurt,prescription01&seed={unique_seed}"
        user.avatar = avatar_url
        user.save()

    def create(self, validated_data):
        # Remove avatar_file from validated_data before creating user
        avatar_file = validated_data.pop('avatar_file', None)
        validated_data.pop('avatar', None)  # Remove avatar field if present
        
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data['email'],
            full_name=validated_data['full_name'],
        )
        
        # Handle avatar separately
        self.set_avatar(user, {'avatar_file': avatar_file} if avatar_file else {})

        return user

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('id', 'name', 'linked_data_id', 'description')
        read_only_fields = ('id',)
    def create(self, validated_data):
        tag, created = Tag.objects.get_or_create(
            linked_data_id=validated_data['linked_data_id'],
            defaults={
                'name': validated_data['name'],
                'description': validated_data.get('description', '')
            }
        )
        return tag

    def to_internal_value(self, data):
        if not isinstance(data, dict):
            self.fail('invalid')

        linked_data_id = data.get('linked_data_id')
        if not linked_data_id:
            self.fail('required', field_name='linked_data_id')

        try:
            # Fetch the existing tag and return it as a dictionary
            tag = Tag.objects.get(linked_data_id=linked_data_id)
            return {
                'id': tag.id,
                'name': tag.name,
                'linked_data_id': tag.linked_data_id,
                'description': tag.description,
            }
        except Tag.DoesNotExist:
            # If the tag does not exist, validate it as a new tag
            return super().to_internal_value(data)


class ForumAnswerSerializer(serializers.ModelSerializer):
    author = UserInfoSerializer(read_only=True)
    upvotes_count = serializers.SerializerMethodField()
    downvotes_count = serializers.SerializerMethodField()
    is_my_answer = serializers.SerializerMethodField()
    is_upvoted = serializers.SerializerMethodField()
    is_downvoted = serializers.SerializerMethodField()
    class Meta:
        model = ForumAnswer
        fields = ('id', 'answer', 'author', 'created_at', 'is_my_answer', 'is_upvoted', 'is_downvoted', 'upvotes_count', 'downvotes_count', 'forum_question')
        read_only_fields = ('author', 'created_at', 'upvotes_count', 'downvotes_count', 'is_my_answer', 'is_upvoted', 'is_downvoted', 'forum_question')

    def get_is_my_answer(self, obj):
        user = self.context['request'].user
        if not user.is_authenticated:
            return None
        return obj.id if obj.author == user else None

    def get_is_upvoted(self, obj):
        user = self.context['request'].user
        if not user.is_authenticated:
            return None
        upvote = ForumAnswerUpvote.objects.filter(user=user, forum_answer=obj).first()
        return upvote.id if upvote else None

    def get_is_downvoted(self, obj):
        user = self.context['request'].user
        if not user.is_authenticated:
            return None
        downvote = ForumAnswerDownvote.objects.filter(user=user, forum_answer=obj).first()
        return downvote.id if downvote else None
    
    def get_upvotes_count(self, obj):
        return obj.upvotes.count()
    
    def get_downvotes_count(self, obj):
        return obj.downvotes.count()

    def create(self, validated_data):
        return ForumAnswer.objects.create(**validated_data)


class QuizQuestionChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizQuestionChoice
        fields = ('id', 'choice_text', 'is_correct')
        # No need for 'question' field here, as it will be assigned in the QuizQuestion serializer

class QuizQuestionHintSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizQuestionHint
        fields = ('id', 'type', 'text')


class QuizQuestionSerializer(serializers.ModelSerializer):
    choices = QuizQuestionChoiceSerializer(many=True)  # Allow nested choices creation
    hints = QuizQuestionHintSerializer(required=False, many=True)
    class Meta:
        model = QuizQuestion
        fields = ('id', 'question_text', 'question_point', 'choices', "hints")
        # No need for 'quiz' field here, as it will be assigned in the Quiz serializer

    def create(self, validated_data):
        # Extract nested choices from validated_data
        choices_data = validated_data.pop('choices', [])
        hint_data = validated_data.pop('hints', [])
        question = QuizQuestion.objects.create(**validated_data)

        # Create and associate each QuizQuestionChoice with the QuizQuestion
        for choice_data in choices_data:
            QuizQuestionChoice.objects.create(question=question, **choice_data)
        
        for hint_data in hint_data:
            QuizQuestionHint.objects.create(question=question, **hint_data)

        return question

    def update(self, instance, validated_data):
        # Handle updating nested choices
        choices_data = validated_data.pop('choices', [])
        hint_data = validated_data.pop('hints', [])
        # Update question fields
        instance.question_text = validated_data.get('question_text', instance.question_text)

        instance.hints.all().delete()
        for hint_data in hint_data:
            QuizQuestionHint.objects.create(question=instance, **hint_data)

        instance.save()

        # Update or create associated choices
        instance.choices.all().delete()
        for choice_data in choices_data:
            QuizQuestionChoice.objects.create(question=instance, **choice_data)
        
        return instance


class QuizSerializer(serializers.ModelSerializer):
    questions = QuizQuestionSerializer(many=True)  # Allow nested questions creation
    author = UserInfoSerializer(read_only=True)  # Assuming UserInfoSerializer is defined
    tags = TagSerializer(many=True)  # Assuming TagSerializer is defined
    rating = serializers.SerializerMethodField()
    is_taken = serializers.SerializerMethodField()
    num_taken = serializers.SerializerMethodField()
    is_my_quiz = serializers.SerializerMethodField()
    

    class Meta:
        model = Quiz
        fields = (
            'id', 'title', 'description', 'difficulty', "author", 
            'tags', 'type', 'created_at', 'questions', 'num_taken', "is_taken", "rating",
            'is_my_quiz', 'quiz_point'
        )
        read_only_fields = ("difficulty", 'created_at', 'num_taken', 'is_taken', 'rating', "author",
                           'is_my_quiz', 'quiz_point')

    def get_is_taken(self, obj):
        user = self.context['request'].user
        if not user.is_authenticated:
            return False
        return TakeQuiz.objects.filter(quiz=obj, user=user).exists()

    def get_num_taken(self, obj):
        return obj.takes.count()

    def get_rating(self, obj):
        from django.db.models import Avg, Count

        # Use aggregate to calculate average score and count in a single query
        result = RateQuiz.objects.filter(quiz=obj).aggregate(
            avg_score=Avg('rating'),
            count=Count('id')
        )

        if result['count'] == 0:  # Check if no ratings exist
            return {"score": None, "count": 0}

        # Round the average score to 1 decimal place
        return {"score": round(result['avg_score'], 1), "count": result['count']}

    # TODO: Check whether this works on the client side.
    def get_is_my_quiz(self, obj):
        user = self.context['request'].user
        if not user.is_authenticated:
            return False
        return obj.author == user
    
    def create(self, validated_data):
        # Extract nested questions and tags from validated_data
        questions_data = validated_data.pop('questions', [])
        tags_data = validated_data.pop('tags', [])
        quiz_type = validated_data.get('type')
         
        # Create the Quiz instance
        quiz = Quiz.objects.create(**validated_data)

        # Add tags to the Quiz instance
        for tag_data in tags_data:
            tag, created = Tag.objects.get_or_create(**tag_data)
            quiz.tags.add(tag)

        # Create and associate each QuizQuestion with the Quiz
        for question_data in questions_data:
            choices_data = question_data.pop('choices', [])
            hints_data = question_data.pop('hints', [])
            question = QuizQuestion.objects.create(quiz=quiz, **question_data)
            for hint_data in hints_data:
                QuizQuestionHint.objects.create(question=question, **hint_data)

            for choice_data in choices_data:
                QuizQuestionChoice.objects.create(question=question, **choice_data)
        # Calculate the total point of the quiz        
        quiz.quiz_point = sum([question.question_point for question in quiz.questions.all()])
        # Calculate the difficulty level of the quiz
        effective_question_point = quiz.quiz_point / len(quiz.questions.all())
        if (effective_question_point <= 16.66):
            quiz.difficulty = 1
        elif(effective_question_point > 23.33):
            quiz.difficulty = 3
        else:
            quiz.difficulty = 2
        quiz.save()
        return quiz

    def update(self, instance, validated_data):
        # Handle updating nested tags and questions
        tags_data = validated_data.pop('tags', [])
        questions_data = validated_data.pop('questions', [])
        
        # Update quiz fields
        instance.title = validated_data.get('title', instance.title)
        instance.description = validated_data.get('description', instance.description)
        instance.save()

        # Update tags
        instance.tags.clear()
        for tag_data in tags_data:
            tag, created = Tag.objects.get_or_create(**tag_data)
            instance.tags.add(tag)

        # Update or create associated questions
        instance.questions.all().delete()  # Optionally clear existing questions if not updating
        for question_data in questions_data:
            choices_data = question_data.pop('choices', [])
            question = QuizQuestion.objects.create(quiz=instance, **question_data)
            for choice_data in choices_data:
                QuizQuestionChoice.objects.create(question=question, **choice_data)
        
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