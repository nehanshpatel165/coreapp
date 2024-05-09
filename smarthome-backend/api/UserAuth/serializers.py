from .models import User
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={"input_type": "password"}, write_only=True)

    class Meta:
        model = User
        fields = ("name", "phone", "email", "password", "password2")
        extra_kwargs = {"password": {"write_only": True}}

    def validate(self, obj):
        password = obj.get("password")
        password2 = obj.get("password2")
        if password != password2:
            raise serializers.ValidationError("passwords do not match")
        return obj

    def create(self, validate_date):
        return User.objects.create_user(**validate_date)


class UserLoginSerializer(serializers.ModelSerializer):
    phone = serializers.CharField(max_length=10)

    class Meta:
        model = User
        fields = ("phone", "password")


class TokenRefreshSerializer(serializers.Serializer):

    refresh = serializers.CharField()


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "name", "phone", "email")


class UserChangePasswordSerializer(serializers.Serializer):
    password = serializers.CharField(
        max_length=255, style={"input_type": "password"}, write_only=True
    )
    password2 = serializers.CharField(
        max_length=255, style={"input_type": "password"}, write_only=True
    )

    class Meta:
        fields = ["password", "password2"]

    def validate(self, attrs):
        password = attrs.get("password")
        password2 = attrs.get("password2")
        user = self.context.get("user")
        if password != password2:
            raise serializers.ValidationError(
                "Password and Confirm Password doesn't match"
            )
        user.set_password(password)
        user.save()
        return attrs
