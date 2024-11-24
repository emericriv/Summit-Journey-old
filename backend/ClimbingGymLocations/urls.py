from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ClimbingGymLocationsViewSet, ClimbingGymLocationSearch

router = DefaultRouter()
router.register(r'gyms', ClimbingGymLocationsViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('gyms/search/<str:city_id>/', ClimbingGymLocationSearch.as_view(), name='gym-location-search'),
]
