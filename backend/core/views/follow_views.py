from rest_framework import viewsets, permissions
from ..models import Follow
from ..serializers.serializers import FollowSerializer
from rest_framework.exceptions import PermissionDenied
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from ..permissions import IsAuthorOrReadOnly

class FollowViewSet(viewsets.ModelViewSet):
    queryset = Follow.objects.all()
    serializer_class = FollowSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]
    http_method_names = ['get', 'post', 'delete']
    
    @swagger_auto_schema(
        operation_summary="Create Follow",
        request_body=FollowSerializer,
        manual_parameters=[
            openapi.Parameter(
                'following',
                openapi.IN_QUERY,
                description="ID of the user to follow",
                type=openapi.TYPE_INTEGER,
                required=True
            )],
        responses={
            201: FollowSerializer,
            400: "Bad Request"
        }
    )
    def perform_create(self, serializer):
        serializer.save(follower=self.request.user)

    @swagger_auto_schema(
        operation_summary="Delete Follow",
        manual_parameters=[
            openapi.Parameter(
                'id',
                openapi.IN_PATH,
                description="ID of the follow to delete",
                type=openapi.TYPE_INTEGER,
                required=True
            )
        ],
        responses={
            204: "No Content",
            403: "Forbidden - Can only delete own follow"
        }
    )
    def perform_destroy(self, instance):
        # check if the user is trying to delete their own follow
        if instance.follower != self.request.user:
            raise PermissionDenied("You can't delete this follow")
        else:
            instance.delete()
            
    @swagger_auto_schema(
        operation_summary="List Follows",
        responses={
            200: FollowSerializer(many=True)
        }
    )
    def get_queryset(self):
        # Allow users to see only their own follows
        return self.queryset.filter(follower=self.request.user)
    