from django.urls import path
from .views import UserAPI

urlpatterns = [
    path("user/", UserAPI.as_view()),
]
