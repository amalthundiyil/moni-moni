from django.urls import path
from main import views

urlpatterns = [
    path("", views.dashboard, name="site-dashboard"),
]
