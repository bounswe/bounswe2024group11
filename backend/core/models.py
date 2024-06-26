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
    
    def get_author_id(self):
        return self.author.id
    
    def __str__(self):
        return self.content[:20]


class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'post')


class Bookmark(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'post')


class Follow(models.Model):
    follower = models.ForeignKey(User, related_name='following', on_delete=models.CASCADE)
    following = models.ForeignKey(User, related_name='followers', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def get_follower_username(self):
        return self.follower.username
    def get_following_username(self):
        return self.following.username

    class Meta:
        unique_together = ('follower', 'following')


class Profile(models.Model):
    owner = models.OneToOneField(User, on_delete=models.CASCADE)
    picture = models.URLField(blank=True, null=True)
    biography = models.TextField(blank=True)
    
    def get_profile_owner_username(self):
        return self.owner.username
    
    def get_prof_owner_email(self):
        return self.owner.email

    def __str__(self):
        return f'{self.owner.username} Profile'
    
