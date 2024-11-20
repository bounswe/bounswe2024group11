from django.contrib.auth import get_user_model
from faker import Faker
from rest_framework import serializers

from ..models import (ForumUpvote, ForumDownvote)

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
    

class ForumDownvoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = ForumDownvote
        fields = ("id", "user", "forum_question", "created_at")
        read_only_fields = ("id", "user", "created_at")

    def validate(self, attrs):
        user = self.context["request"].user
        forum_question = attrs["forum_question"]

        if ForumDownvote.objects.filter(user=user, forum_question=forum_question).exists():
            raise serializers.ValidationError("You have already downvoted this forum question.")

        return attrs
