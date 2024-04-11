from django.http import JsonResponse
from django.shortcuts import render
import pyrebase
from rest_framework.response import Response
from rest_framework import viewsets, status
from rest_framework.authentication import BasicAuthentication
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .models import SensorLocation
from .serializers import LoacationSerializer

# import firebase_admin
# from firebase_admin import credentials, firestore
from .models import SensorLocation

# from .firebase_client import FirebaseClient


# cred = credentials.Certificate(
#     r"C:\Users\Jay Taneja\OneDrive\Desktop\clg\projects\smarthomebackend\smart-home-dashboard-57894-firebase-adminsdk-u2hqm-b9e21c28df.json"
# )

# if not firebase_admin._apps:
#     firebase_admin.initialize_app(cred)
# db = firestore.client()
# docs = db.collection("smarthome_data").document()
# docu = db.collection("smarthome_data").stream()

config = {
    "apiKey": "AIzaSyC068zjRaaKmePnSe-QSpRSbrt1zPzpt-I",
    "authDomain": "smarthome-db-ea412.firebaseapp.com",
    "projectId": "smarthome-db-ea412",
    "storageBucket": "smarthome-db-ea412.appspot.com",
    "messagingSenderId": "387205056346",
    "appId": "1:387205056346:web:3493e659560b1958769563",
    "measurementId": "G-G7K46M3PD2",
}

# firebase = pyrebase.initialize_app(config)
# authe = firebase.auth()
# db = firebase.database()


# class Data(viewsets.ViewSet):
#     def list(self, request):
#         try:
#             humidity = db.child("Data").child("hum").get().val()
#             temp = db.child("Data").child("temp").get().val()
#             light = db.child("Data").child("light").get().val()

#             data = {"humidity": humidity, "temp": temp, "light": light}
#             return Response(
#                 {"Data": [data], "status": status.HTTP_200_OK},
#                 status=status.HTTP_200_OK,
#             )

#         except Exception as e:
#             return Response(
#                 {"error": str(e), "status": status.HTTP_400_BAD_REQUEST},
#                 status=status.HTTP_400_BAD_REQUEST,
#             )


class LocationViewset(viewsets.ViewSet):
    # client = FirebaseClient()
    serializer_class = LoacationSerializer
    queryset = SensorLocation.objects
    http_method_names = ["get", "post", "put", "delete"]
    # permission_classes = [IsAdminUser]

    def create(self, request):
        try:
            serialized = LoacationSerializer(data=request.data)
            if serialized.is_valid():
                serialized.save()
                # self.client.create(serialized.data)
                return Response(
                    {
                        "message": "Location created successfully",
                        "data": serialized.data,
                        "status": status.HTTP_201_CREATED,
                    },
                    status=status.HTTP_201_CREATED,
                )
            return Response(
                {"error": serialized.errors, "status": status.HTTP_400_BAD_REQUEST},
                status=status.HTTP_400_BAD_REQUEST,
            )
        except Exception as e:
            return Response(
                {"error": str(e), "status": status.HTTP_400_BAD_REQUEST},
                status=status.HTTP_400_BAD_REQUEST,
            )

    def list(self, request):
        try:
            data = self.queryset.all()
            serializer = LoacationSerializer(data, many=True)
            return Response(
                {
                    "message": "Location fetched successfully",
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

    def retrieve(self, request, pk=None):
        try:

            data = self.queryset.get(id=pk)
            serializer = LoacationSerializer(data)
            return Response(
                {
                    "message": "location fetched successfully",
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

    def update(self, request, pk=None):
        try:

            data = self.queryset.get(id=pk)
            serialized = LoacationSerializer(data, data=request.data, partial=True)
            if serialized.is_valid():
                serialized.save()
                # self.client.update(pk, serialized.data)
                return Response(
                    {
                        "message": "Location updated successfully",
                        "data": serialized.data,
                        "status": status.HTTP_201_CREATED,
                    },
                    status=status.HTTP_201_CREATED,
                )
            return Response(
                {"error": serialized.errors, "status": status.HTTP_400_BAD_REQUEST},
                status=status.HTTP_400_BAD_REQUEST,
            )
        except Exception as e:
            return Response(
                {"error": str(e), "status": status.HTTP_400_BAD_REQUEST},
                status=status.HTTP_400_BAD_REQUEST,
            )

    def destroy(self, request, pk=None):
        try:
            data = self.queryset.get(id=pk)
            data.delete()
            # doc_ref.delete()
            return Response(
                {
                    "Data": [],
                    "message": "Location deleted successfully",
                    "status": status.HTTP_200_OK,
                },
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            return Response(
                {"error": str(e), "status": status.HTTP_400_BAD_REQUEST},
                status=status.HTTP_400_BAD_REQUEST,
            )