from ..models import TakeQuiz
from rest_framework import viewsets
from rest_framework import permissions
from ..serializers.take_quiz_serializer import TakeQuizSerializer
from ..permissions import IsAuthorOrReadOnly
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

class TakeQuizViewSet(viewsets.ModelViewSet):
    queryset = TakeQuiz.objects.all().order_by('id')
    serializer_class = TakeQuizSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]

    def perform_create(self, serializer):
        # Set the author to the current authenticated user
        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
        # Set the author to the current authenticated user
        serializer.save(user=self.request.user)

    def get_permissions(self):
        if self.action == 'list':
            return [permissions.AllowAny()]
        return super().get_permissions()

    example_request_body = openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            "quiz": openapi.Schema(type=openapi.TYPE_INTEGER, example=1),  # Example value for quiz
            "answers": openapi.Schema(
                type=openapi.TYPE_ARRAY,
                items=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        "question": openapi.Schema(type=openapi.TYPE_INTEGER, example=1),
                        "answer": openapi.Schema(type=openapi.TYPE_INTEGER, example=2),
                        "is_hint_used": openapi.Schema(type=openapi.TYPE_BOOLEAN, example=False),
                    },
                    required=["question", "answer"],
                ),
            ),
        },
        required=["quiz", "answers"],
    )

    example_response_body = openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            "id": openapi.Schema(type=openapi.TYPE_INTEGER, example=23),
            "quiz": openapi.Schema(type=openapi.TYPE_INTEGER, example=1),
            "user": openapi.Schema(type=openapi.TYPE_INTEGER, example=21),
            "date": openapi.Schema(type=openapi.TYPE_STRING, format="date-time", example="2024-11-29T13:15:24.784764Z"),
            "answers": openapi.Schema(
                type=openapi.TYPE_ARRAY,
                items=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        "id": openapi.Schema(type=openapi.TYPE_INTEGER, example=15),
                        "take_quiz": openapi.Schema(type=openapi.TYPE_INTEGER, example=23),
                        "question": openapi.Schema(type=openapi.TYPE_INTEGER, example=1),
                        "answer": openapi.Schema(type=openapi.TYPE_INTEGER, example=2),
                        "is_hint_used": openapi.Schema(type=openapi.TYPE_BOOLEAN, example=False),
                    },
                    required=["id", "take_quiz", "question", "answer"],
                ),
            ),
            "score": openapi.Schema(type=openapi.TYPE_INTEGER, example=80),
            "correct_answer_count": openapi.Schema(type=openapi.TYPE_INTEGER, example=8),
            "wrong_answer_count": openapi.Schema(type=openapi.TYPE_INTEGER, example=2),
            "empty_answer_count": openapi.Schema(type=openapi.TYPE_INTEGER, example=0),
        },
        required=["id", "quiz", "user", "date", "answers", "score", "correct_answer_count", "wrong_answer_count", "empty_answer_count"],
    )

    # Define the schema for a paginated response
    paginated_quiz_response = openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            "count": openapi.Schema(type=openapi.TYPE_INTEGER, example=34),
            "next": openapi.Schema(type=openapi.TYPE_STRING, format="uri", example="http://127.0.0.1:8000/api/v1/take-quiz/?page=3"),
            "previous": openapi.Schema(type=openapi.TYPE_STRING, format="uri", example="http://127.0.0.1:8000/api/v1/take-quiz/?page=1"),
            "results": openapi.Schema(
                type=openapi.TYPE_ARRAY,
                items=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                        properties={
        "id": openapi.Schema(type=openapi.TYPE_INTEGER, example=1),
        "quiz": openapi.Schema(type=openapi.TYPE_INTEGER, example=2),
        "user": openapi.Schema(type=openapi.TYPE_INTEGER, example=4),
        "date": openapi.Schema(
            type=openapi.TYPE_STRING, 
            format="date-time", 
            example="2024-11-02T02:30:20Z"
        ),
        "answers": openapi.Schema(
            type=openapi.TYPE_ARRAY,
            items=openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={
                                "id": openapi.Schema(type=openapi.TYPE_INTEGER, example=1),
                                "take_quiz": openapi.Schema(type=openapi.TYPE_INTEGER, example=1),
                                "question": openapi.Schema(type=openapi.TYPE_INTEGER, example=6),
                                "answer": openapi.Schema(type=openapi.TYPE_INTEGER, example=22),
                                "is_hint_used": openapi.Schema(type=openapi.TYPE_BOOLEAN, example=False),
                            },
                            required=["id", "take_quiz", "question", "answer", "is_hint_used"],
                        ),
                    ),
                    "score": openapi.Schema(type=openapi.TYPE_INTEGER, example=0),
                    "correct_answer_count": openapi.Schema(type=openapi.TYPE_INTEGER, example=1),
                    "wrong_answer_count": openapi.Schema(type=openapi.TYPE_INTEGER, example=2),
                    "empty_answer_count": openapi.Schema(type=openapi.TYPE_INTEGER, example=0),
                },
                required=[
                    "id", "quiz", "user", "date", "answers", 
                    "score", "correct_answer_count", 
                    "wrong_answer_count", "empty_answer_count"
                ],

                ),
            ),
        },
        required=["count", "next", "previous", "results"],
    )

    # Updated Swagger schema for the list endpoint
    @swagger_auto_schema(
        operation_description="""Retrieve a list of all users' solutions for quizzes.
        **Example cURL Command:**
        ```bash
        curl -X 'GET' \
        'http://127.0.0.1:8000/api/v1/take-quiz/?page=1' \
        -H 'accept: application/json'
        ```
        """,
        responses={200: openapi.Response("List of quizzes", paginated_quiz_response), 400: "Bad Request", 404: "Not Found", 403: "Forbidden", 401: "Unauthorized", 405: "Method Not Allowed"},
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)


    @swagger_auto_schema(
        operation_description="""Solve a created quiz with valid quiz id, question id, and choice id.
        **Example cURL Command:**
        ```bash
        curl -X 'POST' \
        'http://127.0.0.1:8000/api/v1/take-quiz/' \
        -H 'accept: application/json' \
        -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMzNDkzMzA4LCJpYXQiOjE3MzI4ODg1MDgsImp0aSI6IjljODc5ZWUwYjVlNTQ5MmU4ODljYjhiOTU2NjQ5ZjNiIiwidXNlcl9pZCI6MjV9.KUGD2rWZbq2q46KxeflWcm4ypbw4uB6eprSwMZTXAgM' \
        -H 'Content-Type: application/json' \
        -d '{
        "quiz": 1,
        "answers": [
            {
            "question": 1,
            "answer": 2,
            "is_hint_used": false
            }
        ]
        }'
        ```""",
        request_body=example_request_body,
        responses={201: openapi.Response("Created quiz", example_response_body), 400: "Bad Request", 404: "Not Found", 403: "Forbidden", 401: "Unauthorized", 405: "Method Not Allowed"},
    )
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)
    
    @swagger_auto_schema(
        operation_description="""Retrieve a single quiz solution of a user by ID of the take quiz.
        ```bash
        curl -X 'GET' \
        'http://127.0.0.1:8000/api/v1/take-quiz/1/' \
        -H 'accept: application/json'

        ```""",
        responses={200: openapi.Response("Quiz details", example_response_body), 400: "Bad Request", 404: "Not Found", 403: "Forbidden", 401: "Unauthorized", 405: "Method Not Allowed"},
    )
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_description="""Update an existing quiz solution.
        ```bash	
        curl -X 'PUT' \
        'http://127.0.0.1:8000/api/v1/take-quiz/75/' \
        -H 'accept: application/json' \
        -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMzNDkzMzA4LCJpYXQiOjE3MzI4ODg1MDgsImp0aSI6IjljODc5ZWUwYjVlNTQ5MmU4ODljYjhiOTU2NjQ5ZjNiIiwidXNlcl9pZCI6MjV9.KUGD2rWZbq2q46KxeflWcm4ypbw4uB6eprSwMZTXAgM' \
        -H 'Content-Type: application/json' \
        -d '{
        "quiz": 1,
        "answers": [
            {
            "question": 1,
            "answer": 2,
            "is_hint_used": false
            }
        ]
        }'
        ```
        """,
        request_body=example_request_body,
        responses={200: openapi.Response("Updated quiz", example_response_body), 400: "Bad Request", 404: "Not Found", 403: "Forbidden", 401: "Unauthorized", 405: "Method Not Allowed"},
    )
    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_description="""Partially update an existing quiz solution.
        ```bash
        curl -X 'PATCH' \
        'http://127.0.0.1:8000/api/v1/take-quiz/75/' \
        -H 'accept: application/json' \
        -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMzNDkzMzA4LCJpYXQiOjE3MzI4ODg1MDgsImp0aSI6IjljODc5ZWUwYjVlNTQ5MmU4ODljYjhiOTU2NjQ5ZjNiIiwidXNlcl9pZCI6MjV9.KUGD2rWZbq2q46KxeflWcm4ypbw4uB6eprSwMZTXAgM' \
        -H 'Content-Type: application/json' \
        -d '{
        "quiz": 1,
        "answers": [
            {
            "question": 1,
            "answer": 2,
            "is_hint_used": false
            }
        ]
        }'
        ```""",
        request_body=example_request_body,
        responses={200: openapi.Response("Partially updated quiz", example_response_body), 400: "Bad Request", 404: "Not Found", 403: "Forbidden", 401: "Unauthorized", 405: "Method Not Allowed"},
    )
    def partial_update(self, request, *args, **kwargs):
        return super().partial_update(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_description="""Delete a quiz solution by ID.
        ```bash
        curl -X 'DELETE' \
  'http://127.0.0.1:8000/api/v1/take-quiz/75/' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMzNDkzMzA4LCJpYXQiOjE3MzI4ODg1MDgsImp0aSI6IjljODc5ZWUwYjVlNTQ5MmU4ODljYjhiOTU2NjQ5ZjNiIiwidXNlcl9pZCI6MjV9.KUGD2rWZbq2q46KxeflWcm4ypbw4uB6eprSwMZTXAgM'
        ```""",
        responses={204: "No Content", 400: "Bad Request", 404: "Not Found", 403: "Forbidden", 401: "Unauthorized", 405: "Method Not Allowed"},
    )
    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)


