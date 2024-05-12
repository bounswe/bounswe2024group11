from django.urls import path
from . import views

urlpatterns = [
    path('signup', views.register, name="signup"),
    path('login', views.login, name="login"),
    path('wikidata-suggestions', views.wikidata_suggestions, name="wikidata-suggestions"),
    path('post-search', views.post_search, name="post-search"),
]