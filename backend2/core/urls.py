from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PostViewSet, LikeViewSet, BookmarkViewSet, FollowViewSet, UserViewSet, UserRegistrationView, WikidataSuggestionsView

router = DefaultRouter()
router.register(r'posts', PostViewSet)
router.register(r'likes', LikeViewSet)
router.register(r'bookmarks', BookmarkViewSet)
router.register(r'follows', FollowViewSet)
router.register(r'users', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register/', UserRegistrationView.as_view(), name='user_registration'),
    path('wikidata/suggestions/', WikidataSuggestionsView.as_view(), name='wikidata_suggestions'),
]
