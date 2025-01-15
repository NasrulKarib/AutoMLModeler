from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import make_password, check_password
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserSerializer
from django.db import IntegrityError
from .models import User

class signupView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():
            try:
                # Hash the password before saving
                password = serializer.validated_data['password']
                hashed_password = make_password(password)
                serializer.validated_data['password'] = hashed_password

                # Save the new user to the database
                user = serializer.save()

                return Response({
                    "message": "User created successfully!",
                    "user": serializer.data
                }, status=status.HTTP_201_CREATED)
            
            except IntegrityError:
                return Response({
                    "message": "Email already exists.",
                }, status=status.HTTP_400_BAD_REQUEST)

        return Response({
            "message": "Invalid data",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        
        if not email or not password:
            return Response({
                "message": "Email and password are required."
            }, status=status.HTTP_400_BAD_REQUEST)

        try:
            #retrieve the user by email
            user = User.objects.get(email=email)
            
            #Check password
            if check_password(password, user.password):
                #Generate tokens
                refresh = RefreshToken.for_user(user)
                access_token = str(refresh.access_token)
                refresh_token = str(refresh)

                response =  Response({
                    "message": "Login successful",
                }, status=status.HTTP_200_OK)

                # Set the access and refresh tokens as cookies
                response.set_cookie(
                    key= "access_token",
                    value= access_token,
                    httponly= True, # Prevent JavaScript access
                    secure= True, # Send only over HTTPS
                    samesite= "Lax", #Limit cross-origin requests
                    max_age= 3600  # Expiry in seconds (1 days)
                )
                response.set_cookie(
                    key="refresh_token",
                    value=refresh_token,
                    httponly= True,
                    secure=True,
                    samesite= "Lax",
                    max_age=7 * 24 * 60 * 60  # Expiry in seconds (7 days)
                )

                return response
            else:
                return Response({
                    "message": "Invalid password"
                }, status=status.HTTP_401_UNAUTHORIZED)
        
        except User.DoesNotExist:
            return Response({
                "message": "User does not exist"
            }, status=status.HTTP_404_NOT_FOUND)
       