from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
import requests

class SearchPlaceView(APIView):
    def get(self, request):
        query = request.query_params.get('query')
        if not query:
            return Response({"error": "Le paramètre 'query' est requis."}, status=status.HTTP_400_BAD_REQUEST)

        api_key = settings.GOOGLE_MAPS_API_KEY
        url = f"https://maps.googleapis.com/maps/api/place/textsearch/json?query={query}&key={api_key}"
        try:
            response = requests.get(url)
            response.raise_for_status()
            data = response.json()
            return Response(data)  # Renvoie les données JSON telles quelles
        except requests.exceptions.RequestException as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
