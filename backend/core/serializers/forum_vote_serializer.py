from django.contrib.auth import get_user_model
from faker import Faker
from rest_framework import serializers

from ..models import (CustomUser, ForumQuestion, Quiz, QuizQuestion, QuizQuestionChoice, RateQuiz,
                     Tag, ForumBookmark, ForumUpvote)

User = get_user_model()
queryset = User.objects.all()


class ForumUpvoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = ForumUpvote
        fields = ("id", "user", "forum_question", "created_at")
        read_only_fields = ("id", "user", "created_at")

    def validate(self, attrs):
        user = self.context["request"].user
        forum_question = attrs["forum_question"]

        if ForumUpvote.objects.filter(user=user, forum_question=forum_question).exists():
            raise serializers.ValidationError("You have already upvoted this forum question.")

        return attrs