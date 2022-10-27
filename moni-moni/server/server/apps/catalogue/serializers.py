from rest_framework import serializers
from server.apps.users.models import CustomUser
from .models import Fundraiser, Category
from server.utils import unique_slug_generator


class FundraiserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fundraiser
        fields = "__all__"

    def validate(self, attrs):
        attrs["author"] = CustomUser.objects.get(id=self.context["request"].user.id)
        attrs["slug"] = unique_slug_generator(Fundraiser, self.context["request"].data)
        return super().validate(attrs)

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
