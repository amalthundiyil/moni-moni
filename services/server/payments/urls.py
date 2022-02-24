from django.urls import path
from .views import PaymentStart, PaymentProcessing, PaymentCompleted

app_name = "payment"

urlpatterns = [
    path("start/", PaymentStart.as_view(), name="payment_start"),
    path("processing/", PaymentProcessing.as_view(), name="payment_completed"),
    path("completed/", PaymentCompleted.as_view(), name="payment_processing"),
]
