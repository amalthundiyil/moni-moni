from django.urls import path
from .views import (
    FundingOptionsView,
    PaymentView,
)

app_name = "checkout"

urlpatterns = [
    path(
        "funding-options/<int:id>/",
        FundingOptionsView.as_view(),
        name="fundingchoices_id",
    ),
    path(
        "funding-options/<slug:slug>/",
        FundingOptionsView.as_view(),
        name="fundingchoices_slug",
    ),
    path("funding-options/", FundingOptionsView.as_view(), name="fundingchoices"),
    path("payments/<str:id>/", PaymentView.as_view(), name="payment_id"),
    path("payments/", PaymentView.as_view(), name="payment"),
]
