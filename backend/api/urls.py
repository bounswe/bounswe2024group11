from django.urls import path
from . import views
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="Zenith Comics API",
        default_version='v1',
        description="Interactive Swagger UI for API endpoints of Zenith Application",
        #terms_of_service="https://www.google.com/policies/terms/",
        #contact=openapi.Contact(email="contact@yourdomain.local"),
        #license=openapi.License(name="BSD License"),
    ),
    public=True,
)

urlpatterns = [
    # path('test_token', views.test_token, name="test_token"),
    path('signup', views.register, name="signup"),
    path('login', views.login, name="login"),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),

]