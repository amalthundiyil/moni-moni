import os

from django.conf.global_settings import AUTH_USER_MODEL as User
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.http import HttpResponsePermanentRedirect
from django.utils.encoding import DjangoUnicodeDecodeError
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode
from rest_framework import generics
from rest_framework import permissions
from rest_framework import status
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenRefreshView
from server.apps.users.models import CustomUser as User

from .serializers import LoginSerializer
from .serializers import LogoutSerializer
from .serializers import RefreshTokenSerializer
from .serializers import RegisterSerializer
from .serializers import ResetPasswordEmailRequestSerializer
from .serializers import SetNewPasswordSerializer
from .utils import Email
from .utils import TokenGenerator


class CustomRedirect(HttpResponsePermanentRedirect):
    allowed_schemes = [os.environ.get("APP_SCHEME"), "http", "https"]


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
        tokens = user.tokens()
        access_token = {"token": tokens["access"]}
        response = Response(access_token, status=status.HTTP_200_OK)
        response.set_cookie("x-refresh-token", tokens["refresh"])
        return response


class LogoutAPI(generics.GenericAPIView):
    serializer_class = LogoutSerializer
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(
            data={"refresh": request.COOKIES.get("x-refresh-token")}
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        res = Response(status=status.HTTP_204_NO_CONTENT)
        res.delete_cookie("x-refresh-token")
        return res


class ActivateAccountView(generics.GenericAPIView):
    def get(self, request, uidb64, token):
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except Exception as identifier:
            user = None
        generate_token = TokenGenerator()
        if user is not None and generate_token.check_token(user, token):
            user.is_verified = True
            user.save()
            return Response(
                {
                    "message": "Account activated successfully.",
                },
                status=status.HTTP_200_OK,
            )
        return Response(
            {
                "message": "Account activation failed.",
            },
            status=status.HTTP_400_BAD_REQUEST,
        )


class RequestPasswordResetEmail(generics.GenericAPIView):
    serializer_class = ResetPasswordEmailRequestSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        email = request.data.get("email", "")
        if not User.objects.filter(email=email).exists():
            return Response(
                {"message": "Couldn't find an account with that email address"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user = User.objects.get(email=email)
        send_email = Email.password_reset(request, user)
        send_email.start()
        return Response(
            {"message": "We have sent you a link to reset your password"},
            status=status.HTTP_200_OK,
        )


class PasswordTokenCheckAPI(generics.GenericAPIView):
    serializer_class = SetNewPasswordSerializer

    def get(self, request, uidb64, token):
        redirect_url = request.GET.get("redirect_url")
        try:
            id = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=id)
            generate_token = TokenGenerator()
            if user is not None and generate_token.check_token(user, token):
                if len(redirect_url) > 3:
                    return CustomRedirect(redirect_url + "?token_valid=False")
                else:
                    return CustomRedirect(
                        os.environ.get("FRONTEND_URL") + "?token_valid=False"
                    )

            if redirect_url and len(redirect_url) > 3:
                return CustomRedirect(
                    redirect_url
                    + "?token_valid=True&message=Credentials Valid&uidb64="
                    + uidb64
                    + "&token="
                    + token
                )
            else:
                return CustomRedirect(
                    os.environ.get("FRONTEND_URL") + "?token_valid=False"
                )

        except DjangoUnicodeDecodeError as identifier:
            try:
                if not PasswordResetTokenGenerator().check_token(user):
                    return CustomRedirect(redirect_url + "?token_valid=False")

            except UnboundLocalError as e:
                return Response(
                    {"message": "Token is not valid, please request a new one"},
                    status=status.HTTP_400_BAD_REQUEST,
                )


class SetNewPasswordAPIView(generics.GenericAPIView):
    serializer_class = SetNewPasswordSerializer

    def patch(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(
            {"success": True, "message": "Password reset success"},
            status=status.HTTP_200_OK,
        )


class RefreshTokenView(TokenRefreshView):
    serializer_class = RefreshTokenSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(
            data=request.data,
            context={"refresh": request.COOKIES.get("x-refresh-token")},
        )
        serializer.is_valid(raise_exception=True)
        access_token = {"token": serializer.validated_data.get("access")}
        response = Response(access_token, status=status.HTTP_200_OK)
        response.set_cookie("x-refresh-token", serializer.validated_data.get("refresh"))
        return response
