from django.shortcuts import render
from rest_framework.serializers import Serializer
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Devices
from .serializers import DeviceSerializer
from location.models import SensorLocation


class DeviceViewset(viewsets.ViewSet):
    serializer_class = DeviceSerializer
    queryset = Devices.objects
    http_method_names = ["get", "post", "put", "delete"]

    def create(self, request):
        try:
            data = request.data.copy()
            location_obj = SensorLocation.objects.get(id=request.data["location_id"])
            data["location"] = location_obj.id
            serialized = DeviceSerializer(data=data)
            if serialized.is_valid():
                serialized.save()
                return Response(
                    {
                        "message": "success",
                        "data": serialized.data,
                        "status": status.HTTP_201_CREATED,
                    },
                    status=status.HTTP_201_CREATED,
                )
            return Response(
                {
                    "error": serialized.errors,
                    "status": status.HTTP_400_BAD_REQUEST,
                },
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
            serializer = DeviceSerializer(data, many=True)
            return Response(
                {
                    "message": "success",
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
            serializer = DeviceSerializer(data)
            return Response(
                {
                    "message": "success",
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
            serialized = DeviceSerializer(data, data=request.data, partial=True)
            if serialized.is_valid():
                serialized.save()

                return Response(
                    {
                        "message": "success",
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
            return Response(
                {"message": "success", "status": status.HTTP_200_OK},
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            return Response(
                {"error": str(e), "status": status.HTTP_400_BAD_REQUEST},
                status=status.HTTP_400_BAD_REQUEST,
            )
