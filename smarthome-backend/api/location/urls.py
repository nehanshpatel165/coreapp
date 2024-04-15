from rest_framework.routers import DefaultRouter
from location import views
from django.urls import path

app_name = "locations"

urlpatterns = []

router = DefaultRouter(trailing_slash="/?")

router.register(r"location", views.LocationViewset, basename="location")


urlpatterns += router.urls
