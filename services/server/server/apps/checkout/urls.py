from django.urls import path
from .views import FundingChoices, PaymentSelection, PaymentSuccessful, PaymentComplete

app_name = "checkout"

urlpatterns = [
    path("funding_choices/", FundingChoices.as_view(), name="fundingchoices"),
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
