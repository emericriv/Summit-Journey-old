from rest_framework import serializers
from .models import ClimbingGymLocations

# serializer class
# Un serializer est une classe qui permet de convertir des données complexes, 
# telles que des instances de modèles Django, en des types de données natifs 
# qui peuvent ensuite être facilement convertis en JSON, XML ou d'autres types de contenu.
class ClimbingGymLocationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClimbingGymLocations
        fields = '__all__'