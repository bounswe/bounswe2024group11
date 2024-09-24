from django.contrib import admin
from .models import Post, Like, Bookmark, Follow, Profile

admin.site.register(Post)
admin.site.register(Like)
admin.site.register(Bookmark)
admin.site.register(Follow)
admin.site.register(Profile)
