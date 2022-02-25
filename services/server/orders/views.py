from .models import Order, OrderItem
from rest_framework import generics, permissions
from .serializers import OrderSerializer, OrderItemSerializer
from rest_framework.response import Response
from rest_framework import generics, status, permissions, viewsets


class OrdersAPI(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def get(self, request, order_status):
        user_id = request.user.id
        if order_status == "success":
            serializer = OrderSerializer(
                Order.objects.filter(user=user_id, billing_status=True), many=True
            )
        elif order_status == "failed":
            serializer = OrderSerializer(
                Order.objects.filter(user=user_id, billing_status=False), many=True
            )
        else:
            serializer = OrderSerializer(Order.objects.filter(user=user_id), many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def post(self, request, order_status=None):
        order_serializer = OrderSerializer(data=request.data)
        order_serializer.is_valid(raise_exception=True)
        order_serializer.save()
        request.data["order"] = order_serializer.data["id"]
        order_item_serializer = OrderItemSerializer(data=request.data)
        order_item_serializer.is_valid(raise_exception=True)
        order_item_serializer.save()
        return Response(
            data=[order_serializer.data, order_item_serializer.data],
            status=status.HTTP_201_CREATED,
        )


def payment_confirmation(data):
    Order.objects.filter(order_key=data).update(billing_status=True)
