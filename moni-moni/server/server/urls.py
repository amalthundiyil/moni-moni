from django.contrib import admin
from django.conf import settings
from django.urls import path, include, re_path
from django.conf.urls.static import static
from django.shortcuts import render


def render_react(request):
    return render(request, "index.html")


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/auth/", include("server.apps.users.authentication.urls")),
    path("api/v1/orders/", include("server.apps.orders.urls")),
    path("api/v1/users/", include("server.apps.users.urls")),
    path(
        "api/v1/catalogue/",
        include("server.apps.catalogue.urls", namespace="catalgoue"),
    ),
    path(
        "api/v1/checkout/", include("server.apps.checkout.urls", namespace="checkout")
    ),
    re_path(r"^$", render_react),
    re_path(r"^(?:.*)/?$", render_react),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
