from django.shortcuts import get_object_or_404
from .models import Category, Fundraiser
from rest_framework import generics, permissions
from .serializers import FundraiserSerializer, CategorySerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import permission_classes
from server.utils import unique_slug_generator


class FundraiserAPI(generics.GenericAPIView):
    serializer_class = FundraiserSerializer

    def get_queryset(self):
        serializer = self.get_serializer(Fundraiser.objects.all(), many=True)
        return Response(
            data=serializer.data,
            status=status.HTTP_200_OK,
        )

    def get(self, request, slug=None, *args, **kwargs):
        if not slug:
            return self.get_queryset()
        fundraiser = get_object_or_404(Fundraiser, slug=slug, is_active=True)
        return Response(data=fundraiser, status=status.HTTP_200_OK)

    @permission_classes([permissions.IsAuthenticated])
    def post(self, request, slug=None, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            data=serializer.data,
            status=status.HTTP_201_CREATED,
        )


class CategoryAPI(generics.GenericAPIView):
    serializer_class = CategorySerializer

    def get_queryset(self):
        serializer = self.get_serializer(Category.objects.all(), many=True)
        return Response(
            data=serializer.data,
            status=status.HTTP_200_OK,
        )

    def get(self, request, category_slug=None):
        if not category_slug:
            return self.get_queryset()

        category = get_object_or_404(Category, slug=category_slug)
        serializer = FundraiserSerializer(
            Fundraiser.objects.filter(category=category), many=True
        )
        return Response(
            data=serializer.data,
            status=status.HTTP_200_OK,
        )

    @permission_classes([permissions.IsAuthenticated])
    def post(self, request, category_slug=None, *args, **kwargs):
        request.data["slug"] = unique_slug_generator(Category, request.data)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            data=serializer.data,
            status=status.HTTP_201_CREATED,
        )
