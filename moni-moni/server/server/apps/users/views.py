from rest_framework import permissions, generics
from .serializers import AddressSerializer, UserSerializer, UpdateUserSerializer
from .models import Address, CustomUser
from rest_framework.views import Response
from rest_framework import status
from .forms import UserAddressForm, UserEditForm
from .models import Address, CustomUser
from django.shortcuts import get_object_or_404


class UserAPI(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer

    def get(self, request, *args, **kwargs):
        serializer = self.get_serializer(CustomUser.objects.get(id=request.user.id))
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, *args, **kwargs):
        user = CustomUser.objects.get(id=request.user.id)
        if not user:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, *args, **kwargs):
        address = get_object_or_404(CustomUser, id=request.user.id)
        serializer = UserSerializer(
            address, data=request.data, partial=True, context={"user": request.user.id}
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {"message": "User updated sucessfully"}, status=status.HTTP_200_OK
        )


class AddressAPI(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = AddressSerializer

    def get(self, request, *args, **kwargs):
        serializer = self.get_serializer(
            Address.objects.filter(user=request.user), many=True
        )
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(
            data=request.data, context={"user": request.user.id}
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {"message": "Address added successfully"},
            status=status.HTTP_201_CREATED,
        )

    def put(self, request, *args, **kwargs):
        address = get_object_or_404(Address, id=request.data["id"])
        serializer = AddressSerializer(
            address, data=request.data, partial=True, context={"user": request.user.id}
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {"message": "Address updated sucessfully"}, status=status.HTTP_200_OK
        )

    def delete(self, request, id, *args, **kwargs):
        address = get_object_or_404(Address, id=id)
        address.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
