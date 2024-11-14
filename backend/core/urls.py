from django.urls import path
from .views.forum_views import ForumQuestionViewSet
from .views.quiz_views import QuizViewSet
from .views.quiz_question_views import QuizQuestionViewSet
from .views.rate_quiz_views import RateQuizViewSet
from rest_framework.routers import DefaultRouter
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
router.register(r'take-quiz', RateQuizViewSet, basename='take-quiz')

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

]

urlpatterns += router.urls