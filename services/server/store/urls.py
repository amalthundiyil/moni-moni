from django.urls import path

from .views import CategoryAPI, ProductsAPI

app_name = "store"

urlpatterns = [
    path("products/", ProductsAPI.as_view(), name="product_all"),
    path("products/<slug:slug>/", ProductsAPI.as_view(), name="product_detail"),
    path("category/", CategoryAPI.as_view(), name="categories_all"),
    path(
        "category/<slug:category_slug>", CategoryAPI.as_view(), name="category_detail"
    ),
]
