from rest_framework import serializers
from .models import ClimbingSession, ClimbingGymLocations
from ClimbingGymLocations.serializer import ClimbingGymLocationsSerializer


class ClimbingSessionRetreiveSerializer(serializers.ModelSerializer):
    location = ClimbingGymLocationsSerializer()  # Accepte l'ID pour la création/mise à jour

    class Meta:
        model = ClimbingSession
        fields = '__all__'

class ClimbingSessionCreateUpdateSerializer(serializers.ModelSerializer):
    location  = serializers.PrimaryKeyRelatedField(queryset=ClimbingGymLocations.objects.all())  # Accepte l'ID pour la création/mise à jour

    class Meta:
        model = ClimbingSession
        fields = '__all__'
