from django.db.models import Q
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .models import City
from .serializer import CitySerializer


class CitySearchViewSet(viewsets.ModelViewSet):
    queryset = City.objects.all()
    serializer_class = CitySerializer
    permission_classes = [AllowAny]

    def list(self, request):
        query = request.GET.get("q", "")
        cities = City.objects.filter(
            Q(label__icontains=query)
            | Q(zip_code__icontains=query)
            | Q(department_name__icontains=query)
        )
        serializer = CitySerializer(cities, many=True)
        return Response(serializer.data)
