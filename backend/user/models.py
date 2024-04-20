from django.db import models

# Create your models here.

class User(models.Model):
    username = models.CharField(max_length=100)
    email = models.EmailField()
    name = models.CharField(max_length=100)
    surname = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)