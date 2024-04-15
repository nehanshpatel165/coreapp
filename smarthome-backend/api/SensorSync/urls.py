from rest_framework.routers import DefaultRouter
from . import views
from django.urls import path

app_name = "SensorSync"

urlpatterns = []

router = DefaultRouter(trailing_slash="/?")

router.register(r"solar-data", views.SolarPanelViewSet, basename="solar")


urlpatterns += router.urls
