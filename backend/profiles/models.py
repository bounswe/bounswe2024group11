from django.db import models
# models.py
from django.conf import settings

class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    bio = models.TextField(blank=True)
    profile_picture = models.ImageField(upload_to='profile_pics/', blank=True)
    followers = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='following')
    followings = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='followers')

    def __str__(self):
        return self.user.username

