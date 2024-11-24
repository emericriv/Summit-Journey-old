from django.contrib.gis.db import models

class City(models.Model):
    insee_code = models.CharField(max_length=10)
    city_code = models.CharField(max_length=100)
    zip_code = models.CharField(max_length=10)
    label = models.CharField(max_length=100)
    location = models.PointField(geography=True)  # Combine latitude et longitude
    department_name = models.CharField(max_length=100)
    department_number = models.CharField(max_length=10)
    region_name = models.CharField(max_length=100)
    region_geojson_name = models.CharField(max_length=100)

    class Meta:
        verbose_name = "City"
        verbose_name_plural = "Cities"
        ordering = ['label']

    def __str__(self):
        return f"{self.city} - {self.zipCode} - {self.department}"
