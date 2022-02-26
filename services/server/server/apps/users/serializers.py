from rest_framework import serializers
from .models import Address, CustomUser as User


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


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = "__all__"

    def create(self, validated_data):
        return Address.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.full_name = validated_data.get("full_name", instance.full_name)
        instance.country = validated_data.get("country", instance.country)
        instance.phone_number = validated_data.get(
            "phone_number", instance.phone_number
        )
        instance.postcode = validated_data.get("postcode", instance.postcode)
        instance.address_line_1 = validated_data.get(
            "address_line_1", instance.address_line_1
        )
        instance.address_line_2 = validated_data.get(
            "address_line_2", instance.address_line_2
        )
        instance.town_city = validated_data.get("town_city", instance.town_city)
        instance.created = validated_data.get("created", instance.created)
        instance.updated = validated_data.get("created", instance.created)

        return instance
