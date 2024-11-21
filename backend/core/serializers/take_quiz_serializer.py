from django.contrib.auth import get_user_model
from faker import Faker
from rest_framework import serializers

from ..models import (CustomUser, Quiz, QuizQuestion, QuizQuestionChoice, TakeQuiz, UserAnswer)

User = get_user_model()
queryset = User.objects.all()


class UserAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAnswer
        fields = ['id', 'take_quiz', 'question', 'answer', 'is_hint_used']
        read_only_fields = ['take_quiz']

class TakeQuizSerializer(serializers.ModelSerializer):
    # Define a nested serializer for UserAnswers (many=True)
    answers = UserAnswerSerializer(many=True)
    score = serializers.SerializerMethodField()
    correct_answer_count = serializers.SerializerMethodField()
    wrong_answer_count = serializers.SerializerMethodField()
    empty_answer_count = serializers.SerializerMethodField()

    class Meta:
        model = TakeQuiz
        fields = ['id', 'quiz', 'user', 'date', 'answers', 'score', 'correct_answer_count', 'wrong_answer_count', 'empty_answer_count']
        read_only_fields = ['user', 'date', 'score', 'correct_answer_count', 'wrong_answer_count', 'empty_answer_count']
    
    def get_score(self, obj):
        correct_answers = 0
        for answer in obj.answers.all():
            if answer.answer.is_correct:
                correct_answers += 1
        return correct_answers
    
    def get_correct_answer_count(self, obj):
        return obj.answers.filter(answer__is_correct=True).count()
    
    def get_wrong_answer_count(self, obj):
        return obj.answers.filter(answer__is_correct=False).count()
    
    def get_empty_answer_count(self, obj):
        return obj.answers.filter(answer=None).count()

    def create(self, validated_data):
        # Extract the answers from the validated data
        answers = validated_data.pop('answers')
        user = validated_data['user']
        quiz = validated_data['quiz']

        # Check if the user has already taken the quiz
        if TakeQuiz.objects.filter(quiz=quiz, user=user).exists():
            raise serializers.ValidationError("You have already taken this quiz.")

        # Create the TakeQuiz instance
        take_quiz = TakeQuiz.objects.create(**validated_data)

        # Create UserAnswer instances for each answer
        try:
            for answer_data in answers:
                UserAnswer.objects.create(take_quiz=take_quiz, **answer_data)
        except Exception as e:
            take_quiz.delete()
            # raise 400 with exception message
            raise serializers.ValidationError(e)

        return take_quiz

    def update(self, instance, validated_data):
        # Extract the answers from the validated data
        answers = validated_data.pop('answers')

        # Delete all previous answers for this quiz instance
        UserAnswer.objects.filter(take_quiz=instance).delete()

        # Create new answers for the updated TakeQuiz
        try: 
            for answer_data in answers:
                UserAnswer.objects.create(take_quiz=instance, **answer_data)
        except Exception as e:
            # raise 400 with exception message
            raise serializers.ValidationError(e)
            
        # Update the TakeQuiz instance itself
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        return instance
