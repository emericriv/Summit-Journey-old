# views.py
from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated

from .models import PlannedClimbingSession
from .serializer import PlannedClimbingSessionSerializer


class PlannedClimbingSessionViewSet(viewsets.ModelViewSet):
    queryset = PlannedClimbingSession.objects.all()
    serializer_class = PlannedClimbingSessionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)
