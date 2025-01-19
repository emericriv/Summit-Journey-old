# models.py dans l'app des sessions
from ClimbingGymLocations.models import ClimbingGymLocations
from django.conf import settings
from django.db import models


class PlannedClimbingSession(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="planned_sessions",
    )
    location = models.ForeignKey(
        ClimbingGymLocations, on_delete=models.SET_NULL, null=True
    )
    start_time = models.DateTimeField()
    end_time = models.DateTimeField(blank=True, null=True)
    participants = models.TextField(blank=True, help_text="Separate names with commas.")
    is_completed = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user} - {self.location} on {self.start_time}"
