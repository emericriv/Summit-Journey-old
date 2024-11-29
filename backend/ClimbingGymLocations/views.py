from Locations.models import City
from django.contrib.gis.db.models.functions import Distance
from .models import ClimbingGymLocations
from .serializer import ClimbingGymLocationsSerializer
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# ViewSet pour les opérations générales
class ClimbingGymLocationsViewSet(viewsets.ModelViewSet):
    queryset = ClimbingGymLocations.objects.all()
    serializer_class = ClimbingGymLocationsSerializer

# APIView pour la recherche par ville
class ClimbingGymLocationSearch(APIView):
    def get(self, request, city_id):
        radius = 10000  # 10 km en mètres

        try:
            # Récupère la ville et ses coordonnées
            city = City.objects.get(id__iexact=city_id)
            city_location = city.location

            # Rechercher les salles d'escalade dans le rayon spécifié
            gyms = ClimbingGymLocations.objects.filter(
                location__distance_lte=(city_location, radius)
            ).annotate(distance=Distance("location", city_location)).order_by("distance")

            serializer = ClimbingGymLocationsSerializer(gyms, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except City.DoesNotExist:
            return Response(
                {"error": "City not found"}, status=status.HTTP_404_NOT_FOUND
            )
