from rest_framework import generics
from .serializers import UserSerializer
from rest_framework.response import Response
from rest_framework import status

# Create your views here.
class RegisterUserView(generics.CreateAPIView):
    serializer_class = UserSerializer

    def post(self, resquest, *args, **kwargs):
        serializer = self.get_serializer(data=resquest.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message":"User created sucessfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)