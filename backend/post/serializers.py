from rest_framework import serializers
from .models import Post, Like, Bookmark

class PostSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')
    class Meta:
        model = Post
        fields = '__all__'

class LikeSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='user.username')
    post = serializers.ReadOnlyField(source='post.title')
    class Meta:
        model = Like
        fields = '__all__'

class BookmarkSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='user.username')
    post = serializers.ReadOnlyField(source='post.title')
    class Meta:
        model = Bookmark
        fields = '__all__'
