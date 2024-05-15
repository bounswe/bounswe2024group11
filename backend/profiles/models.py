from django.db import models
# models.py
from django.conf import settings
from user import models as user
from django_currentuser.middleware import get_current_authenticated_user

class Profile(models.Model):
    user = models.OneToOneField(user.User, on_delete=models.CASCADE)
    bio = models.TextField(blank=True)
    profile_picture = models.ImageField(upload_to='profile_pics/', blank=True)
    # # followers = models.ManyToManyField("self", settings.AUTH_USER_MODEL, related_name='followings', symmetrical=False, blank=True)
    # followings = models.ManyToManyField("self", settings.AUTH_USER_MODEL, related_name='followed_by', symmetrical=False, blank=True)
    # followers = models.ManyToManyField("self", related_name="followings", symmetrical=False, blank=True)
    followings = models.ManyToManyField("self", related_name="followers", symmetrical=False, blank=True)

    def __str__(self):
        return str(self.user)
    
    def get_bio(self):
        return self.bio
    
    def get_profile_picture(self):
        try:
            return self.profile_picture.url
        except:
            return None
        
    def get_profile_belongs_to_authenticated_user(self):
        return self.user == get_current_authenticated_user()
        
    def get_fullname(self):
        return self.user.fullname

