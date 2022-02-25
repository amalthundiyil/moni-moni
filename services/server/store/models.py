from django.conf import settings
from django.db import models
from django.urls import reverse
from .managers import FundraiserManager
from django.utils.translation import gettext_lazy as _


class Category(models.Model):
    name = models.CharField(max_length=255, db_index=True)
    slug = models.SlugField(max_length=255, unique=True)

    class Meta:
        verbose_name_plural = "categories"

    def get_absolute_url(self):
        return reverse("store:category_detail", args=[self.slug])

    def __str__(self):
        return self.name


class FundingChoices(models.TextChoices):
    DONATE = "FD", _("Donate funds")
    FUND_WITH_REWARDS = "FI", _("Fund with Rewards")
    FUND_WITH_BLOCKCHAIN = "FB", _("Fund with Blockhain")


class Fundraiser(models.Model):
    category = models.ForeignKey(
        Category, related_name="fundraiser", on_delete=models.CASCADE
    )
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="fundraiser_creator",
    )
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255, default="admin")
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to="images/", default="images/default.png")
    slug = models.SlugField(max_length=255)
    tags = models.CharField(max_length=30, default="newest")
    fund_total = models.DecimalField(max_digits=1000, decimal_places=2)
    fund_remaining = models.DecimalField(max_digits=1000, decimal_places=2)
    funding_method = models.CharField(
        choices=FundingChoices.choices,
        verbose_name=_("funding_method"),
        help_text=_("Required"),
        max_length=255,
    )
    funding_description = models.TextField(
        verbose_name=_("funding_description"),
        help_text=_("Required"),
    )
    is_active = models.BooleanField(default=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    objects = models.Manager()
    fundraisers = FundraiserManager()

    class Meta:
        verbose_name_plural = "fundraisers"
        ordering = ("-created",)

    def get_absolute_url(self):
        return reverse("store:fundraiser_detail", args=[self.slug])

    def __str__(self):
        return self.title
