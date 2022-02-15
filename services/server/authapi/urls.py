from django.urls import path
from .views import (
    RegisterAPI,
    LoginAPI,
    UserAPI,
    LogoutAPI,
    ActivateAccountView,
    SetNewPasswordAPIView,
    PasswordTokenCheckAPI,
    RequestPasswordResetEmail,
)

from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [
    path("register/", RegisterAPI.as_view()),
    path("login/", LoginAPI.as_view()),
    path("user/", UserAPI.as_view()),
    path("logout/", LogoutAPI.as_view()),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
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
