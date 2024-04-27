from django.contrib.auth.models import UserManager, AbstractBaseUser
from django.db import models
from django.utils import timezone

# Create your models here.

class CustomUserManager(UserManager):

    def _create_user(self, username, email, password, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email,username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, username=None, email=None, password=None, **extra_fields):
        return self._create_user(username, email, password, **extra_fields)
    

class User(AbstractBaseUser):
    username = models.CharField(max_length=100, blank=True, default="", unique=True)
    email = models.EmailField(blank=True, default="", unique=True)
    password = models.CharField(max_length=100, blank=True, default="")
    date_joined = models.DateTimeField(default=timezone.now)
    last_login = models.DateTimeField(blank=True, null=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'username'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = ['email', 'password']

    class Meta:
        verbose_name = 'user'
        verbose_name_plural = 'users'

    def get_username(self):
        return self.username
"""
class User(models.Model):
    username = models.CharField(max_length=100)
    email = models.EmailField()
    name = models.CharField(max_length=100)
    surname = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
"""