from django.urls import path
from users.views import register, login, logout_user

urlpatterns = [
    path("register/", register, name="register"),
    path("login/", login, name="login"),
    path("logout/", logout_user, name="logout"),
]
