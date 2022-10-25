from django.urls import path
from .views import (
    FundingOptionsView,
    PaymentSelection,
    PaymentSuccessful,
    PaymentComplete,
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
    path("payment_selection/", PaymentSelection.as_view(), name="payment_selection"),
    path("payment_complete/", PaymentComplete.as_view(), name="payment_successful"),
    path("payment_successful/", PaymentSuccessful.as_view(), name="payment_complete"),
    # path("address/", , name="delivery_address"),
    # path(
    #     "basket_update_delivery/",
    #     views.basket_update_delivery,
    #     name="basket_update_delivery",
    # ),
]
