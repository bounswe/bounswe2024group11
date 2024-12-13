from rest_framework import permissions


class IsAuthorOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow the author of a forum question to edit or delete it.
    """
                
    def is_user_related_to_obj(self, obj, request):
        user = getattr(request, 'user', None)
        if not user:
            return False  # No user in request

        # Check all possible relations in priority order
        return any(
            getattr(obj, attr, None) == user
            for attr in ['author', 'user', 'follower', 'blocker']
        )

    def has_object_permission(self, request, view, obj):
        # SAFE_METHODS are GET, HEAD, and OPTIONS (read-only actions)
        if request.method in permissions.SAFE_METHODS:
            return True
        # Write permissions are only allowed to the author of the forum question
        return self.is_user_related_to_obj(obj, request)
