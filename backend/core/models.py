# Create your models here.
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.core.exceptions import ValidationError  # Import ValidationError

class Achievement(models.Model):
    id = models.AutoField(primary_key=True)
    slug = models.SlugField(max_length=100, unique=True)
    title = models.CharField(max_length=100)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    category = models.CharField(max_length=100, default='General')

    def __str__(self):
        return self.title


class CustomUser(AbstractUser):
    email = models.EmailField()
    full_name = models.CharField(max_length=100)
    avatar = models.CharField(max_length=1000, blank=True, null=True)
    achievements = models.ManyToManyField('Achievement', through='UserAchievement', blank=True)
    interests = models.ManyToManyField('Tag', related_name='interested_users', blank=True)

class UserAchievement(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    achievement = models.ForeignKey(Achievement, on_delete=models.CASCADE)
    earned_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'achievement')

    def __str__(self):
        return f"{self.user.username} earned {self.achievement.title}"

class ForumQuestion(models.Model):
    title = models.CharField(max_length=100)
    question = models.CharField(max_length=1000)
    author = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    tags = models.ManyToManyField('Tag')
    quiz_question_id = models.ForeignKey('QuizQuestion', on_delete=models.CASCADE, null=True, blank=True) 
    updated_at = models.DateTimeField(auto_now=True)


    def __str__(self):
        return self.title
    
class Tag(models.Model):
    name = models.CharField(max_length=100)
    linked_data_id = models.CharField(max_length=100, unique=True)
    description = models.CharField(max_length=1000)

    def __str__(self):
        return self.name
    
class Quiz(models.Model):
    QUIZ_TYPE_CHOICES = [
        (1, "English to Turkish"),
        (2, "Turkish to English"),
        (3, "English word to Sense"),
    ]

    DIFFICULTY_CHOICES = [
        (1, "Beginner"),
        (2, "Intermediate"),
        (3, "Advanced")
    ]

    title = models.CharField(max_length=255)
    description = models.TextField() 
    author = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    difficulty = models.IntegerField(choices=DIFFICULTY_CHOICES)
    quiz_point = models.IntegerField(default=0)
    tags = models.ManyToManyField('Tag')
    type = models.IntegerField(choices=QUIZ_TYPE_CHOICES)    
    
    def __str__(self):
        return self.title
    
class QuizQuestion(models.Model):
    question_text = models.CharField(max_length=1000)
    question_point = models.IntegerField(default=0)
    quiz = models.ForeignKey(Quiz, related_name="questions", on_delete=models.CASCADE)
    
    def __str__(self):
        return self.question_text


class QuizQuestionHint(models.Model):
    type = models.CharField(max_length=100)
    text = models.CharField(max_length=1000)
    question = models.ForeignKey(QuizQuestion, related_name="hints", on_delete=models.CASCADE)

class QuizQuestionChoice(models.Model):
    question = models.ForeignKey(QuizQuestion, related_name="choices", on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=255)
    is_correct = models.BooleanField(default=False)
    
    def __str__(self):
        return self.choice_text

class TakeQuiz(models.Model):
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name='takes')
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    score = models.IntegerField(default=0)

class UserAnswer(models.Model):
    question = models.ForeignKey(QuizQuestion, on_delete=models.CASCADE)
    take_quiz = models.ForeignKey(TakeQuiz, related_name='answers', on_delete=models.CASCADE, null=True)
    answer = models.ForeignKey(QuizQuestionChoice, null=True, blank=True, on_delete=models.CASCADE)
    is_hint_used = models.BooleanField(default=False)
    
    class Meta:
        unique_together = ['question', 'take_quiz']
        
    def clean(self):
        if self.question.quiz.id != self.take_quiz.quiz.id:
            raise ValidationError("The question must belong to the same quiz.")
        if self.answer and self.answer.question.id != self.question.id:  # Add null check
            raise ValidationError("The answer must belong to the same question.")

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return str(self.id)
    

class RateQuiz(models.Model):
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    rating = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)]
    )
    # unique together
    class Meta:
        unique_together = ['quiz', 'user']

class ForumBookmark(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    forum_question = models.ForeignKey(ForumQuestion, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    class Meta:
        unique_together = ("user", "forum_question")  
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.user} bookmarked {self.forum_question}"

class ForumUpvote(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    forum_question = models.ForeignKey(ForumQuestion, on_delete=models.CASCADE, related_name='upvotes')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "forum_question")
        ordering = ["-created_at"]

    def save(self, *args, **kwargs):
        ForumDownvote.objects.filter(user=self.user, forum_question=self.forum_question).delete()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.user} upvoted {self.forum_question}"


class ForumDownvote(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    forum_question = models.ForeignKey(ForumQuestion, on_delete=models.CASCADE, related_name='downvotes')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "forum_question")
        ordering = ["-created_at"]

    def save(self, *args, **kwargs):
        ForumUpvote.objects.filter(user=self.user, forum_question=self.forum_question).delete()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.user} downvoted {self.forum_question}"

class ForumAnswer(models.Model):
    forum_question = models.ForeignKey(ForumQuestion, on_delete=models.CASCADE, related_name='answers')
    author = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    answer = models.CharField(max_length=1000)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.answer
    
class ForumAnswerUpvote(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    forum_answer = models.ForeignKey(ForumAnswer, on_delete=models.CASCADE, related_name='upvotes')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "forum_answer")
        ordering = ["-created_at"]

    def save(self, *args, **kwargs):
        ForumAnswerDownvote.objects.filter(user=self.user, forum_answer=self.forum_answer).delete()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.user} upvoted {self.forum_answer}"
    
class ForumAnswerDownvote(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    forum_answer = models.ForeignKey(ForumAnswer, on_delete=models.CASCADE, related_name='downvotes')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "forum_answer")
        ordering = ["-created_at"]

    def save(self, *args, **kwargs):
        ForumAnswerUpvote.objects.filter(user=self.user, forum_answer=self.forum_answer).delete()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.user} downvoted {self.forum_answer}"