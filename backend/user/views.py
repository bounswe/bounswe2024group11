from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import User
from .serializer import UserSerializer
from rest_framework import status
from rest_framework.authtoken.models import Token
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

# Create your views here.
@swagger_auto_schema(
    method='post',
    operation_description="Register a user with a unique username, a unique email, a password and full name.",
    operation_summary="register a user",
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'username': openapi.Schema(type=openapi.TYPE_STRING),
            'email': openapi.Schema(type=openapi.TYPE_STRING),
            'password': openapi.Schema(type=openapi.TYPE_STRING),
            'fullname': openapi.Schema(type=openapi.TYPE_STRING) 
        },
        required=['username', 'email', 'password', 'fullname']
    ),    responses={
        201: "Created",
        400: "Missing required fields or nonunique username/email"
    },
    operation_id='signup',
)
@api_view(['POST'])
def register(request):
    required_fields = ['username', 'password', 'email', 'fullname']
    if not all([field in request.data for field in required_fields]):
        return Response({"error":"Please provide all required fields."}, status=status.HTTP_400_BAD_REQUEST)
    
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        user = User.objects.get(username=request.data['username'])
        user.set_password(request.data['password'])
        user.save()
        token = Token.objects.create(user=user)
        return Response({"token": token.key, "user": serializer.data}, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@swagger_auto_schema(
    method='post',
    operation_description="Login with a username and a password.",
    operation_summary="login",
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'username': openapi.Schema(type=openapi.TYPE_STRING),
            'password': openapi.Schema(type=openapi.TYPE_STRING)    
        },
        required=['username', 'password']
    ),

    responses={
        200: "Success",
        400: "Missing required fields",
        401: "Unauthorized, wrong username or password"
    },
    operation_id='login'
)
@api_view(['POST'])
def login(request):
    required_fields = ['username', 'password']
    if not all([field in request.data for field in required_fields]):
        return Response({"error":"Please provide both username and password."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.get(username=request.data['username'])
    except User.DoesNotExist:
        return Response({"error": "Username not found."}, status=status.HTTP_401_UNAUTHORIZED)

    if not user.check_password(request.data['password']):
        return Response({"error":"password does not match."}, status=status.HTTP_401_UNAUTHORIZED)
    token, created = Token.objects.get_or_create(user=user)
    serializer = UserSerializer(instance=user)
    return Response({"token": token.key, "user": serializer.data}, status=status.HTTP_200_OK)

@api_view(['POST'])
def test_token(request):
    required_fields = ['token']
    if not all([field in request.data for field in required_fields]):
        return Response({"error":"Please provide a token."}, status=status.HTTP_400_BAD_REQUEST)
    try:
        token = Token.objects.get(key=request.data['token'])
        return Response({"user": UserSerializer(token.user).data}, status=status.HTTP_200_OK)
    except Token.DoesNotExist:
        return Response({"error":"Token not found."}, status=status.HTTP_401_UNAUTHORIZED)