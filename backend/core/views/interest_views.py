
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions

from ..models import CustomUser, Tag
from ..serializers.serializers import TagSerializer
from ..permissions import IsAuthorOrReadOnly
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

class InterestView(APIView):
    """
    APIView to manage user interests (POST and DELETE).
    """
    permission_classes = [permissions.IsAuthenticated, IsAuthorOrReadOnly]


    @swagger_auto_schema(
        operation_summary="Add a new interest",
        request_body=TagSerializer,
        responses={
            201: openapi.Response(
                description="Interest added successfully",
                examples={
                    "application/json": {
                        "id": 1
                        
                    }
                },
            ),
            400: "Bad Request",
        },
    )
    def post(self, request):
        """Add a new interest to the authenticated user."""
        serializer = TagSerializer(data=request.data)
        if serializer.is_valid():
            # Check if the interest already exists or create it
            interest, created = Tag.objects.get_or_create(
                name=serializer.validated_data['name'],
                defaults={
                    'linked_data_id': serializer.validated_data.get('linked_data_id'),
                    'description': serializer.validated_data.get('description'),
                }
            )
            # Add the interest to the user's interests
            request.user.interests.add(interest)
            return Response(
                {   "id": interest.id
                    },
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    @swagger_auto_schema(
        operation_summary="Remove an interest",
        manual_parameters=[
            openapi.Parameter(
                "id",
                openapi.IN_QUERY,
                description="ID of the interest to be removed",
                type=openapi.TYPE_INTEGER,
                required=True,
            )
        ],
        responses={
            204: openapi.Response(
                description="Interest removed successfully",
                examples={
                    "application/json": {
                        "message": "Interest 'Artificial Intelligence' removed successfully."
                    }
                },
            ),
            400: "Bad Request",
            403: "Forbidden",
            404: "Not Found",
        },
    )
    def delete(self, request):
        """Remove an interest from the authenticated user."""
        interest_id = request.query_params.get('id')
        # print(request)
        if not interest_id:
            return Response(
                {"error": "Parameter 'id' is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            # Ensure the interest belongs to the user
            interest = Tag.objects.get(id=interest_id)
            print(request.user.interests.all())
            print(interest)

            if interest not in request.user.interests.all():
                return Response(
                    {"error": "You do not have permission to delete this interest."},
                    status=status.HTTP_403_FORBIDDEN,
                )
            # Remove the interest
            request.user.interests.remove(interest)
            return Response(
                {"message": f"Interest '{interest.name}' removed successfully."},
                status=status.HTTP_204_NO_CONTENT,
            )
        except Tag.DoesNotExist:
            return Response({"error": "Interest not found."}, status=status.HTTP_404_NOT_FOUND)