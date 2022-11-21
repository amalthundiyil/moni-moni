from django.urls import path

from .views import CategoryAPI
from .views import FundraiserAPI
from .views import FundraiserCatalogueView

app_name = "catalogue"

urlpatterns = [
    path(
        "fundraisers/all/<slug:slug>/",
        FundraiserCatalogueView.as_view(),
        name="fundraiser_catalogue_slug",
    ),
    path(
        "fundraisers/all/",
        FundraiserCatalogueView.as_view(),
        name="fundraiser_catalogue",
    ),
    path("fundraisers/<slug:slug>/", FundraiserAPI.as_view(), name="fundraiser_detail"),
    path("fundraisers/", FundraiserAPI.as_view(), name="fundraiser_all"),
    path("category/<slug:slug>/", CategoryAPI.as_view(), name="category_detail"),
    path("category/", CategoryAPI.as_view(), name="category_all"),
]
