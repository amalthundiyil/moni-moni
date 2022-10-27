from django.contrib import admin
from django.conf import settings
from django.urls import path, include, re_path
from django.conf.urls.static import static
from django.shortcuts import render
from drf_yasg import openapi
from drf_yasg.views import get_schema_view as swagger_get_schema_view


def render_react(request):
    return render(request, "index.html")


schema_view = swagger_get_schema_view(
    openapi.Info(
        title="Moni Moni",
        default_version="1.0.0",
        description="API documentation of Moni Moni",
    ),
    public=True,
)


urlpatterns = [
    path("admin/", admin.site.urls),
    path(
        "swagger/",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="swagger-schema",
    ),
    path("api/v1/auth/", include("server.apps.users.authentication.urls")),
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

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
