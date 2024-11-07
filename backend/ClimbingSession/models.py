from django.db import models
from django.utils import timezone

from CustomUser.models import CustomUser
from ClimbingGymLocations.models import ClimbingGymLocations

class Difficulty(models.Model):
    color = models.BooleanField(default=False, help_text="Is the difficulty color-coded ?")
    label = models.CharField(max_length=20, help_text="Name or label of the difficulty")
    hex_color = models.CharField(max_length=7, blank=True, null=True, help_text="haxe color code of the difficulty if color=True")

    def save(self, *args, **kwargs):
        if self.color and not self.hex_color:
            raise ValueError("hex_color is required when color is True")
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.label} - {'Color' if self.color else 'Level'}"
    
    class Meta:
        verbose_name = 'Difficulty'
        verbose_name_plural = 'Difficulties'
        
class DifficultySet(models.Model):
    difficulties = models.ManyToManyField(Difficulty, through='DifficultyOrder', related_name="sets")
    
    class Meta:
        verbose_name = 'Difficulty Set'
        verbose_name_plural = 'Difficulty Sets'
        
class DifficultyOrder(models.Model):
    difficulty_set = models.ForeignKey(DifficultySet, on_delete=models.CASCADE)
    difficulty = models.ForeignKey(Difficulty, on_delete=models.CASCADE)
    order = models.PositiveIntegerField(help_text="Ordre de la difficulté dans le set")

    class Meta:
        ordering = ['order']  # Get the difficulties in the defined order

    def __str__(self):
        return f"{self.difficulty.label} in {self.difficulty_set.id} (Order: {self.order})"

class ClimbingSession(models.Model):
    
    class LocationType(models.TextChoices):
        INDOOR = 'IN', 'Intérieur'
        OUTDOOR = 'OUT', 'Extérieur'
        
    climber = models.ForeignKey(CustomUser, on_delete=models.CASCADE, default=1)
    date = models.DateField(default=timezone.now)
    location = models.ForeignKey(ClimbingGymLocations, on_delete=models.SET_NULL, null=True, default=None)
    climb_type = models.CharField(
        max_length=3,
        choices=LocationType.choices,
        default=LocationType.INDOOR,
    )
    difficulty_set = models.ForeignKey(DifficultySet, on_delete=models.SET_NULL, null=True, default=None, related_name="sessions")
    height = models.IntegerField()
    comments = models.TextField(blank=True, null=True)
    
    def __str__(self):
        return f"Training session of {self.climber} at {self.location} on {self.date}"
    
    class Meta:
        verbose_name = 'Session'

class DifficultyCompletion(models.Model):
    session = models.ForeignKey(ClimbingSession, on_delete=models.CASCADE, related_name="difficulty_completions")
    difficulty = models.ForeignKey(Difficulty, on_delete=models.CASCADE)
    count = models.IntegerField(default=0, help_text="Number of times the difficulty was completed")

    def __str__(self):
        return f"{self.count} x {self.difficulty.label} in session {self.session.id}"
    
    class Meta:
        verbose_name = 'Difficulty Completion'
        verbose_name_plural = 'Difficulty Completions'
