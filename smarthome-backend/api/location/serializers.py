from rest_framework import serializers
from .models import SensorLocation


class LoacationSerializer(serializers.ModelSerializer):

    class Meta:
        model = SensorLocation
        fields = "__all__"
