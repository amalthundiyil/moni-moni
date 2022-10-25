import json
from django.contrib import messages
from django.http import HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from server.apps.orders.models import Order, OrderItem
from server.apps.users.models import Address
from .models import FundingOptions
from server.apps.catalogue.serializers import FundraiserSerializer
from server.apps.catalogue.models import Fundraiser
from paypalcheckoutsdk.orders import OrdersGetRequest
from .paypal import PayPalClient
from rest_framework import generics, status, permissions
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from .serializers import PaymentSelectionSerializer, FundingOptionSerializer


class FundingOptionsView(generics.GenericAPIView):
    serializer_class = FundingOptionSerializer
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def get(self, request, slug, *args, **kwargs):
        fd = get_object_or_404(Fundraiser, slug=slug, is_active=True)
        fo = FundingOptions.objects.filter(fundraiser=fd.pk)
        serializer = self.get_serializer(fo, many=True, context={"id": request.user.id})
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def put(self, request, *args, **kwargs):
        funding_option = get_object_or_404(FundingOptions, id=request.data["id"])
        serializer = FundingOptionSerializer(
            funding_option,
            data=request.data,
            partial=True,
            context={"id": request.user.id},
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {"message": "Funding option updated sucessfully"}, status=status.HTTP_200_OK
        )

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(
            data=request.data, context={"id": request.user.id}
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {"message": "Funding option created successfully"},
            status=status.HTTP_201_CREATED,
        )

    def delete(self, request, id, *args, **kwargs):
        funding_option = get_object_or_404(FundingOptions, id=id)
        serializer = FundingOptionSerializer(
            funding_option,
            data={"fundraiser": funding_option.fundraiser.pk},
            partial=True,
            context={"id": request.user.id},
        )
        serializer.is_valid(raise_exception=True)
        funding_option.delete()
        return Response(
            status=status.HTTP_204_NO_CONTENT,
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
            price=item["total_amount"],
            quantity=item["qty"],
        )

        return Response(status=status.HTTP_200_OK)


class PaymentSuccessful(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def get(self, request):
        return Response(status=status.HTTP_200_OK)
