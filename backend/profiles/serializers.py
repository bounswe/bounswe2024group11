from rest_framework import serializers
from .models import Profile
# from user.models import User

class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source = 'get_username')
    # followers_count = serializers.IntegerField(source = 'get_followers_count')
    # following_count = serializers.IntegerField(source = 'get_following_count')
    profile_belongs_to_authenticated_user = serializers.BooleanField(source = 'get_profile_belongs_to_authenticated_user')
    # follow_status = serializers.CharField(source = 'get_follow_status')    
    
    class Meta:
        model = Profile
        fields = ('username', 'followers_count', 'following_count', 'profile_belongs_to_authenticated_user', 'follow_status', 'fullname', 'bio', 'profile_picture')
        read_only_fields = ('username', 'followers_count', 'following_count', 'profile_belongs_to_authenticated_user', 'follow_status')