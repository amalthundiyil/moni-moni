from django.db import models
from django.utils.translation import gettext_lazy as _
# from store.models import FundingChoices


class FundingOptions(models.Model):

    funding_name = models.CharField(
        verbose_name=_("funding_name"),
        help_text=_("Required"),
        max_length=255,
    )
    funding_price = models.DecimalField(
        verbose_name=_("funding price"),
        help_text=_("Required"),
        max_digits=1000,
        decimal_places=2,
    )
    # funding_method = models.CharField(
    #     choices=FundingChoices.choices,
    #     verbose_name=_("funding_method"),
    #     help_text=_("Required"),
    #     max_length=255,
    # )
    funding_timeframe = models.CharField(
        verbose_name=_("funding timeframe"),
        help_text=_("Required"),
        max_length=255,
    )
    funding_window = models.CharField(
        verbose_name=_("funding window"),
        help_text=_("Required"),
        max_length=255,
    )
    order = models.IntegerField(
        verbose_name=_("list order"), help_text=_("Required"), default=0
    )
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = _("Funding Option")
        verbose_name_plural = _("Funding Options")

    def __str__(self):
        return self.funding_name


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
