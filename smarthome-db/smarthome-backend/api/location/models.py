from django.db import models

# Create your models here.


class SensorLocation(models.Model):
    location_name = models.TextField(blank=True, null=True, max_length=100)
    level = models.IntegerField(blank=True, null=True)
    img_name = models.TextField(blank=True, null=True)

