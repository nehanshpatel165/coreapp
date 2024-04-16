from django.db import models
from location.models import SensorLocation
from UserAuth.models import User

device_choices = (
    ("Fan", "fan"),
    ("Lamp", "lamp"),
    ("AC", "AC"),
    ("Heater", "heater"),
    ("Solar Panel", "solar_panel"),
    ("Air Purifier", "air_purifier"),
    ("Others", "Others"),
)


class Devices(models.Model):
    device_name = models.TextField(max_length=100)
    type_of_device = models.TextField(
        max_length=100, choices=device_choices, default="Others"
    )
    model = models.TextField(blank=True, null=True, max_length=100)
    installation_date = models.DateField(blank=True, null=True)
    filter_type = models.TextField(blank=True, null=True, max_length=100)
    filter_change_interval = models.IntegerField(blank=True, null=True)
    last_filter_change_date = models.DateField(blank=True, null=True)
    data_source_id = models.TextField(blank=True, null=True, max_length=100)
    desc = models.TextField(blank=True, null=True)
    location = models.ForeignKey(SensorLocation, on_delete=models.CASCADE)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
