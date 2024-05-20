from rest_framework.routers import DefaultRouter
from . import views
from django.urls import path

app_name = "SensorSync"

urlpatterns = []

router = DefaultRouter(trailing_slash="/?")

router.register(r"solar-data", views.SolarPanelViewSet, basename="solar")
router.register(r"dht11-data", views.DHT11ViewSet, basename="dht11")
router.register(r"send-sms", views.SmsIntegrationViewSet, basename="sms")
router.register(
    r"get-dht11-location", views.LocationFilterDHT11, basename="dht11-location"
)


urlpatterns += router.urls
