from django.contrib import admin

from .models import PlannedClimbingSession


# Register your models here.
@admin.register(PlannedClimbingSession)
class PlannedClimbingSessionAdmin(admin.ModelAdmin):
    list_display = [
        "user",
        "location",
        "start_time",
        "participants",
        "is_completed",
    ]
