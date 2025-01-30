# views.py
from django.db.models import Q  # Import pour les requêtes complexes
from django.utils.timezone import now
from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated

from .models import PlannedClimbingSession
from .serializer import PlannedClimbingSessionSerializer


class PlannedClimbingSessionViewSet(viewsets.ModelViewSet):
    queryset = PlannedClimbingSession.objects.all()
    serializer_class = PlannedClimbingSessionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        # Filtrer par utilisateur et appliquer les conditions supplémentaires
        return self.queryset.filter(user=user)
