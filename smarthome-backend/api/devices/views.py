from django.shortcuts import render
from rest_framework.serializers import Serializer
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Devices
from .serializers import DeviceSerializer
from location.models import SensorLocation
from rest_framework.permissions import IsAuthenticated


class DeviceViewset(viewsets.ViewSet):
    serializer_class = DeviceSerializer
    queryset = Devices.objects
    http_method_names = ["get", "post", "put", "delete"]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        location_ids = []
        queryset = Devices.objects.all()
        location_queryset = SensorLocation.objects.all()
        location_id = self.request.query_params.get("location_id", None)
        category = self.request.query_params.get("category", None)
        if location_id is not None:
            queryset = queryset.filter(location=location_id)
        elif category is not None:
            location_obj = location_queryset.filter(category=category)
            location_ids = [location.id for location in location_obj]
            queryset = queryset.filter(location__in=location_ids)

        return queryset

    def create(self, request):
        try:
            data = request.data.copy()
            location_obj = SensorLocation.objects.get(id=request.data["location_id"])
            data["location"] = location_obj.id
            print(request.user)
            data["created_by"] = request.user.id
            serialized = self.serializer_class(data=data)
            if serialized.is_valid():
                serialized.save()
                return Response(
                    {
                        "message": "Device created successfully",
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
            data = self.get_queryset()
            serializer = self.serializer_class(data, many=True)
            return Response(
                {
                    "message": "Devices fetched successfully",
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
            serializer = self.serializer_class(data)
            return Response(
                {
                    "message": "Device fetched successfully",
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
            obj = self.queryset.get(id=pk)
            data = request.data.copy()
            location_obj = SensorLocation.objects.get(id=request.data["location_id"])
            data["location"] = location_obj.id

            serialized = self.serializer_class(obj, data=data, partial=True)
            if serialized.is_valid():
                serialized.save()

                return Response(
                    {
                        "message": "Devices updated successfully",
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
                {
                    "Data": [],
                    "message": "Device deleted successfully",
                    "status": status.HTTP_200_OK,
                },
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            return Response(
                {"error": str(e), "status": status.HTTP_400_BAD_REQUEST},
                status=status.HTTP_400_BAD_REQUEST,
            )
