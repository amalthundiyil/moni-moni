from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .forms import UserChangeForm, UserCreationForm
from .models import CustomUser


class CustomUserAdmin(UserAdmin):
    add_form = UserCreationForm
    form = UserChangeForm
    model = CustomUser
    list_display = ("user_name", "email", "is_staff", "is_active", "is_verified")
    list_filter = ("user_name", "email", "is_staff", "is_active", "is_verified")
    fieldsets = (
        (None, {"fields": ("user_name", "email", "password")}),
        ("Permissions", {"fields": ("is_staff", "is_active", "is_verified")}),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "user_name",
                    "email",
                    "password1",
                    "password2",
                    "is_staff",
                    "is_active",
                    "is_verified",
                ),
            },
        ),
    )
    search_fields = ("email", "user_name")
    ordering = ("email",)


admin.site.register(CustomUser, CustomUserAdmin)
