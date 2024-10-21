from rest_framework import permissions

class IsAuthorOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow the author of a forum question to edit or delete it.
    """

    def has_object_permission(self, request, view, obj):
        # SAFE_METHODS are GET, HEAD, and OPTIONS (read-only actions)
        if request.method in permissions.SAFE_METHODS:
            return True
        # Write permissions are only allowed to the author of the forum question
        return obj.author == request.user
