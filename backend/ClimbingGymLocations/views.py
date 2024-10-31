from .models import ClimbingGymLocations
from .serializer import ClimbingGymLocationsSerializer
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q

# ViewSet pour les opérations générales
class ClimbingGymLocationsViewSet(viewsets.ModelViewSet):
    queryset = ClimbingGymLocations.objects.all()
    serializer_class = ClimbingGymLocationsSerializer

# APIView pour la recherche filtrée
class SearchGymsView(APIView):
    def get(self, request):
        city = request.query_params.get('city', None)
        if not city:
            return Response({'error': 'Veuillez fournir une ville.'}, status=status.HTTP_400_BAD_REQUEST)

        gyms = ClimbingGymLocations.objects.filter(
            Q(city__icontains=city) | Q(nearest_big_city__icontains=city)
        )

        if gyms.exists():
            serializer = ClimbingGymLocationsSerializer(gyms, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Aucune salle trouvée pour cette ville.'}, status=status.HTTP_404_NOT_FOUND)
