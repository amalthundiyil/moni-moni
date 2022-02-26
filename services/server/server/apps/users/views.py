from rest_framework import permissions, generics
from .serializers import AddressSerializer, UserSerializer, UpdateUserSerializer
from .models import Address, CustomUser
from rest_framework.views import Response
from rest_framework import status


class UserAPI(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer

    def get(self, request, *args, **kwargs):
        serializer = self.get_serializer(
            CustomUser.objects.filter(id=request.user.id).first()
        )
        return Response(data=serializer.data, status=status.HTTP_204_NO_CONTENT)

    def delete(self, request, *args, **kwargs):
        user = CustomUser.objects.get(id=request.user.id)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(data=serializer.data, status=status.HTTP_200_OK)


class UpdateUserAPI(generics.UpdateAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UpdateUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(data=serializer.data, status=status.HTTP_200_OK)


class AddressAPI(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = AddressSerializer

    def get(self, request, *args, **kwargs):
        serializer = self.get_serializer(
            Address.objects.filter(user=request.user), many=True
        )
        return Response(data=serializer.data, status=status.HTTP_204_NO_CONTENT)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(data=serializer.data, status=status.HTTP_201_CREATED)

    def put(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def delete(self, request):
        address = Address.objects.filter(user=request.user).delete()
        return Response(status=status.HTTP_200_OK)
