# urls.py
from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import PlannedClimbingSessionViewSet

router = DefaultRouter()
router.register(r"planned-sessions", PlannedClimbingSessionViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
