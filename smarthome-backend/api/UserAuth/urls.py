from django.urls import path, include
from . import views

urlpatterns = [
    path("register-user", views.UserRegisterViewset.as_view(), name="register-user"),
    path("login-user", views.UserLoginViewSet.as_view(), name="login-user"),
    path("user-profile", views.UserProfileView.as_view(), name="user-profile"),
    path(
        "change-password",
        views.UserChangePasswordView.as_view(),
        name="change-password",
    ),
    path("token/refresh", views.CustomTokenRefreshView.as_view(), name="token_refresh"),
]
