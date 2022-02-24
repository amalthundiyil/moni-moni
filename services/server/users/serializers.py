from rest_framework import serializers
from .models import CustomUser as User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "user_name", "email")
