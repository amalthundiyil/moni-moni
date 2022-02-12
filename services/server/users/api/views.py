from lib2to3.pgen2.tokenize import TokenError
from .serializers import (
    CustomUserSerializer,
    RegisterSerializer,
    LoginSerializer,
    LogoutSerializer,
)
from ..models import CustomUser
from rest_framework import status
from rest_framework import generics, permissions
from rest_framework.response import Response
from django.core.mail import EmailMessage
from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string
from django.utils.encoding import force_bytes, force_str, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from .utils import TokenGenerator, Email


class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token = user.tokens()
        send_email = Email.from_user(request, user)
        send_email.start()
        return Response(token)


class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        token = user.tokens()
        return Response(token)


class LogoutAPI(generics.GenericAPIView):
    serializer_class = LogoutSerializer
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=status.HTTP_204_NO_CONTENT)


class UserAPI(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = CustomUserSerializer

    def get_object(self):
        return self.request.user


class ActivateAccountView(generics.GenericAPIView):
    def get(self, request, uidb64, token):
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = CustomUser.objects.get(pk=uid)
        except Exception as identifier:
            user = None
        generate_token = TokenGenerator()
        if user is not None and generate_token.check_token(user, token):
            user.is_verified = True
            user.save()
            return Response(
                {"msg": "Account activated successfully.", "status": status.HTTP_200_OK}
            )
        return Response(
            {
                "msg": "Account activation failed.",
                "status": status.HTTP_401_UNAUTHORIZED,
            }
        )
