from .models import Order, OrderItem
from rest_framework import generics, permissions
from .serializers import OrderSerializer, OrderItemSerializer
from rest_framework.response import Response
from rest_framework import generics, status, permissions


class OrdersAPI(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def post(self, request):
        order_serializer = OrderSerializer(data=request.data)
        order_serializer.is_valid(raise_exception=True)
        order_serializer.save()
        request.data["order"] = order_serializer.data["id"]
        order_item_serializer = OrderItemSerializer(data=request.data)
        order_item_serializer.is_valid(raise_exception=True)
        order_item_serializer.save()
        return Response(data=order_item_serializer.data, status=status.HTTP_201_CREATED)


def payment_confirmation(data):
    Order.objects.filter(order_key=data).update(billing_status=True)


def user_orders(request):
    user_id = request.user.id
    orders = Order.objects.filter(user_id=user_id).filter(billing_status=True)
    return orders
