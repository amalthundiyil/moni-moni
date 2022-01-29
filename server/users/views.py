from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import CustomUser
from .serializers import CustomUserSerializer
from rest_framework import status
import json
from django.contrib.auth.hashers import check_password
from django.http import HttpResponseRedirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout


@api_view(["POST"])
def register(request):
    serializer = CustomUserSerializer(data=json.loads(request.body.decode("utf-8")))
    if serializer.is_valid():
        serializer.save()
        return Response(
            data={
                "status": status.HTTP_201_CREATED,
                "message": "success",
                "data": {"msg": "Created Account Successfully."},
            }
        )

    return Response(
        data={
            "status": status.HTTP_400_BAD_REQUEST,
            "message": serializer.errors,
        }
    )


@api_view(["POST"])
def login(request):
    body = json.loads(request.body.decode("utf-8"))
    user = CustomUser.objects.filter(email=body.get("email")).first()
    if not user:
        return Response(
            data={
                "status": status.HTTP_400_BAD_REQUEST,
                "message": "failure",
                "data": {"msg": "No user with that email id"},
            }
        )

    is_password = check_password(body.get("password"), user.password)
    if not is_password:
        return Response(
            data={
                "status": status.HTTP_400_BAD_REQUEST,
                "message": "failure",
                "data": {"msg": "Incorrect password"},
            }
        )
    return HttpResponseRedirect("/api/v1/dashboard")


@api_view(["GET"])
def logout_user(request):
    logout(request)
    print(request.user)
    return Response(
        data={
            "status": status.HTTP_200_OK,
            "message": "success",
            "data": {"msg": "Logged out successfully"},
        }
    )
