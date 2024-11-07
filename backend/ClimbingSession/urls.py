from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import ClimbingSessionViewSet, DifficultySetViewSet
    
router = DefaultRouter()
router.register(r'sessions', ClimbingSessionViewSet)
router.register(r'difficulty-sets', DifficultySetViewSet)

urlpatterns = [
    path('', include(router.urls)),
]