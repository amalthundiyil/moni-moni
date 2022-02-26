from django.urls import path
from .views import UserAPI, AddressAPI, UpdateUserAPI

urlpatterns = [
    path("user/", UserAPI.as_view()),
    path("user/update/", UpdateUserAPI.as_view()),
    path("address/", AddressAPI.as_view()),
]
