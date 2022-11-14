from django_countries.serializers import CountryFieldMixin
from rest_framework import serializers

from .models import Address
from .models import CustomUser as User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ("password",)


class UpdateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = (
            "email",
            "user_name",
            "password",
        )

    def update(self, instance, validated_data):
        instance.first_name = validated_data.get("first_name", instance.first_name)
        instance.last_name = validated_data.get("last_name", instance.last_name)
        instance.about = validated_data.get("about", instance.about)
        instance.phone_number = validated_data.get(
            "phone_number", instance.phone_number
        )
        instance.date_of_birth = validated_data.get(
            "date_of_birth", instance.date_of_birth
        )


class AddressSerializer(CountryFieldMixin, serializers.ModelSerializer):
    class Meta:
        model = Address
        exclude = ("user",)

    def create(self, validated_data):
        validated_data["user"] = User.objects.get(id=self.context.get("user"))
        return Address.objects.create(**validated_data)
