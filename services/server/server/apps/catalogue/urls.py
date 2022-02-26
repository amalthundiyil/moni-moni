from django.urls import path

from .views import CategoryAPI, FundraiserAPI

app_name = "catalogue"

urlpatterns = [
    path("fundraisers/", FundraiserAPI.as_view(), name="fundraiser_all"),
    path("fundraisers/<slug:slug>/", FundraiserAPI.as_view(), name="fundraiser_detail"),
    path("category/", CategoryAPI.as_view(), name="category_all"),
    path(
        "category/<slug:category_slug>", CategoryAPI.as_view(), name="category_detail"
    ),
]
