from django.conf import settings
from django.db import models
from django.urls import reverse
from django.conf import settings
from .managers import FundraiserManager
from django.utils.translation import gettext_lazy as _

CATEGORY_NAMES = (
    ('help', 'Help Needed'),
    ('trending', 'Trending'),
    ('urgent', 'Urgent'),
)

class CategoryEnum(object):
    OTHERS =  'others'
    TRENDING = 'trending'
    URGENT =  'urgent'

class Category(models.Model):
    name = models.CharField(max_length=20, db_index=True, primary_key=True, choices=CATEGORY_NAMES, default=CategoryEnum.OTHERS)
    slug = models.SlugField(max_length=255, unique=True)

    class Meta:
        verbose_name_plural = "categories"

    def get_absolute_url(self):
        return reverse("catalogue:category_detail", args=[self.slug])

    def __str__(self):
        return self.name


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
    image = models.ImageField(upload_to="../../media/", default="default.png")
    slug = models.SlugField(max_length=255)
    tags = models.CharField(max_length=30, default="newest")
    fund_total = models.DecimalField(max_digits=1000, decimal_places=2)
    fund_remaining = models.DecimalField(max_digits=1000, decimal_places=2)
    funding_method = models.JSONField(
        verbose_name=_("funding_method"),
        help_text=_("Required"),
        max_length=255,
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
        return reverse("catalogue:fundraiser_detail", args=[self.slug])

    def __str__(self):
        return self.title