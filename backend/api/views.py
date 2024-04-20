from rest_framework.response import Response
from rest_framework.decorators import api_view
from user.models import User
from .serializer import UserSerializer

@api_view(['GET'])
def getUsers(request):
    items = User.objects.all()
    serializer = UserSerializer(items, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def addUser(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['PUT'])
def updateUser(request, pk):
    item = User.objects.get(id=pk)
    serializer = UserSerializer(instance=item, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)