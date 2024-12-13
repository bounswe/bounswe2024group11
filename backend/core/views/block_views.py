from rest_framework import viewsets, permissions
from ..models import Block
from ..serializers.serializers import BlockSerializer
from rest_framework.exceptions import PermissionDenied
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from ..permissions import IsAuthorOrReadOnly

class BlockViewSet(viewsets.ModelViewSet):
    queryset = Block.objects.all()
    serializer_class = BlockSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]
    http_method_names = ['get', 'post', 'delete']
    
    @swagger_auto_schema(
        operation_summary="Create Block",
        request_body=BlockSerializer,
        manual_parameters=[
            openapi.Parameter(
                'blocking',
                openapi.IN_QUERY,
                description="ID of the user to block",
                type=openapi.TYPE_INTEGER,
                required=True
            )],
        responses={
            201: BlockSerializer,
            400: "Bad Request"
        }
    )
    def perform_create(self, serializer):
        serializer.save(blocker=self.request.user)

    @swagger_auto_schema(
        operation_summary="Delete Block",
        manual_parameters=[
            openapi.Parameter(
                'id',
                openapi.IN_PATH,
                description="ID of the block to delete",
                type=openapi.TYPE_INTEGER,
                required=True
            )
        ],
        responses={
            204: "No Content",
            403: "Forbidden - Can only delete own block"
        }
    )
    def perform_destroy(self, instance):
        # check if the user is trying to delete their own block
        if instance.blocker != self.request.user:
            raise PermissionDenied("You can't delete this block")
        else:
            instance.delete()
            
    @swagger_auto_schema(
        operation_summary="List User's Own Blocks",
        responses={
            200: BlockSerializer(many=True)
        }
    )
    def get_queryset(self):
        # Allow users to see only their own blocks
        return self.queryset.filter(blocker=self.request.user)