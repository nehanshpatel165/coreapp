from django.db import models
from UserAuth.models import User

# Create your models here.
location_choices = (
    ("Living Room", "Living Room"),
    ("Dining Room", "Dining Room"),
    ("Hallway", "Hallway"),
    ("Garden", "Garden"),
    ("Office", "Office"),
    ("Bathroom", "Bathroom"),
    ("Bed Room", "Bed room"),
    ("Kitchen", "Kitchen"),
    ("Others", "Others"),
)


class SensorLocation(models.Model):
    location_name = models.TextField(blank=True, null=True, max_length=100)
    category = models.CharField(
        max_length=20, choices=location_choices, default="Others"
    )
    level = models.IntegerField(blank=True, null=True)
    img_name = models.TextField(blank=True, null=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
