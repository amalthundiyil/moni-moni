from django.contrib import admin
from django.conf import settings
from django.urls import path, include
from django.conf.urls.static import static

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/auth/", include("server.apps.authentication.urls")),
    path("api/v1/orders/", include("server.apps.orders.urls")),
    path("api/v1/users/", include("server.apps.users.urls")),
    path(
        "api/v1/catalogue/",
        include("server.apps.catalogue.urls", namespace="catalgoue"),
    ),
    path(
        "api/v1/checkout/", include("server.apps.checkout.urls", namespace="checkout")
    ),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
