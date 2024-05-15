import requests
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User
from .models import Post, Like, Bookmark, Follow
from .serializers import PostSerializer, LikeSerializer, BookmarkSerializer, FollowSerializer, UserSerializer, UserRegistrationSerializer
from .permissions import IsOwnerOrReadOnly
from . import wikidata_helpers

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        followings = user.following.all().values_list('following_id', flat=True)
        return Post.objects.filter(author__in=followings)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class LikeViewSet(viewsets.ModelViewSet):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer
    permission_classes = [permissions.IsAuthenticated]


class BookmarkViewSet(viewsets.ModelViewSet):
    queryset = Bookmark.objects.all()
    serializer_class = BookmarkSerializer
    permission_classes = [permissions.IsAuthenticated]


class FollowViewSet(viewsets.ModelViewSet):
    queryset = Follow.objects.all()
    serializer_class = FollowSerializer
    permission_classes = [permissions.IsAuthenticated]


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

    def get(self, request):
        keyword = request.query_params.get('keyword')
        if not keyword:
            return Response({'res': 'Keyword parameter "keyword" is required.'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            url = f'https://www.wikidata.org/w/api.php?action=wbsearchentities&search={keyword}&language=en&format=json'
            response = requests.get(url)
            if response.status_code == 200:
                data = response.json()
                suggestions = [{
                    'qid': item['id'],
                    'label': item['label'],
                    'description': item['description']
                } for item in data['search']]
                
                # Return the extracted fields in the response
                return Response(suggestions)
            else:
                return Response({'res': 'Error while fetching data from Wikidata.'}, status=response.status_code)
        except Exception as e:
            return Response({'res': 'An unexpected error occurred.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class PostSearchView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        qid = request.query_params.get('qid').upper()
        category = request.query_params.get('category')
        if not qid or not category:
            return Response({'res': 'Both "qid" and "category" parameters are required.'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            if category == "born in":
                return wikidata_helpers.born_in_wikidata(qid)
            if category == "enemy of":
                return wikidata_helpers.enemy_of_wikidata(qid)
            if category == "occupation":
                return wikidata_helpers.occupation_wikidata(qid)
            if category == "present in":
                return wikidata_helpers.present_in_wikidata(qid)
            if category == "educated at":
                return wikidata_helpers.educated_at_wikidata(qid)
            if category == "member of":
                return wikidata_helpers.member_of_wikidata(qid)
            
        except Exception as e:
            return Response({'res': 'An unexpected error occurred.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            