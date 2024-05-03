import datetime
from django.shortcuts import render
from .serializers import SolarPanelSerializer
from rest_framework import viewsets, status
from rest_framework.response import Response
from devices.models import Devices
from rest_framework.permissions import IsAuthenticated
import pyrebase

config = {
    "apiKey": "AIzaSyC068zjRaaKmePnSe-QSpRSbrt1zPzpt-I",
    "authDomain": "smarthome-db-ea412.firebaseapp.com",
    "projectId": "smarthome-db-ea412",
    "storageBucket": "smarthome-db-ea412.appspot.com",
    "messagingSenderId": "387205056346",
    "appId": "1:387205056346:web:3493e659560b1958769563",
    "databaseURL": "https://smarthome-db-ea412-default-rtdb.firebaseio.com/",
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
