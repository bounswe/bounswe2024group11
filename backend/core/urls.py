from django.urls import path
from .views.forum_views import ForumQuestionViewSet
from rest_framework.routers import DefaultRouter
from .views import views
from .views.jwt_views import DecoratedTokenObtainPairView, DecoratedTokenRefreshView, DecoratedTokenVerifyView, RegisterView

router = DefaultRouter()
router.register(r'forum-questions', ForumQuestionViewSet, basename='forum-question')

urlpatterns = [
    path("", views.index, name="index"),
    path('auth/login/', DecoratedTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', DecoratedTokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', DecoratedTokenVerifyView.as_view(), name='token_verify'),
    path('auth/register/', RegisterView.as_view(), name='register'),

]

urlpatterns += router.urls