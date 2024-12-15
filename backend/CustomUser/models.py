from ClimbingGymLocations.models import ClimbingGymLocations
from django.contrib.auth.models import AbstractUser
from django.db import models


# Create your models here.
class CustomUser(AbstractUser):
    zip_code = models.CharField(blank=True, max_length=5)
    city = models.CharField(blank=True, max_length=50)
    favorite_climbing_gym = models.ForeignKey(
        ClimbingGymLocations, on_delete=models.SET_NULL, null=True, blank=True
    )

    class Meta:
        verbose_name = "Utilisateur"

    def __str__(self):
        return self.username
