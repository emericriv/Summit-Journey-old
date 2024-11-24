# urls.py
from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import CitySearchViewSet

router = DefaultRouter()
router.register(r'cities/search', CitySearchViewSet)

urlpatterns = [
    # Autocomplétion des villes
    path('', include(router.urls)),
]