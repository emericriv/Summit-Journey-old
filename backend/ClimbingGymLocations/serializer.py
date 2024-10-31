from rest_framework import serializers
from .models import ClimbingGymLocations

class ClimbingGymLocationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClimbingGymLocations
        fields = '__all__'