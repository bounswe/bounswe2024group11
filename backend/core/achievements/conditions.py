from ..models import TakeQuiz, UserAchievement, ForumQuestion, ForumAnswer, ForumAnswerUpvote, ForumDownvote, ForumUpvote, ForumBookmark, Quiz, CustomUser, Follow
from django.db import models
SELF_ACHIEVEMENT_CONDITIONS = {
    "first-quiz": lambda user: TakeQuiz.objects.filter(user=user).exists(),
    "first-question": lambda user: ForumQuestion.objects.filter(author=user).exists(),
    "first-answer": lambda user: ForumAnswer.objects.filter(author=user).exists(),
    "first-follow": lambda user: Follow.objects.filter(follower=user).exists(),
    "first-bookmark": lambda user: ForumBookmark.objects.filter(user=user).exists(),
    "quiz-creator": lambda user: Quiz.objects.filter(author=user).exists(),
    "quiz-fan": lambda user: TakeQuiz.objects.filter(user=user).count() >= 10,
    "quiz-champion": lambda user: TakeQuiz.objects.filter(user=user).count() >= 25,
    # "perfect-scorer": lambda user: TakeQuiz.objects.filter(
    #     user=user,
    #     answers__is_hint_used=False,
    #     answers__answer__is_correct=True
    # ).annotate(
    #     total_questions=models.Count('quiz__questions')
    # ).filter(
    #     total_questions=models.F('quiz__questions__count')
    # ).distinct().count() >= 5,
    "quiz-expert": lambda user: Quiz.objects.filter(author=user).count() >= 10,
    "active-questioner": lambda user: ForumQuestion.objects.filter(author=user).count() >= 10,
    "question-expert": lambda user: ForumAnswer.objects.filter(author=user).count() >= 25,
    "save-expert": lambda user: ForumBookmark.objects.filter(user=user).count() >= 10,
    "getting-started": lambda user: user.interests.count() >= 3,
    "diverse-learner": lambda user: user.interests.count() >= 10,
    "community-builder": lambda user: Follow.objects.filter(follower=user).count() >= 10,
    
}

NON_SELF_ACHIEVEMENT_CONDITIONS = {
    "popular-teacher": lambda user: TakeQuiz.objects.filter(quiz__author=user).count() >= 10,
    "helpful-member": lambda user: ForumAnswerUpvote.objects.filter(forum_answer__author=user).count() >= 10,
    "answer-guru": lambda user: ForumAnswerUpvote.objects.filter(forum_answer__author=user).count() >= 100,
    "new-friend": lambda user: Follow.objects.filter(following=user).count() >= 10,
    "rising-star": lambda user: Follow.objects.filter(following=user).count() >= 50,
}