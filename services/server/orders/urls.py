from django.urls import path
from .views import OrdersAPI


app_name = "orders"

urlpatterns = [
    path("", OrdersAPI.as_view(), name="add"),
    path("<int:id>/", OrdersAPI.as_view(), name="add"),
]
