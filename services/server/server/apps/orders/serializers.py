from rest_framework import serializers
from .models import Order
from .models import OrderItem


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = "__all__"

    def create(self, validated_data):
        order = Order.objects.create(**validated_data)
        return order


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = "__all__"

    def create(self, validated_data):
        order_item = OrderItem.objects.create(**validated_data)

        return order_item
