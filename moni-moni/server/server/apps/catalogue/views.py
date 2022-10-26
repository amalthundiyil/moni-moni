from django.shortcuts import get_object_or_404
from .models import Category, Fundraiser
from rest_framework import generics, permissions
from .serializers import FundraiserSerializer, CategorySerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import permission_classes
from server.utils import unique_slug_generator
from server.apps.users.models import CustomUser


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
        serializer = self.get_serializer(fundraiser)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    @permission_classes([permissions.IsAuthenticated])
    def delete(self, request):
        fd = Fundraiser.objects.filter(title=request.data["title"])
        if not fd.exists():
            return Response(
                data={"detail": "Fundraiser does not exist"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        fd.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    @permission_classes([permissions.IsAuthenticated])
    def post(self, request, slug=None, *args, **kwargs):
        if not request.user.is_authenticated:
            return Response(
                data={"detail": "Can't create a fundraiser"},
                status=status.HTTP_401_UNAUTHORIZED,
            )
        request.data["slug"] = unique_slug_generator(Fundraiser, request.data)
        request.data["author"] = request.user.id
        request.data["remaining_amount"] = request.data["total_amount"]
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            data=serializer.data,
            status=status.HTTP_201_CREATED,
        )

    @permission_classes([permissions.IsAuthenticated])
    def delete(self, request, slug=None, *args, **kwargs):
        f = get_object_or_404(Fundraiser, slug=slug)
        f.delete()
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
