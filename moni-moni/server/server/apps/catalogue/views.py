from django.shortcuts import get_object_or_404
from .models import Category, Fundraiser
from rest_framework import generics, permissions
from .serializers import FundraiserSerializer, CategorySerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import permission_classes
from server.apps.users.models import CustomUser
from rest_framework.parsers import MultiPartParser, FormParser


class FundraiserAPI(generics.GenericAPIView):
    serializer_class = FundraiserSerializer
    parser_classes = [MultiPartParser, FormParser]

    def get_queryset(self, request):
        serializer = self.get_serializer(Fundraiser.objects.filter(is_active=True), many=True, context={"request": request})
            
        return Response(
            data=serializer.data,
            status=status.HTTP_200_OK,
        )

    def get(self, request, slug=None, *args, **kwargs):
        if not slug:
            return self.get_queryset(request)
        fundraiser = get_object_or_404(Fundraiser, slug=slug, is_active=True)
        serializer = self.get_serializer(fundraiser, context={"request": request})
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    @permission_classes([permissions.IsAuthenticated])
    def post(self, request, slug=None, *args, **kwargs):
        serializer = self.get_serializer(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            data=serializer.data,
            status=status.HTTP_201_CREATED,
        )

    @permission_classes([permissions.IsAuthenticated])
    def put(self, request, slug=None, *args, **kwargs):
        fr = get_object_or_404(Fundraiser, id=request.data["id"])
        serializer = FundraiserSerializer(
            fr,
            data=request.data,
            context={"request": request},
            partial=True,
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {"message": "Fundraiser updated sucessfully"}, status=status.HTTP_200_OK
        )

    @permission_classes([permissions.IsAuthenticated])
    def delete(self, request, slug=None, *args, **kwargs):
        f = get_object_or_404(Fundraiser, slug=slug)
        serializer = FundraiserSerializer(
            f,
            data={"is_active": False},
            partial=True,
            context={"request": request},
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=status.HTTP_204_NO_CONTENT)


class CategoryAPI(generics.GenericAPIView):
    serializer_class = CategorySerializer

    def get_queryset(self, request=None, slug=None, *args, **kwargs):
        serializer = self.get_serializer(Category.objects.all(), many=True)
        return Response(
            data=serializer.data,
            status=status.HTTP_200_OK,
        )

    def get(self, request, slug=None, *args, **kwargs):
        if not slug:
            return self.get_queryset()

        category = get_object_or_404(Category, slug=slug)
        serializer = FundraiserSerializer(
            Fundraiser.objects.filter(category=category), many=True
        )
        return Response(
            data=serializer.data,
            status=status.HTTP_200_OK,
        )
