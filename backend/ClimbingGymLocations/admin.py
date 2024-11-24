from django.contrib import admin
from .models import ClimbingGymLocations

# This will allow the admin to view the ClimbingGymLocations model in the admin panel
# list display stand for the columns that will be displayed in the admin panel
@admin.register(ClimbingGymLocations)
class ClimbingGymLocationsAdmin(admin.ModelAdmin):
  list_display = ["gym_name"]
