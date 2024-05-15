from django.contrib.auth.models import User
from django.db import models


class Post(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    content = models.TextField()
    image_src = models.URLField(blank=True, null=True)
    qid = models.CharField(max_length=100, blank=True, null=True)
    qtitle = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def get_author_username(self):
        return self.author.username
    
    def __str__(self):
        return self.content[:20]


class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)


class Bookmark(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)


class Follow(models.Model):
    follower = models.ForeignKey(User, related_name='following', on_delete=models.CASCADE)
    following = models.ForeignKey(User, related_name='followers', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

class Profile(models.Model):
    profile_owner = models.ForeignKey(User, on_delete=models.CASCADE)
    profile_picture = models.URLField(blank=True, null=True)
    biography = models.TextField(blank=True)
    
    def get_profile_owner_username(self):
        return self.profile_owner.username
    
    def get_prof_owner_email(self):
        return self.profile_owner.email

    def __str__(self):
        return f'{self.profile_owner.username} Profile'