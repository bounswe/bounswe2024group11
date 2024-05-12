from django.urls import path
from . import views

urlpatterns = [
    path('create', views.create_post, name="create_post"),
    path('list', views.PostListAPIView.as_view(), name="post_list"),
    path('detail/<int:pk>', views.post_detail, name="post_detail"),
    path('update/<int:pk>', views.update_post, name="update_post"),
    path('delete/<int:pk>', views.delete_post, name="delete_post"),
    # path('like', views.like, name="like"),
]