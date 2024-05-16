from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Post, Like, Bookmark, Follow, Profile


class CreatePostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Post
        read_only_fields = ['author']
        fields = '__all__'


class SearchPostSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="get_author_username", read_only=True)
    user_id = serializers.CharField(source="get_author_id", read_only=True)
    like_count = serializers.SerializerMethodField()
    bookmark_count = serializers.SerializerMethodField()
    liked_by = serializers.SerializerMethodField()
    is_liked = serializers.SerializerMethodField()
    is_bookmarked = serializers.SerializerMethodField()
    is_following = serializers.SerializerMethodField()


    def get_like_count(self, obj):
        return obj.like_set.count()

    def get_bookmark_count(self, obj):
        return obj.bookmark_set.count()
    
    def get_liked_by(self, obj):
        likes = obj.like_set.all()
        return [like.user.username for like in likes]
    
    def get_is_liked(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.like_set.filter(user=request.user).exists()
        return False

    def get_is_bookmarked(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.bookmark_set.filter(user=request.user).exists()
        return False
    
    def get_is_following(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.author.followers.filter(follower=request.user).exists()
        return False

    class Meta:
        model = Post
        exclude = ['author']
        read_only_fields = ["username", "title", "content", "image_src", "qid", "qtitle", "created_at", "updated_at", "like_count", "bookmark_count", "liked_by", "is_liked", "is_bookmarked", "user_id", "is_following"]


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
        read_only_fields = ['follower']


class UserSerializer(serializers.ModelSerializer):
    fullname = serializers.SerializerMethodField()

    def get_fullname(self, obj):
        return obj.first_name
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'fullname']


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    fullname = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', "fullname"]

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data['fullname'],
        )
        Profile.objects.create(owner=user)
        return user

class ProfileSerializer(serializers.ModelSerializer):
    is_following = serializers.SerializerMethodField()
    def get_is_following(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.owner.followers.filter(follower=request.user).exists()
        return False
    
    class Meta:
        model = Profile
        read_only_fields = ["owner"]
        fields = '__all__'