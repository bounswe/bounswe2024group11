from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from core.serializers.profile_serializer import ProfileSerializer
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from django.contrib.auth import get_user_model

User = get_user_model()

class ProfileView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    @swagger_auto_schema(
        operation_summary="Retrieve User Profile",
        manual_parameters=[
            openapi.Parameter(
                'username', 
                openapi.IN_PATH,
                description="Username of the user to retrieve",
                type=openapi.TYPE_STRING,
                required=True
            )
        ],
        responses={
            200: ProfileSerializer,
            404: "User not found"
        }
    )
    def get(self, request, username=None):
        """Retrieve a user's profile by username or authenticated user's profile."""
        try:
            if username:
                user = User.objects.get(username=username)
            else:
                user = request.user
                
            serializer = ProfileSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
            
        except User.DoesNotExist:
            return Response(
                {
                    "error": "Not found",
                    "message": f"User with username '{username}' does not exist"
                },
                status=status.HTTP_404_NOT_FOUND
            )
    
    @swagger_auto_schema(
        operation_summary="Update User Profile",
        request_body=ProfileSerializer,
        responses={
            200: ProfileSerializer,
            400: "Bad Request",
            403: "Forbidden - Can only update own profile"
        }
    )
    def patch(self, request, username=None):
        """Update the authenticated user's profile."""
        if username and username != request.user.username:
            return Response(
                {
                    "error": "Forbidden",
                    "message": "You can only update your own profile"
                },
                status=status.HTTP_403_FORBIDDEN
            )
            
        serializer = ProfileSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(
            {
                "error": "Validation error",
                "message": serializer.errors
            },
            status=status.HTTP_400_BAD_REQUEST
        )
    
    @swagger_auto_schema(
        operation_summary="Delete User Profile",
        manual_parameters=[
            openapi.Parameter(
                'username', 
                openapi.IN_PATH,
                description="Username of the user to delete",
                type=openapi.TYPE_STRING,
                required=True
            )
        ],
        responses={
            204: "User profile deleted successfully",
            403: "Forbidden - Can only delete own profile",
            404: "User not found"
        }
    )
    def delete(self, request, username=None):
        """Delete a user profile."""
        try:
            if not username:
                return Response(
                    {
                        "error": "Bad request",
                        "message": "Username is required"
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )

            user = User.objects.get(username=username)
            
            # Only allow users to delete their own profile
            if user != request.user:
                return Response(
                    {
                        "error": "Forbidden",
                        "message": "You can only delete your own profile"
                    },
                    status=status.HTTP_403_FORBIDDEN
                )
                
            user.delete()
            return Response(
                {
                    "message": "Profile deleted successfully"
                },
                status=status.HTTP_204_NO_CONTENT
            )
            
        except User.DoesNotExist:
            return Response(
                {
                    "error": "Not found",
                    "message": f"User with username '{username}' does not exist"
                },
                status=status.HTTP_404_NOT_FOUND
            )