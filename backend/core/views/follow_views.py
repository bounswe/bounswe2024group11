from rest_framework import viewsets, permissions
from ..models import Follow
from ..serializers.serializers import FollowSerializer
from rest_framework.exceptions import PermissionDenied

class FollowViewSet(viewsets.ModelViewSet):
    queryset = Follow.objects.all()
    serializer_class = FollowSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(follower=self.request.user)

    def perform_destroy(self, instance):
        # check if the user is trying to delete their own follow
        if instance.follower != self.request.user:
            raise PermissionDenied("You can't delete this follow")
        else:
            instance.delete()
            

    def get_queryset(self):
        # Allow users to see only their own follows
        return self.queryset.filter(user=self.request.user)
    