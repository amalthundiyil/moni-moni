from django.db import models
from django.utils.translation import gettext_lazy as _
from server.apps.catalogue.models import Fundraiser


class FundingOptions(models.Model):
    fundraiser = models.ForeignKey(
        Fundraiser, related_name="fundraiser", on_delete=models.CASCADE
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


class PaymentSelections(models.Model):
    """
    Store payment options
    """

    name = models.CharField(
        verbose_name=_("name"),
        help_text=_("Required"),
        max_length=255,
    )

    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = _("Payment Selection")
        verbose_name_plural = _("Payment Selections")

    def __str__(self):
        return self.name
