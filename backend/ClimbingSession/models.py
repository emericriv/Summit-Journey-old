from django.db import models
from django.utils import timezone

from CustomUser.models import CustomUser
from ClimbingGymLocations.models import ClimbingGymLocations

class ClimbingSession(models.Model):
    
    class LocationType(models.TextChoices):
        INDOOR = 'IN', 'Intérieur'
        OUTDOOR = 'OUT', 'Extérieur'
        
    climber = models.ForeignKey(CustomUser, on_delete=models.CASCADE, default=1)
    date = models.DateField(default=timezone.now)
    location = models.ForeignKey(ClimbingGymLocations, on_delete=models.SET_NULL, null=True, default= None)
    climb_type = models.CharField(
        max_length=3,
        choices=LocationType.choices,
        default=LocationType.INDOOR,
    )
    # completed_grade = models.CharField(max_length=10) # Need to think about the possibility of grading by multiple colors
    height = models.IntegerField()
    comments = models.TextField()
    # media = models.ImageField(upload_to='media/', blank=True, null=True) # Later
    
    def __str__(self):
        return f"Training session of {self.climber} at {self.location} on {self.date}"
    
    class Meta:
        verbose_name = 'Session'
