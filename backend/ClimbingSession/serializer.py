from rest_framework import serializers
from .models import ClimbingSession
from ClimbingGymLocations.serializer import ClimbingGymLocationsSerializer

class ClimbingSessionSerializer(serializers.ModelSerializer):
    location = ClimbingGymLocationsSerializer()
    # Si location"s" : locations = ClimbingGymLocationsSerializer(many=True)
    class Meta:
        model = ClimbingSession
        fields = '__all__'
