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
    
class Quiz(models.Model):
    QUIZ_TYPE_CHOICES = [
        (1, "English to Turkish"),
        (2, "Turkish to English"),
        (3, "English word to Sense"),
    ]

    PROFICIENCY_LEVEL_CHOICES = [
        (1, "Beginner"),
        (2, "Intermediate"),
        (3, "Advanced"),
        (4, "Expert"),
    ]

    title = models.CharField(max_length=255)
    description = models.TextField() 
    author = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    proficiency_level = models.IntegerField(choices=PROFICIENCY_LEVEL_CHOICES)
    tags = models.ManyToManyField('Tag')
    quiz_type = models.IntegerField(choices=QUIZ_TYPE_CHOICES)
   ## num_taken = models.IntegerField(default=0)
    
    def __str__(self):
        return self.title
    
class QuizQuestion(models.Model):
    question_text = models.CharField(max_length=1000)
    choices = models.JSONField()
    correct_answer = models.CharField(max_length=255)
    quiz = models.ForeignKey(Quiz, related_name="questions", on_delete=models.CASCADE)
    
    def __str__(self):
        return self.question_text


