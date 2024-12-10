from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from core.serializers.profile_serializer import ProfileSerializer
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from ..models import CustomUser


class ProfileView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    @swagger_auto_schema(
        operation_summary="Retrieve User Profile",
        responses={200: ProfileSerializer}
    )
    def get(self, request):
        """Retrieve the authenticated user's profile."""
        user = request.user
        serializer = ProfileSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @swagger_auto_schema(
        operation_summary="Update User Profile",
        request_body=ProfileSerializer,
        responses={200: ProfileSerializer, 400: "Bad Request"}
    )

    def patch(self, request):
        """Update the authenticated user's profile."""
        serializer = ProfileSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter(
                'id', openapi.IN_QUERY,
                description="ID of the user to delete",
                type=openapi.TYPE_INTEGER,
                required=True
            )
        ],
        responses={
            204: openapi.Response("User profile deleted successfully."),
            400: openapi.Response("Error: Parameter 'id' is required."),
            404: openapi.Response("Error: User not found.")
        }
    )
    def delete(self, request):
        """Delete a user profile by ID (via query parameter)."""
        user_id = request.query_params.get('id')  # Retrieve 'id' from query parameters
        if not user_id:
            return Response({"error": "Parameter 'id' is required."}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            user = CustomUser.objects.get(id=user_id)
        except CustomUser.DoesNotExist:
            return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)

        user.delete()
        return Response({"message": f"User profile with ID {user_id} deleted successfully."}, status=status.HTTP_204_NO_CONTENT)

            
        
               
