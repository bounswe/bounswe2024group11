# Create your models here.
from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    email = models.EmailField()
    full_name = models.CharField(max_length=100)
    avatar = models.CharField(max_length=1000, blank=True, null=True)

class ForumQuestion(models.Model):
    title = models.CharField(max_length=100)
    question = models.CharField(max_length=1000)
    author = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    tags = models.ManyToManyField('Tag')

    def __str__(self):
        return self.title
    
class Tag(models.Model):
    name = models.CharField(max_length=100)
    linked_data_id = models.CharField(max_length=100)
    description = models.CharField(max_length=1000)

    def __str__(self):
        return self.name
    

class Vote(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    forum_question = models.ForeignKey(ForumQuestion, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    Voted = models.BooleanField(default=False)
    
    class Meta:
        unique_together = ['user', 'forum_question']
