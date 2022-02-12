from django.urls import path
from .views import RegisterAPI, LoginAPI, UserAPI, LogoutAPI

urlpatterns = [
    path("register/", RegisterAPI.as_view()),
    path("login/", LoginAPI.as_view()),
    path("user/", UserAPI.as_view()),
    path("logout/", LogoutAPI.as_view()),
]
