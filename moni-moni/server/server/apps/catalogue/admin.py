from django.contrib import admin

from .models import Category, Fundraiser


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ["name", "slug"]
    prepopulated_fields = {"slug": ("name",)}


@admin.register(Fundraiser)
class FundraiserAdmin(admin.ModelAdmin):
    list_display = [
        "title",
        "author",
        "slug",
        "total_amount",
        "created",
        "updated",
    ]
    list_filter = ["is_active"]
    list_editable = ["total_amount"]
    prepopulated_fields = {"slug": ("title",)}
