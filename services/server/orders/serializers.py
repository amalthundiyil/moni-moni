from rest_framework import serializers
from .models import Order
from .models import OrderItem


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        # fields = (
        #     "id",
        #     "user",
        #     "full_name",
        #     "address1",
        #     "address2",
        #     "total_paid",
        #     "order_key",
        # )
        fields = "__all__"

    def create(self, validated_data):
        order = Order.objects.create(**validated_data)
        return order


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        # fields = ("order_id", "product", "price", "quantity")
        fields = "__all__"

    def create(self, validated_data):
        order_item = OrderItem.objects.create(**validated_data)

        return order_item
