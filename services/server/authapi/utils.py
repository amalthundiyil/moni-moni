from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.core.mail import EmailMessage
from django.contrib.sites.shortcuts import get_current_site
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from django.urls import reverse
import six
import threading


class TokenGenerator(PasswordResetTokenGenerator):
    def _make_hash_value(self, user, timestamp):
        return (
            six.text_type(user.pk)
            + six.text_type(timestamp)
            + six.text_type(user.is_active)
        )


class Email(threading.Thread):
    def __init__(self, email=None):
        self.email = email
        threading.Thread.__init__(self)

    def run(self):
        self.email.send(fail_silently=False)

    @classmethod
    def from_user(cls, request, user):
        current_site = get_current_site(request)
        print(current_site)
        generate_token = TokenGenerator()
        link = (
            "http://"
            + str(current_site)
            + reverse(
                "activate",
                kwargs={
                    "uidb64": urlsafe_base64_encode(force_bytes(user.pk)),
                    "token": generate_token.make_token(user),
                },
            )
        )
        email_subject = "Please activate your account"
        email_body = f"Hello {user.user_name}, We are very glad to have you here.\nClick here to complete the verification {link}"
        return cls(
            email=EmailMessage(
                email_subject,
                email_body,
                "noreply@semycolon.com",  # dummy email id
                [user.email],
            )
        )
