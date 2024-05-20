from rest_framework import serializers
from location.serializers import LoacationSerializer
from devices.serializers import DeviceSerializer


class SolarPanelSerializer(serializers.Serializer):

    device_name = serializers.CharField(max_length=100)
    data_source_id = serializers.CharField(max_length=100)
    installation_date = serializers.DateField()

    def to_representation(self, instance):

        # Retrieve the serialized data for the location field
        location_data = LoacationSerializer(instance.location).data
        # Merge location_data into the representation of the DevicesSerializer
        representation = super().to_representation(instance)
        representation["location"] = location_data["location_name"]
        representation["power_consumption"] = {
            "power": self.context["sensor_data"],
            "date": self.context["date"],
        }
        return representation


class DHT11Serializer(serializers.Serializer):

    device_name = serializers.CharField(max_length=100)
    type_of_device = serializers.CharField(max_length=100)
    data_source_id = serializers.CharField(max_length=100)
    installation_date = serializers.DateField()

    def to_representation(self, instance):

        # Retrieve the serialized data for the location field
        location_data = LoacationSerializer(instance.location).data
        # Merge location_data into the representation of the DevicesSerializer
        representation = super().to_representation(instance)
        representation["location"] = location_data
        representation["Data"] = {
            "temp": self.context["temp"],
            "hum": self.context["hum"],
        }
        return representation


class TokenRefreshSerializer(serializers.Serializer):

    refresh = serializers.CharField()
