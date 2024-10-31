from django.db import models

class ClimbingGymLocations(models.Model):
    
    gym_name = models.CharField(max_length=100)
    # voir si c'est mieux de stocker le type intérieur extérieur ici ou dans le modèle de session
    # Besoin de stocker l'adresse au format texte pour l'affichage ?
    long = models.DecimalField(max_digits=9, decimal_places=6)
    lat  = models.DecimalField(max_digits=9, decimal_places=6)
    city = models.CharField(max_length=100, default=None, blank=True, null=True)
    zip_code = models.CharField(max_length=5, default=None, blank=True, null=True)
    big_city = models.CharField(max_length=100, default=None, blank=True, null=True)

    class Meta:
        verbose_name = 'Salle d\'escalade'
        verbose_name_plural = 'Salles d\'escalade'
        
    def __str__(self):
        return self.gym_name