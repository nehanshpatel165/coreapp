from rest_framework.routers import DefaultRouter
from devices import views
from django.urls import path

app_name = "devices"

urlpatterns = []

router = DefaultRouter(trailing_slash="/?")

router.register(r"devices", views.DeviceViewset, basename="devices")


urlpatterns += router.urls
