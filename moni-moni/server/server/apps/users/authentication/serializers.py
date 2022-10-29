from server.apps.users.models import CustomUser as User
from rest_framework import serializers
import jwt
from django.contrib.auth import authenticate
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from rest_framework.exceptions import AuthenticationFailed, ValidationError
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.conf import settings
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode
from rest_framework_simplejwt.backends import TokenBackend
from rest_framework_simplejwt.serializers import (
    TokenRefreshSerializer,
    TokenVerifySerializer,
)


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "user_name", "email", "password")
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        validated_data["is_active"] = True
        user = User.objects.create_user(
            validated_data["user_name"],
            validated_data["email"],
            validated_data["password"],
        )
        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if not user:
            raise serializers.ValidationError(
                "Incorrect Credentials. Please try again."
            )
        if not user.is_active:
            raise AuthenticationFailed(
                "Your account is disabled. Please contact the admin."
            )
        if not user.is_verified:
            raise AuthenticationFailed("Please verify your account.")

        return user


class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()

    default_error_messages = {"bad_token": "Token is invalid or expired."}

    def validate(self, attrs):
        self.token = attrs["refresh"]
        return super().validate(attrs)

    def save(self, **kwargs):
        try:
            RefreshToken(self.token).blacklist()
        except TokenError:
            self.fail("bad_token")


class ResetPasswordEmailRequestSerializer(serializers.Serializer):
    email = serializers.EmailField(min_length=2)

    redirect_url = serializers.CharField(max_length=500, required=False)

    class Meta:
        fields = ["email"]


class SetNewPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(min_length=6, max_length=68, write_only=True)
    token = serializers.CharField(min_length=1, write_only=True)
    uidb64 = serializers.CharField(min_length=1, write_only=True)

    class Meta:
        fields = ["password", "token", "uidb64"]

    def validate(self, attrs):
        try:
            password = attrs.get("password")
            token = attrs.get("token")
            uidb64 = attrs.get("uidb64")

            id = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=id)
            if not PasswordResetTokenGenerator().check_token(user, token):
                raise AuthenticationFailed("The reset link is invalid", 401)

            user.set_password(password)
            user.save()

            return user
        except Exception as e:
            raise AuthenticationFailed("The reset link is invalid", 401)


class RefreshTokenSerializer(TokenRefreshSerializer):
    refresh = serializers.CharField(required=False)

    def validate(self, attrs):
        attrs["refresh"] = self.context["refresh"]
        try:
            # valid_data = jwt.decode(
            #     attrs["refresh"],
            #     algorithms=[settings.SIMPLE_JWT["ALGORITHM"]],
            #     options={
            #         "verify_aud": False,
            #         "verify_signature": False,
            #     },
            # )
            # user = User.objects.get(id=valid_data["user_id"])
            res = super().validate(attrs)
        except Exception as e:
            raise ValidationError(e)
        return res
