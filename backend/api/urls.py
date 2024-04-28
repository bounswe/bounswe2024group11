from django.urls import path
from . import views
from .views import search
urlpatterns = [
    # path('test_token', views.test_token, name="test_token"),
    path('signup', views.register, name="signup"),
    path('login', views.login, name="login"),
    path('search/', views.search, name='search')


]