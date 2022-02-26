from rest_framework import serializers
from .models import Fundraiser, Category


class FundraiserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fundraiser
        fields = "__all__"

    def create(self, validated_data):
        fundraiser = Fundraiser.objects.create(**validated_data)
        return fundraiser


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"

    def create(self, validated_data):
        category = Category.objects.create(**validated_data)
        return category
