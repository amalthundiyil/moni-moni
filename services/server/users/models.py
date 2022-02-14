from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils.translation import gettext_lazy as _
from rest_framework_simplejwt.tokens import RefreshToken
from django_countries.fields import CountryField


from .managers import CustomUserManager


class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_("email address"), unique=True)
    user_name = models.CharField(max_length=150, unique=True)
    password = models.CharField(max_length=100)
    first_name = models.CharField(max_length=150, blank=True)
    last_name = models.CharField(max_length=150, blank=True)
    about = models.TextField(_("about"), max_length=500, blank=True)
    date_of_birth = models.DateTimeField(null=True, blank=True)
    # Delivery details
    country = CountryField(blank_label="(select country)")
    phone_number = models.CharField(max_length=15, blank=True)
    postcode = models.CharField(max_length=12, blank=True)
    address_line_1 = models.CharField(max_length=150, blank=True)
    address_line_2 = models.CharField(max_length=150, blank=True)
    town_city = models.CharField(max_length=150, blank=True)
    # User Status
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

    def __str__(self):
        return self.email

    class Meta:
        verbose_name_plural = "Users"
        ordering = ("email", "updated")
