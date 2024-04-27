from django.urls import path
from . import views
from .views import search_wikidata
urlpatterns = [
    path('', views.getUsers, name="get_users"),
    path('add/', views.addUser, name="add_user"),
    path('update/<str:pk>/', views.updateUser, name="update_user"),
    path('delete/<str:pk>/', views.deleteUser, name="delete_user"),
    path('search/', search_wikidata, name='search_wikidata'),
]