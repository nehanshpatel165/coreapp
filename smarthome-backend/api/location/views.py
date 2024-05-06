from rest_framework.response import Response
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from .models import SensorLocation
from .serializers import LoacationSerializer


from .models import SensorLocation


class LocationViewset(viewsets.ViewSet):

    serializer_class = LoacationSerializer
    queryset = SensorLocation.objects
    http_method_names = ["get", "post", "put", "delete"]
    permission_classes = [IsAuthenticated]

    def get_queryset(self, request):
        queryset = SensorLocation.objects.filter(created_by=request.user.id)
        return queryset

    def create(self, request):
        try:
            data = request.data.copy()
            data["created_by"] = request.user.id
            serialized = self.serializer_class(data=data)
            if serialized.is_valid():
                serialized.save()

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
            data = self.get_queryset(request)
            serializer = self.serializer_class(data, many=True)
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
            serializer = self.serializer_class(data)
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
            serialized = self.serializer_class(data, data=request.data, partial=True)
            if serialized.is_valid():
                serialized.save()

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
