from django.urls import path
from . import views

urlpatterns = [
    path('', views.getUsers),
    path('add/', views.addUser),
    path('update/<str:pk>/', views.updateUser),
    path('delete/<str:pk>/', views.deleteUser),
]