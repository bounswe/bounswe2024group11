from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'posts', PostViewSet)
router.register(r'likes', LikeViewSet)
router.register(r'bookmarks', BookmarkViewSet)
router.register(r'follows', FollowViewSet)
router.register(r'users', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register/', UserRegistrationView.as_view(), name='user_registration'),
    path('suggestions/', WikidataSuggestionsView.as_view(), name='wikidata_suggestions'),
    path('search/', SearchPostView.as_view(), name='search_posts'),
]
