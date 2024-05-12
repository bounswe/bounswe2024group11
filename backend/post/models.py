from django.db import models
# from django.contrib.auth.models import User
from user.models import User
from django.urls import reverse

class Post(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, on_update=models.CASCADE)
    title = models.CharField(max_length=100)
    text = models.TextField()
    image_src = models.URLField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    like_count = models.IntegerField(default=0)
    bookmark_count = models.IntegerField(default=0)

    def __str__(self):
        return self.title
    
    def get_absolute_url(self):
        return reverse('post_detail', args=[str(self.id)])
    
class Like(models.Model):
    user = models.ForeignKey(User, related_name='likes', on_delete=models.CASCADE, on_update=models.CASCADE)
    post = models.ForeignKey(Post, related_name='likes', on_delete=models.CASCADE)
    
    def __str__(self):
        return f"{self.user} likes {self.post}"
    
class Bookmark(models.Model):
    user = models.ForeignKey(User, related_name='bookmarks', on_delete=models.CASCADE, on_update=models.CASCADE)
    post = models.ForeignKey(Post, related_name='bookmarks', on_delete=models.CASCADE)
    
    def __str__(self):
        return f"{self.user} bookmarks {self.post}"
