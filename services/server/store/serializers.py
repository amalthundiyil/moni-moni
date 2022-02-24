from rest_framework import serializers
from .models import Product, Category
from server.utils import unique_slug_generator


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"

    def create(self, validated_data):
        product = Product.objects.create(**validated_data)
        return product


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"

    def create(self, validated_data):
        category = Category.objects.create(**validated_data)
        return category
