from django.urls import path


from .views.get_translation_views import TranslationView
from .views.difficulty_views import QuestionPointView
from .views.forum_views import ForumQuestionViewSet, ForumAnswerViewSet
from .views.quiz_views import QuizViewSet
from .views.rate_quiz_views import RateQuizViewSet
from .views.take_quiz_views import TakeQuizViewSet
from .views.profile_views import ProfileView
from .views.hint_views import HintView
from .views.forum_bookmark_views import ForumBookmarkViewSet
from .views.semantic_search_views import ForumSemanticSearchView, QuizSemanticSearchView
from .views.forum_vote_views import ForumUpvoteViewSet, ForumDownvoteViewSet, ForumAnswerUpvoteViewSet, ForumAnswerDownvoteViewSet
from rest_framework.routers import DefaultRouter
from rest_framework_nested import routers
from .views import views
from .views.tagging_views import TaggingView
from .views.jwt_views import DecoratedTokenObtainPairView, DecoratedTokenRefreshView, DecoratedTokenVerifyView, RegisterView
from django.contrib import admin

from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from django.urls import re_path

schema_view = get_schema_view(
    openapi.Info(
        title="API documentation",
        default_version='v1',
        description="API documentation",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="contact@example.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
)

router = DefaultRouter()
router.register(r'forum-questions', ForumQuestionViewSet, basename='forum-question')
router.register(r'quizzes', QuizViewSet, basename='quiz')
router.register(r'rate-quiz', RateQuizViewSet, basename='rate-quiz')
router.register(r'take-quiz', TakeQuizViewSet, basename='take-quiz')
router.register(r'forum-bookmarks', ForumBookmarkViewSet, basename='forumbookmark')
router.register(r'forum-upvote', ForumUpvoteViewSet, basename='forum-upvote')
router.register(r'forum-downvote', ForumDownvoteViewSet, basename='forum-downvote')
router.register(r'forum-answer-upvote', ForumAnswerUpvoteViewSet, basename='forum-answer-upvote')
router.register(r'forum-answer-downvote', ForumAnswerDownvoteViewSet, basename='forum-answer-downvote')

forum_question_router = routers.NestedDefaultRouter(router, r'forum-questions', lookup='forum_question')
forum_question_router.register(r'answers', ForumAnswerViewSet, basename='forum-question-answers')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),

    path("", views.index, name="index"),
    path('auth/login/', DecoratedTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', DecoratedTokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', DecoratedTokenVerifyView.as_view(), name='token_verify'),
    path('auth/register/', RegisterView.as_view(), name='register'),
    path("tagging/", TaggingView.as_view(), name="tagging"),
    path('hint/', HintView.as_view(), name='babelnet-hint'),
    path("get-translation/", TranslationView.as_view(), name="get-translation"),
    path('profile/', ProfileView.as_view(), name='profile'),
    path("semantic-search-forum/", ForumSemanticSearchView.as_view(), name="forum-semantic-search"),
    path("semantic-search-quiz/", QuizSemanticSearchView.as_view(), name="quiz-semantic-search"),
    path("get-difficulty/", QuestionPointView.as_view(), name="get-difficulty"),
]

urlpatterns += router.urls
urlpatterns += forum_question_router.urls