import os
import uuid
from datetime import datetime

from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.db import models
from django.utils.translation import gettext_lazy as _
from django_countries.fields import CountryField
from rest_framework_simplejwt.tokens import RefreshToken

from .managers import CustomUserManager


class CustomUser(AbstractBaseUser, PermissionsMixin):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(_("email address"), unique=True)
    user_name = models.CharField(max_length=150, unique=True)
    password = models.CharField(max_length=100)
    first_name = models.CharField(max_length=150, blank=True)
    last_name = models.CharField(max_length=150, blank=True)
    about = models.TextField(_("about"), max_length=500, blank=True)
    phone_number = models.CharField(_("mobile"), null=True, max_length=20, blank=True)
    date_of_birth = models.DateTimeField(null=True, blank=True)
    is_verified = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["user_name"]

    objects = CustomUserManager()

    def tokens(self):
        token = RefreshToken.for_user(self)
        return {"refresh": str(token), "access": str(token.access_token)}

    @classmethod
    def get_default(cls):
        user, created = cls.objects.get_or_create(
            email=os.getenv("EMAIL_HOST_USER"),
            defaults=dict(
                password=os.getenv("EMAIL_HOST_PASSWORD"),
                first_name="Moni",
                last_name="Moni",
                is_superuser=True,
                is_verified=True,
                created=datetime.now(),
                updated=datetime.now(),
            ),
        )
        return user.pk

    def __str__(self):
        return self.email

    class Meta:
        verbose_name_plural = "Users"
        ordering = ("email", "updated")


class Address(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        CustomUser, verbose_name=_("User"), on_delete=models.CASCADE
    )
    full_name = models.CharField(_("Full Name"), max_length=150, blank=False)
    country = CountryField(blank_label="(select country)", blank=False)
    postcode = models.CharField(max_length=12, blank=False)
    address_line_1 = models.CharField(max_length=150, blank=False)
    address_line_2 = models.CharField(max_length=150, blank=True)
    town_city = models.CharField(max_length=150, blank=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Addresses"

    def __str__(self):
        return "Address"
