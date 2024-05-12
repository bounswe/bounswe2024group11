from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework import status
from rest_framework import permissions
from .models import Post, Like, Bookmark
from .serializers import PostSerializer, LikeSerializer, BookmarkSerializer
from user.models import User

# from rest_framework.authtoken.models import Token
from django.shortcuts import get_object_or_404
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
# import requests
from django.contrib.auth.decorators import login_required

class PostListAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request, *args, **kwargs):
        posts = Post.objects.all()
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request, *args, **kwargs):
        data = {
            'author': request.author.id,
            'title': request.data.get('title'),
            'text': request.data.get('text'),
            'image': request.data.get('image', None)
        }
        serializer = PostSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@swagger_auto_schema(
    method='post',
    operation_description="Create a new post with a title, a content, and an image.",
    operation_summary="create a post",
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'title': openapi.Schema(type=openapi.TYPE_STRING),
            'text': openapi.Schema(type=openapi.TYPE_STRING),
            'image': openapi.Schema(type=openapi.TYPE_STRING),
            'author': openapi.Schema(type=openapi.TYPE_INTEGER)
        },
        required=['title', 'text', 'author']
    ),    responses={
        201: "Created",
        400: "Missing required fields"
    },
    operation_id='signup',
)
@api_view(['POST'])
@login_required(login_url='login')
def create_post(request):
    required_fields = ['title', 'text', 'author']
    if not all([field in request.data for field in required_fields]):
        return Response({"error":"Please provide all required fields."}, status=status.HTTP_400_BAD_REQUEST)
    
    serializer = PostSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@swagger_auto_schema(
    method='get',
    operation_description="Get the details of a post.",
    operation_summary="get post details",
    responses={
        200: "OK",
        404: "Post not found"
    },
    operation_id='post_detail',
)
@api_view(['GET'])
def post_detail(request, pk):
    post = get_object_or_404(Post, pk=pk)
    serializer = PostSerializer(post)
    return Response(serializer.data)

@swagger_auto_schema(
    method='put',
    operation_description="Update a post with a new title, content, or image.",
    operation_summary="update a post",
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'title': openapi.Schema(type=openapi.TYPE_STRING),
            'text': openapi.Schema(type=openapi.TYPE_STRING),
            'image': openapi.Schema(type=openapi.TYPE_STRING),
        },
    ),    responses={
        200: "OK",
        400: "Missing required fields"
    },
    operation_id='update_post',
)
@api_view(['PUT'])
def update_post(request, pk):
    post = get_object_or_404(Post, pk=pk)
    serializer = PostSerializer(post, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@swagger_auto_schema(
    method='delete',
    operation_description="Delete a post.",
    operation_summary="delete a post",
    responses={
        204: "No Content",
        404: "Post not found"
    },
    operation_id='delete_post',
)
@api_view(['DELETE'])
def delete_post(request, pk):
    post = get_object_or_404(Post, pk=pk)
    post.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
