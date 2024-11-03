from rest_framework import serializers
from .models import ClimbingSession, ClimbingGymLocations
from ClimbingGymLocations.serializer import ClimbingGymLocationsSerializer

# Serializer pour les sessions d'escalade

# Ce premier serializer est utilisé pour les requêtes GET car on veut visualiser
# les informations des salles d'escalade
class ClimbingSessionRetreiveSerializer(serializers.ModelSerializer):
    location = ClimbingGymLocationsSerializer()

    class Meta:
        model = ClimbingSession
        fields = '__all__'

# Ce second serializer est utilisé pour les requêtes POST et PUT, ici on ne récupère
# que l'ID de la salle d'escalade pour ensuite récupérer les informations de la salle
# et l'assigner à la session d'escalade
class ClimbingSessionCreateUpdateSerializer(serializers.ModelSerializer):
    location  = serializers.PrimaryKeyRelatedField(queryset=ClimbingGymLocations.objects.all())  # Accepte l'ID pour la création/mise à jour

    class Meta:
        model = ClimbingSession
        fields = '__all__'
