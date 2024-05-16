import requests
from rest_framework import viewsets, permissions, status
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User
from .models import Post, Like, Bookmark, Follow, Profile
from .serializers import *
from .permissions import (
    IsAuthorOwnerOrReadOnly,
    IsUserOwnerOrReadOnly,
    IsFollowerOwnerOrReadOnly,
    IsProfileOwnerOrReadOnly,
)
from . import wikidata_helpers
from django.db.models import Count
from drf_yasg.utils import swagger_auto_schema
from swagger_docs.swagger import *
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = CreatePostSerializer
    permission_classes = [permissions.IsAuthenticated, IsAuthorOwnerOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        followings = user.following.all().values_list("following_id", flat=True)
        return Post.objects.filter(author__in=followings) | Post.objects.filter(
            author=user
        )

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.author != request.user:
            return Response(
                {"res": "You are not authorized to delete this post."},
                status=status.HTTP_403_FORBIDDEN,
            )
        else:
            self.perform_destroy(instance)
            return Response(
                {"res": "Post deleted successfully."}, status=status.HTTP_204_NO_CONTENT
            )


class LikeViewSet(viewsets.ModelViewSet):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer
    permission_classes = [permissions.IsAuthenticated, IsUserOwnerOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class BookmarkViewSet(viewsets.ModelViewSet):
    queryset = Bookmark.objects.all()
    serializer_class = BookmarkSerializer
    permission_classes = [permissions.IsAuthenticated, IsUserOwnerOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class FollowViewSet(viewsets.ModelViewSet):
    queryset = Follow.objects.all()
    serializer_class = FollowSerializer
    permission_classes = [permissions.IsAuthenticated, IsFollowerOwnerOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(follower=self.request.user)


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserRegistrationView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class WikidataSuggestionsView(APIView):
    permission_classes = [permissions.AllowAny]

    @swagger_auto_schema(
        operation_path="/api/suggestions/", **wikidata_suggestions_swagger
    )
    def get(self, request):
        keyword = request.query_params.get("keyword")
        if not keyword:
            return Response(
                {"res": 'Keyword parameter "keyword" is required.'},
                status=status.HTTP_400_BAD_REQUEST,
            )          
        if qid[0] != "Q":
            return Response(
                {"res": f'QID should start with "Q".'},
                status=status.HTTP_400_BAD_REQUEST,
            )
        try:
            url = f"https://www.wikidata.org/w/api.php?action=wbsearchentities&search={keyword}&language=en&format=json"
            response = requests.get(url)
            if response.status_code == 200:
                data = response.json()
                suggestions = [
                    {
                        "qid": item["id"],
                        "label": item["label"],
                        "description": item["description"],
                    }
                    for item in data["search"]
                ]

                # Return the extracted fields in the response
                return Response(suggestions)
            else:
                return Response(
                    {"res": "Error while fetching data from Wikidata."},
                    status=response.status_code,
                )
        except Exception as e:
            return Response(
                {"res": "An unexpected error occurred."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class SearchPostView(ListAPIView):
    queryset = Post.objects.all()
    serializer_class = SearchPostSerializer
    permission_classes = [permissions.AllowAny]

    @swagger_auto_schema(**search_post_swagger)
    def get(self, request):
        qid = request.query_params.get("qid").upper()
        category = request.query_params.get("category")
        if not qid or not category:
            return Response(
                {"res": 'Both "qid" and "category" parameters are required.'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            if category == "born in":
                result_data = wikidata_helpers.born_in_wikidata(qid)
            if category == "enemy of":
                result_data = wikidata_helpers.enemy_of_wikidata(qid)
            if category == "occupation":
                result_data = wikidata_helpers.occupation_wikidata(qid)
            if category == "present in":
                result_data = wikidata_helpers.present_in_wikidata(qid)
            if category == "educated at":
                result_data = wikidata_helpers.educated_at_wikidata(qid)
            if category == "member of":
                result_data = wikidata_helpers.member_of_wikidata(qid)

            # Extract QIDs from the result_data
            qids = [entry["qid"] for entry in result_data.data["results"]]
            # Call the SearchPostView's get method with QIDs as query parameters
            # return result_data
            queryset = self.get_queryset()
            # search_query = request.query_params.getlist('keyword')
            search_query = [qid.upper() for qid in qids]

            if search_query:
                queryset = queryset.filter(qid__in=search_query)
            queryset = queryset.filter(qid__in=search_query)

            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response(
                {"res": "An unexpected error occurred."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    @swagger_auto_schema(**login_swagger)
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        if username is None or password is None:
            return Response(
                {"error": "Please provide both username and password"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user = authenticate(username=username, password=password)

        if not user:
            return Response(
                {"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED
            )

        refresh = RefreshToken.for_user(user)
        serialized_user = UserSerializer(user).data
        return Response(
            {
                "refresh": str(refresh),
                "token": str(refresh.access_token),
                "user": serialized_user,
            },
            status=status.HTTP_200_OK,
        )


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated, IsProfileOwnerOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class WikiInfoView(APIView):
    permission_classes = [permissions.AllowAny]

    @swagger_auto_schema(**wiki_info_swagger)
    def get(self, request):
        qid = request.query_params.get("qid")
        if not qid:
            return Response(
                {"res": 'Parameter "qid" is required.'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            result_data = wikidata_helpers.wiki_info_helper(qid)
            return Response(result_data.data)
        except Exception as e:
            return Response(
                {"res": "An unexpected error occurred."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
