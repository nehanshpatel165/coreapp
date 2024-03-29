from django.db import models
from location.models import SensorLocation


class Devices(models.Model):
    device_name = models.TextField(max_length=100)
    type_of_device = models.TextField(max_length=100)
    model = models.TextField(blank=True, null=True, max_length=100)
    data_source_id = models.TextField(blank=True, null=True, max_length=100)
    desc = models.TextField(blank=True, null=True)
    location = models.ForeignKey(SensorLocation, on_delete=models.CASCADE)
