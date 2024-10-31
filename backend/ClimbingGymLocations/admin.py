from django.contrib import admin
from .models import ClimbingGymLocations

@admin.register(ClimbingGymLocations)
class ClimbingGymLocationsAdmin(admin.ModelAdmin):
  list_display = ("gym_name", "long", "lat")
