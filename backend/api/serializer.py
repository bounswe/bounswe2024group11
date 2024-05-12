from rest_framework import serializers
from user.models import User
from profiles.models import Profile
class UserSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = User
        fields = '__all__'

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['id', 'user', 'bio', 'profile_picture','followers', 'followings']