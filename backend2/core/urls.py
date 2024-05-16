from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="Zenith Comics API",
        default_version="v1",
        description="Interactive Swagger UI for API endpoints of Zenith Application",
        # terms_of_service="https://www.google.com/policies/terms/",
        # contact=openapi.Contact(email="contact@yourdomain.local"),
        # license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],  # Set permission to AllowAny
)

router = DefaultRouter()
router.register(r"posts", PostViewSet)
router.register(r"likes", LikeViewSet)
router.register(r"bookmarks", BookmarkViewSet)
# router.register(r'follows', FollowAPIView)
router.register(r"users", UserViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("register/", UserRegistrationView.as_view(), name="user_registration"),
    path(
        "suggestions/", WikidataSuggestionsView.as_view(), name="wikidata_suggestions"
    ),
    path("search/", SearchPostView.as_view(), name="search_posts"),
    path("follows/", FollowAPIView.as_view(), name="follows"),
    path(
        "swagger/",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
    path("login/", LoginView.as_view(), name="login"),
]
