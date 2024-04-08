from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import (
    UserSerializer,
    UserLoginSerializer,
    UserProfileSerializer,
    UserChangePasswordSerializer,
)
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .renderers import UserRenderer
from rest_framework.permissions import IsAuthenticated


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    }


# Create your views here.
class UserRegisterViewset(APIView):

    def post(self, request):
        data = request.data
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            user = serializer.save()
            token = get_tokens_for_user(user)
            return Response(
                {
                    "message": "Registration Successful",
                    "Token": token,
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


from django.utils import timezone
from datetime import timedelta
from django.conf import settings
import jwt

# def generate_new_tokens(refresh_token):
#     try:
#         # Decode the refresh token to get the user_id and token expiration
#         payload = jwt.decode(refresh_token, settings.REFRESH_TOKEN_SECRET, algorithms=['HS256'])
#         user_id = payload.get('user_id')
#         token_exp = payload.get('exp')

#         # Check if the refresh token has expired
#         if timezone.now() >= timezone.datetime.fromtimestamp(token_exp):
#             # Refresh token has expired, return None
#             return None

#         # Get the user object
#         user = User.objects.get(id=user_id)

#         # Generate a new access token
#         access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRY)
#         access_token_payload = {
#             'user_id': str(user.id),
#             'exp': timezone.now() + access_token_expires,
#         }
#         access_token = jwt.encode(access_token_payload, settings.ACCESS_TOKEN_SECRET, algorithm='HS256')

#         # Generate a new refresh token
#         refresh_token_expires = timedelta(days=settings.REFRESH_TOKEN_EXPIRY)
#         refresh_token_payload = {
#             'user_id': str(user.id),
#             'exp': timezone.now() + refresh_token_expires,
#         }
#         refresh_token = jwt.encode(refresh_token_payload, settings.REFRESH_TOKEN_SECRET, algorithm='HS256')

#         return {
#             'access_token': access_token,
#             'refresh_token': refresh_token,
#         }

#     except Exception as e:
#         # Handle any exceptions that may occur
#         return None
