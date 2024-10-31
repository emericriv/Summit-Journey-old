from django.urls import path
from .views import SearchPlaceView

urlpatterns = [
    path('search-place/', SearchPlaceView.as_view(), name='search_place'),
]