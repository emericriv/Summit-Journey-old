from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import ClimbingGymLocationsViewSet, SearchGymsView
    
router = DefaultRouter()
router.register(r'locations', ClimbingGymLocationsViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('search-gyms/', SearchGymsView.as_view(), name='search_gyms')
]
