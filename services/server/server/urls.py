from django.contrib import admin
from django.conf import settings
from django.urls import path, include
from django.conf.urls.static import static

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/orders/", include("orders.urls")),
    path("api/v1/auth/", include("authapi.urls")),
    path("api/v1/users/", include("users.urls")),
    path("api/v1/store/", include("store.urls", namespace="store")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
