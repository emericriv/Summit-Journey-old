from django.contrib import admin
from .models import ClimbingSession

@admin.register(ClimbingSession)
class ClimbingSessionAdmin(admin.ModelAdmin):
  list_display =('climber', 'date', 'location', 'climb_type', 'height', 'comments')

