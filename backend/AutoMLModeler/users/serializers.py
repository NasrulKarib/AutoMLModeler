from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from .models import User  # Or use from django.contrib.auth.models import User if using the default model

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'created_at']

   