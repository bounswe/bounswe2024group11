from django.contrib import admin
from .models import CustomUser, ForumQuestion, Tag, Quiz, QuizQuestion, RateQuiz, QuizQuestionChoice, TakeQuiz, UserAnswer

# Register your models here.
admin.site.register(CustomUser)
admin.site.register(ForumQuestion)
admin.site.register(Tag)
admin.site.register(Quiz)
admin.site.register(QuizQuestion)
admin.site.register(QuizQuestionChoice)
admin.site.register(RateQuiz)
admin.site.register(TakeQuiz)
admin.site.register(UserAnswer)
