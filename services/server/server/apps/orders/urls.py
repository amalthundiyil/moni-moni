from django.urls import path
from .views import OrdersAPI


app_name = "orders"

urlpatterns = [
    path("<str:order_status>/", OrdersAPI.as_view(), name="all"),
    path("<int:id>/", OrdersAPI.as_view(), name="add"),
]
