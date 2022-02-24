import json
import os
import stripe
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from orders.views import payment_confirmation


class PaymentStart(generics.GenericAPIView):
    def post(self, request, *args, **kwargs):
        total = str(request.data["price"])
        total = total.replace(".", "")
        total = int(total)

        stripe.api_key = os.getenv("STRIPE_SECRET_KEY")
        intent = stripe.PaymentIntent.create(
            amount=total, currency="usd", metadata={"userid": request.user.id}
        )

        return Response(
            data={"client_secret": intent.client_secret}, status=status.HTTP_200_OK
        )


class PaymentProcessing(generics.GenericAPIView):
    def post(self, request):
        event = None
        payload = json.dumps(request.data)
        try:
            event = stripe.Event.construct_from(json.loads(payload), stripe.api_key)
        except ValueError as e:
            return Response(data=e, status=status.HTTP_400_BAD_REQUEST)

        if event and event.type == "payment_intent.succeeded":
            return payment_confirmation(event.data.object.client_secret)
        else:
            print(f"Unhandled event type {event.type}")

        return Response(status=status.HTTP_200_OK)


class PaymentCompleted(generics.GenericAPIView):
    def get(self, request):
        return Response(status=status.HTTP_200_OK)
