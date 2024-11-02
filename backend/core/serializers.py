from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import ForumQuestion, Tag, Vote

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
    author = UserInfoSerializer(read_only=True)

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
class VoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vote
        read_only_fields = ('user') # why forum question is not added? also why do we even have read only fields? we cannot change user anyway? how can it change? ??
        fields = '__all__'
    
    # def create(self, validated_data):
    #     # Extract the user from the request
    #     request = self.context.get('request') #??
    #     validated_data['user'] = request.user  #??
    #     # You can modify or process `validated_data` here before saving if necessary.
    #     # Manually create the Vote instance
    #     vote = Vote.objects.create(
    #         forum_question=validated_data['forum_question'],
    #         voted=validated_data['voted'],
    #         user=validated_data['user']  # Automatically set user
    #     )
        
    #     # Perform any post-save logic if necessary
        
        # return vote
