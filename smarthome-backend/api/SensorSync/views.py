import datetime
from django.shortcuts import render
from .serializers import SolarPanelSerializer, DHT11Serializer
from rest_framework import viewsets, status
from rest_framework.response import Response
from devices.models import Devices
from rest_framework.permissions import IsAuthenticated
import pyrebase
from SensorSync.script import send_sms


config = {
    "apiKey": "AIzaSyAB7e3JcFE6630AmGdcxq2N7DL64qmsebo",
    "authDomain": "smarthome-e610f.firebaseapp.com",
    "databaseURL": "https://smarthome-e610f-default-rtdb.firebaseio.com",
    "projectId": "smarthome-e610f",
    "storageBucket": "smarthome-e610f.appspot.com",
    "messagingSenderId": "149729788130",
    "appId": "1:149729788130:web:bad61229bed7af55a29ebb",
    "measurementId": "G-E2VDWQ4Z55",
}

firebase = pyrebase.initialize_app(config)
authe = firebase.auth()
db = firebase.database()


# Create your views here.
class SolarPanelViewSet(viewsets.ModelViewSet):
    serializer_class = SolarPanelSerializer
    http_method_names = ["get"]
    permission_classes = [IsAuthenticated]

    def get_queryset(self, request):
        devices = Devices.objects.filter(created_by=request.user.id)
        queryset = devices.filter(type_of_device="Solar Panel")
        return queryset

    def list(self, request, format=None):
        try:
            solar = db.child("Data").child("Solar").get().val()
            date = datetime.datetime.now().date()
            data = self.get_queryset(request)
            serializer = self.serializer_class(
                data, many=True, context={"sensor_data": solar, "date": date}
            )
            return Response(
                {
                    "message": "Data fetched successfully",
                    "data": serializer.data,
                    "status": status.HTTP_200_OK,
                },
                status=status.HTTP_200_OK,
            )

        except Exception as e:
            return Response(
                {"error": str(e), "status": status.HTTP_400_BAD_REQUEST},
                status=status.HTTP_400_BAD_REQUEST,
            )


class DHT11ViewSet(viewsets.ModelViewSet):
    http_method_names = ["get"]
    permission_classes = [IsAuthenticated]
    serializer_class = DHT11Serializer

    def get_queryset(self, request):
        devices = Devices.objects.filter(created_by=request.user.id)
        dht11_devices = devices.filter(type_of_device="DHT11")

        location_id = self.request.query_params.get("location_id", None)
        if location_id is not None:
            queryset = dht11_devices.filter(location=location_id)
        return queryset

    def list(self, request, format=None):
        try:
            hum = db.child("test").child("humidity").get().val()
            temp = db.child("test").child("temperature").get().val()
            data = self.get_queryset(request)
            serializer = self.serializer_class(
                data, many=True, context={"temp": temp, "hum": hum}
            )
            return Response(
                {
                    "message": "Data fetched successfully",
                    "data": serializer.data,
                    "status": status.HTTP_200_OK,
                },
                status=status.HTTP_200_OK,
            )

        except Exception as e:
            return Response(
                {"error": str(e), "status": status.HTTP_400_BAD_REQUEST},
                status=status.HTTP_400_BAD_REQUEST,
            )


class SmsIntegrationViewSet(viewsets.ModelViewSet):
    http_method_names = ["post"]
    permission_classes = [IsAuthenticated]

    def create(self, request):
        phone = request.user.phone
        response = send_sms(phone, request)

        if response == 100:
            return Response(
                {"message": "SMS sent successfully", "status": status.HTTP_200_OK},
                status=status.HTTP_200_OK,
            )
        else:
            return Response(
                {
                    "message": "Something went wrong",
                    "status": status.HTTP_400_BAD_REQUEST,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
