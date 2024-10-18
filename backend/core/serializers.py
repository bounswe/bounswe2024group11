from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import ForumQuestion, Tag

User = get_user_model()
queryset = User.objects.all()


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ('username', 'password', 'email', 'full_name')

    def create(self, validated_data):
        # Use Django's User model manager to create a new user
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data['email'],
            full_name=validated_data['full_name'],
        )
        return user


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('id', 'name', 'linked_data_id', 'description')


class ForumQuestionSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True)  # For nested representation of tags

    class Meta:
        model = ForumQuestion
        fields = ('id', 'title', 'question', 'tags', 'author', 'date')
        read_only_fields = ('author',)

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
