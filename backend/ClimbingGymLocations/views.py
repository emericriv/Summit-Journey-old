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
    def get(self, request, city_name):
        gyms = ClimbingGymLocations.objects.filter(city__iexact=city_name) | ClimbingGymLocations.objects.filter(big_city__iexact=city_name)
        serializer = ClimbingGymLocationsSerializer(gyms, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
