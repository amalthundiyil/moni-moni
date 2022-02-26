from rest_framework import permissions, generics
from .serializers import AddressSerializer, UserSerializer, UpdateUserSerializer
from .models import Address, CustomUser
from rest_framework.views import Response
from rest_framework import status
from .forms import UserAddressForm, UserEditForm
from .models import Address, CustomUser


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

    def post(self, request):
        user_form = UserEditForm(instance=request.user, data=request.data)
        if user_form.is_valid():
            user_form.save()
            return Response(status=status.HTTP_200_OK)

        return Response(status=status.HTTP_400_BAD_REQUEST)


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

    def post(self, request):
        address_form = UserAddressForm(data=request.data)
        if address_form.is_valid():
            address_form = address_form.save(commit=False)
            address_form.user = request.user
            address_form.save()
            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        address = Address.objects.get(user=request.user)
        address_form = UserAddressForm(instance=address, data=request.data)
        if address_form.is_valid():
            address_form.save()
            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        address = Address.objects.filter(user=request.user).delete()
        return Response(status=status.HTTP_200_OK)
