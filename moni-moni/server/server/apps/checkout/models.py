from django.db import models
from server.apps.users.models import CustomUser
from django.utils.translation import gettext_lazy as _
from server.apps.catalogue.models import Fundraiser
import uuid


class FundingOptions(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    fundraiser = models.ForeignKey(
        Fundraiser, related_name="fundraiser_options", on_delete=models.CASCADE
    )
    title = models.CharField(
        verbose_name=_("title"),
        help_text=_("Required"),
        max_length=255,
    )
    subheader = models.CharField(
        verbose_name=_("subheader"),
        max_length=255,
        blank=True,
        null=True,
    )
    description = models.CharField(
        verbose_name=_("description"),
        max_length=3000,
        blank=True,
        null=True,
    )
    price = models.DecimalField(
        verbose_name=_("price"),
        help_text=_("Required"),
        max_digits=1000,
        decimal_places=2,
    )
    preferred = models.BooleanField(default=False)

    class Meta:
        verbose_name = _("Funding Option")
        verbose_name_plural = _("Funding Options")

    def __str__(self):
        return self.title


class Payment(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    user = models.ForeignKey(
        CustomUser,
        on_delete=models.DO_NOTHING,
        related_name="payer",
    )
    fundraiser = models.ForeignKey(
        Fundraiser, related_name="fundraiser_payments", on_delete=models.DO_NOTHING
    )
    status = models.CharField(max_length=20)
    payer_email = models.EmailField()
    payee_email = models.EmailField()
    payer_id = models.CharField(max_length=100)
    payee_id = models.CharField(max_length=100)
    created_time = models.DateTimeField(auto_now_add=True)
    updated_time = models.DateTimeField(auto_now_add=True)
    currency_code = models.CharField(max_length=10)
    value = models.DecimalField(decimal_places=2, max_digits=1000)

    class Meta:
        verbose_name_plural = _("Payments")
        ordering = ("-created_time",)

    def __str__(self):
        return self.name
