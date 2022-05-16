from django.urls import path
from .views import (
    RegisterAPI,
    LoginAPI,
    LogoutAPI,
    ActivateAccountView,
    SetNewPasswordAPIView,
    PasswordTokenCheckAPI,
    RequestPasswordResetEmail,
    RefreshTokenView
)

urlpatterns = [
    path("register/", RegisterAPI.as_view()),
    path("login/", LoginAPI.as_view()),
    path("logout/", LogoutAPI.as_view()),
    path("token/refresh/", RefreshTokenView.as_view(), name="token_refresh"),
    path(
        "activate/<uidb64>/<token>",
        ActivateAccountView.as_view(),
        name="activate",
    ),
    path(
        "request-reset-email/",
        RequestPasswordResetEmail.as_view(),
        name="request-reset-email",
    ),
    path(
        "password-reset/<uidb64>/<token>/",
        PasswordTokenCheckAPI.as_view(),
        name="password-reset-confirm",
    ),
    path(
        "password-reset-complete",
        SetNewPasswordAPIView.as_view(),
        name="password-reset-complete",
    ),
]
