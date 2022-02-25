import json
from django.contrib import messages
from django.http import HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from orders.models import Order, OrderItem
from users.models import Address
from .models import FundingOptions
from store.serializers import FundraiserSerializer
from store.models import Fundraiser
from paypalcheckoutsdk.orders import OrdersGetRequest
from .paypal import PayPalClient
from rest_framework import generics, status, permissions
from rest_framework.response import Response
from .serializers import PaymentSelectionSerializer, FundingOptionSerializer


class FundingChoices(generics.GenericAPIView):
    serializer_class = FundingOptionSerializer
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def put(self, request, *args, **kwargs):
        funding_option = int(request.data["funding_option"])
        funding_type = FundingOptions.objects.get(id=funding_option)

        session = request.session
        if "purchase" not in request.session:
            session["purchase"] = {
                "funding_id": funding_type.id,
            }
        else:
            session["purchase"]["funding_id"] = funding_type.id
            session.modified = True

        response = JsonResponse(
            {
                "total": updated_total_price,
                "funding_price": funding_type.funding_price,
            }
        )
        return response

    def post(request):

        session = request.session
        if "purchase" not in request.session:
            messages.success(request, "Please select funding option")
            return HttpResponseRedirect(request.META["HTTP_REFERER"])

        addresses = Address.objects.filter(customer=request.user).order_by("-default")

        if "address" not in request.session:
            session["address"] = {"address_id": str(addresses[0].id)}
        else:
            session["address"]["address_id"] = str(addresses[0].id)
            session.modified = True

        return render(
            request, "checkout/funding_address.html", {"addresses": addresses}
        )


class PaymentSelection(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def post(self, request):

        session = request.session
        if "address" not in request.session:
            messages.success(request, "Please select address option")
            return HttpResponseRedirect(request.META["HTTP_REFERER"])

        return Response(status=status.HTTP_200_OK)


class PaymentComplete(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def post(self, request):
        PPClient = PayPalClient()
        body = json.loads(request.body)
        data = body["orderID"]
        user_id = request.user.id
        requestorder = OrdersGetRequest(data)
        response = PPClient.client.execute(requestorder)
        total_paid = response.result.purchase_units[0].amount.value
        order = Order.objects.create(
            user_id=user_id,
            full_name=response.result.purchase_units[0].shipping.name.full_name,
            email=response.result.payer.email_address,
            address1=response.result.purchase_units[0].shipping.address.address_line_1,
            address2=response.result.purchase_units[0].shipping.address.admin_area_2,
            postal_code=response.result.purchase_units[0].shipping.address.postal_code,
            country_code=response.result.purchase_units[
                0
            ].shipping.address.country_code,
            total_paid=response.result.purchase_units[0].amount.value,
            order_key=response.result.id,
            payment_option="paypal",
            billing_status=True,
        )
        order_id = order.pk
        OrderItem.objects.create(
            order_id=order_id,
            product=item["fundraiser"],
            price=item["fund_total"],
            quantity=item["qty"],
        )

        return Response(status=status.HTTP_200_OK)


class PaymentSuccessful(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def get(self, request):
        return Response(status=status.HTTP_200_OK)
