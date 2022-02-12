from django.urls import path, include
from .auth import RegisterAPI, LoginAPI, UserAPI
from knox import views as knox_views

urlpatterns = [
    path("/", include("knox.urls")),
    path("register/", RegisterAPI.as_view()),
    path("login/", LoginAPI.as_view()),
    path("user/", UserAPI.as_view()),
    path("logout/", knox_views.LogoutView.as_view(), name="knox_logout"),
]
