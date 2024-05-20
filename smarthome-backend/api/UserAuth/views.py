from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import (
    UserSerializer,
    UserLoginSerializer,
    TokenRefreshSerializer,
    UserProfileSerializer,
    UserChangePasswordSerializer,
)
from SensorSync import script

from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .renderers import UserRenderer
from rest_framework.permissions import IsAuthenticated


# from time import time
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework.response import Response
from rest_framework import status


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    }


class CustomTokenRefreshView(APIView):

    def post(self, request, *args, **kwargs):
        try:
            serializer = TokenRefreshSerializer(data=request.data)
            if serializer.is_valid(raise_exception=True):
                refresh = RefreshToken(request.data["refresh"])
                user = request.user
                tokens = get_tokens_for_user(user)
                return Response(tokens, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class UserRegisterViewset(APIView):

    def post(self, request):
        data = request.data
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {
                    "message": "Registration Successful",
                    "status": status.HTTP_201_CREATED,
                },
                status=status.HTTP_201_CREATED,
            )
        return Response(
            {"error": serializer.errors, "status": status.HTTP_400_BAD_REQUEST},
            status=status.HTTP_400_BAD_REQUEST,
        )


class UserLoginViewSet(APIView):
    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():

            phone = serializer.data.get("phone")
            password = serializer.data.get("password")
            user = authenticate(phone=phone, password=password)

            if user is not None:
                token = get_tokens_for_user(user)
                return Response(
                    {
                        "message": "Login Successful",
                        "Token": token,
                        "status": status.HTTP_200_OK,
                    },
                    status=status.HTTP_200_OK,
                )
            return Response(
                {"error": "Invalid credentials", "status": status.HTTP_400_BAD_REQUEST},
                status=status.HTTP_400_BAD_REQUEST,
            )
        return Response(
            {"error": serializer.errors, "status": status.HTTP_400_BAD_REQUEST},
            status=status.HTTP_400_BAD_REQUEST,
        )


class UserProfileView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]

    def get(self, request):

        user = request.user
        serializer = UserProfileSerializer(user)
        return Response(serializer.data)

    def put(self, request):

        user = request.user
        serializer = UserProfileSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserChangePasswordView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        serializer = UserChangePasswordSerializer(
            data=request.data, context={"user": request.user}
        )
        serializer.is_valid(raise_exception=True)
        return Response(
            {"msg": "Password Changed Successfuly"}, status=status.HTTP_200_OK
        )


class UserGenerateOtpView(APIView):

    def post(self, request, format=None):
        response = script.send_otp(request)
        return Response(response)


class UserVerifyOtpView(APIView):

    def post(self, request, format=None):
        otp_id = request.data.get("otp_id")
        otp = request.data.get("otp")
        response = script.verify_otp(request, otp_id, otp)
        return Response(response)
