from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Post, Like, Bookmark, Follow


class CreatePostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Post
        read_only_fields = ['author']
        fields = '__all__'

class SearchPostSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="get_author_username", read_only=True)
    like_count = serializers.SerializerMethodField()
    bookmark_count = serializers.SerializerMethodField()
    liked_by = serializers.SerializerMethodField()


    def get_like_count(self, obj):
        return obj.like_set.count()

    def get_bookmark_count(self, obj):
        return obj.bookmark_set.count()
    
    def get_liked_by(self, obj):
        likes = obj.like_set.all()
        return [like.user.username for like in likes]

    class Meta:
        model = Post
        exclude = ['author']
        read_only_fields = ["username", "title", "content", "image_src", "qid", "qtitle", "created_at", "updated_at", "like_count", "bookmark_count", "liked_by"]

class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        read_only_fields = ['user']
        fields = '__all__'


class BookmarkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bookmark
        read_only_fields = ['user']
        fields = '__all__'


class FollowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Follow
        read_only_fields = ['follower']
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user
