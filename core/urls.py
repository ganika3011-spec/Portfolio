from django.urls import path

from .api import ContactView, HealthView, ProfileView, SeedView

urlpatterns = [
    path("health/", HealthView.as_view(), name="health"),
    path("profile/", ProfileView.as_view(), name="profile"),
    path("contact/", ContactView.as_view(), name="contact"),
    path("seed/", SeedView.as_view(), name="seed"),
]
