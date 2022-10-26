from .models import FundingOptions
from server.apps.catalogue.models import Fundraiser
from .models import Payment
from rest_framework import generics, status, permissions
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from .serializers import PaymentSerializer, FundingOptionSerializer


class FundingOptionsView(generics.GenericAPIView):
    serializer_class = FundingOptionSerializer
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def get(self, request, slug, *args, **kwargs):
        fd = get_object_or_404(Fundraiser, slug=slug, is_active=True)
        fo = FundingOptions.objects.filter(fundraiser=fd.pk)
        serializer = self.get_serializer(fo, many=True, context={"id": request.user.id})
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def put(self, request, *args, **kwargs):
        funding_option = get_object_or_404(FundingOptions, id=request.data["id"])
        serializer = FundingOptionSerializer(
            funding_option,
            data=request.data,
            partial=True,
            context={"id": request.user.id},
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {"message": "Funding option updated sucessfully"}, status=status.HTTP_200_OK
        )

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(
            data=request.data, context={"id": request.user.id}
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {"message": "Funding option created successfully"},
            status=status.HTTP_201_CREATED,
        )

    def delete(self, request, slug, *args, **kwargs):
        funding_option = get_object_or_404(FundingOptions, id=slug)
        serializer = FundingOptionSerializer(
            funding_option,
            data={"fundraiser": funding_option.fundraiser.pk},
            partial=True,
            context={"id": request.user.id},
        )
        serializer.is_valid(raise_exception=True)
        funding_option.delete()
        return Response(
            status=status.HTTP_204_NO_CONTENT,
        )


class PaymentView(generics.GenericAPIView):
    serializer_class = PaymentSerializer
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def get(self, request, *args, **kwargs):
        if request.GET.get("type") == "deposits":
            payment = Payment.objects.filter(user=request.user.id)
            payment = payment[: int(request.GET.get("limit", 0))]
        elif request.GET.get("type") == "credits":
            all_payments = Payment.objects.select_related("fundraiser").all()
            payment = []
            for p in all_payments:
                if p.fundraiser.author.id == request.user.id:
                    payment.append(p)
                    print(type(p))
            payment = payment[: int(request.GET.get("limit", 0))]
        else:
            payment = Payment.objects.filter(user=request.user.id)
        serializer = self.get_serializer(
            payment, many=True, context={"id": request.user.id}
        )
        # serializer.data["fundraiser_title"] = 
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(
            data=request.data, context={"id": request.user.id}
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(
            {"message": "Payment added successfully"},
            status=status.HTTP_201_CREATED,
        )

    def delete(self, request, id, *args, **kwargs):
        p = get_object_or_404(Payment, id=id)
        if p.user.id != request.user.id:
            return Response(
                {"message": "Can't delete payment of different user"},
                status=status.HTTP_401_UNAUTHORIZED,
            )
        p.delete()
        return Response(
            status=status.HTTP_204_NO_CONTENT,
        )
