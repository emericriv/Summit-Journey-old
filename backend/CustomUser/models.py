from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class CustomUser(AbstractUser):
    zip_code = models.CharField(blank=True, max_length=5)
    city = models.CharField(blank=True, max_length=50)
    
    class Meta:
        verbose_name = 'Utilisateur'
    
    def __str__(self):
        return self.username