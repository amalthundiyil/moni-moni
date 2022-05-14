from rest_framework import serializers
from .models import FundingOptions, PaymentSelections


class FundingOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = FundingOptions
        fields = "__all__"

    def create(self, validated_data):
        option = FundingOptions.objects.create(**validated_data)
        return option


class PaymentSelectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentSelections
        fields = "__all__"

    def create(self, validated_data):
        selection = PaymentSelections.objects.create(**validated_data)
        return selection
