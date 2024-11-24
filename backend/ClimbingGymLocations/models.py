from django.db import models
from django.contrib.gis.db.models import PointField


# Class attributes are the fields of the model
class ClimbingGymLocations(models.Model):
    gym_name = models.CharField(max_length=100)

    # Nouveau champ PointField
    location = PointField(null=True, blank=True)
    city = models.CharField(max_length=100, default=None, blank=True, null=True)
    zip_code = models.CharField(max_length=5, default=None, blank=True, null=True)
    big_city = models.CharField(max_length=100, default=None, blank=True, null=True)

    # Meta class is used to specify metadata about the model
    # verbose_name is used to specify a human-readable name for the object
    class Meta:
        verbose_name = 'Salle d\'escalade'
        verbose_name_plural = 'Salles d\'escalade'
        ordering = ['gym_name']
        
    def __str__(self):
        return self.gym_name