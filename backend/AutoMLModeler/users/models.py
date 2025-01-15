from django.db import models

class User(models.Model):  # Use a capitalized class name
    username = models.CharField(max_length=100)  
    email = models.EmailField(max_length=255, unique=True)  
    password = models.CharField(max_length=255)  
    created_at = models.DateTimeField(auto_now_add=True)  # Automatically set when the object is created

    class Meta:
        db_table = 'users'  # Ensure Django uses the existing 'users' table

    def __str__(self):
        return self.username
