from rest_framework import serializers
from rest_framework import status
from rest_framework.exceptions import ValidationError
from server.apps.catalogue.models import Fundraiser
from server.apps.users.models import CustomUser

from .models import FundingOptions
from .models import Payment


class FundingOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = FundingOptions
        fields = "__all__"

    def validate(self, attrs):
        fundraisers = Fundraiser.objects.select_related("author")
        fr = []
        for fundraiser in fundraisers:
            if fundraiser.author.id == self.context["id"]:
                fr.append(fundraiser)

        if attrs["fundraiser"] not in fr:
            raise ValidationError(
                "Not authorized to edit that fundraiser", status.HTTP_401_UNAUTHORIZED
            )
        return super().validate(attrs)

    def create(self, validated_data):
        option = FundingOptions.objects.create(**validated_data)
        return option


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        exclude = ("user",)

    def validate(self, attrs):
        attrs["user"] = CustomUser.objects.get(id=self.context["id"])
        return super().validate(attrs)

    def create(self, validated_data):
        return Payment.objects.create(**validated_data)

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data["fundraiser_title"] = instance.fundraiser.title
        return data
