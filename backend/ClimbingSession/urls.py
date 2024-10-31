from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import ClimbingSessionViewSet
    
router = DefaultRouter()
router.register(r'sessions', ClimbingSessionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]