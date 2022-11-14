from django.urls import path

from .views import ActivateAccountView
from .views import LoginAPI
from .views import LogoutAPI
from .views import PasswordTokenCheckAPI
from .views import RefreshTokenView
from .views import RegisterAPI
from .views import RequestPasswordResetEmail
from .views import SetNewPasswordAPIView

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
    # path(
    #     "request-reset-email/",
    #     RequestPasswordResetEmail.as_view(),
    #     name="request-reset-email",
    # ),
    # path(
    #     "password-reset/<uidb64>/<token>/",
    #     PasswordTokenCheckAPI.as_view(),
    #     name="password-reset-confirm",
    # ),
    # path(
    #     "password-reset-complete",
    #     SetNewPasswordAPIView.as_view(),
    #     name="password-reset-complete",
    # ),
]
