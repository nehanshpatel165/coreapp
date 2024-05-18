from rest_framework.routers import DefaultRouter
from . import views
from django.urls import path

app_name = "SensorSync"

urlpatterns = []

router = DefaultRouter(trailing_slash="/?")

router.register(r"solar-data", views.SolarPanelViewSet, basename="solar")
router.register(r"dht11-data", views.DHT11ViewSet, basename="dht11")
router.register(r"send-sms", views.SmsIntegrationViewSet, basename="sms")

urlpatterns += router.urls
