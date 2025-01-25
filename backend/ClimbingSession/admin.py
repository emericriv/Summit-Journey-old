from django.contrib import admin

from .models import (
    ClimbingSession,
    Difficulty,
    DifficultyCompletion,
    DifficultyOrder,
    DifficultySet,
)


@admin.register(Difficulty)
class DifficultyAdmin(admin.ModelAdmin):
    list_display = ("id", "label", "color", "hex_color")


@admin.register(DifficultyOrder)
class DifficultyOrderAdmin(admin.ModelAdmin):
    list_display = ("difficulty_set", "difficulty", "order")


class DifficultyOrderInline(admin.TabularInline):
    model = DifficultyOrder
    extra = 1  # Nombre de lignes supplémentaires à afficher


@admin.register(DifficultySet)
class DifficultySetAdmin(admin.ModelAdmin):
    list_display = ("id",)
    inlines = [DifficultyOrderInline]


@admin.register(DifficultyCompletion)
class DifficultyCompletionAdmin(admin.ModelAdmin):
    list_display = ("session", "difficulty", "count")


class DifficultyCompletionInline(
    admin.TabularInline
):  # Utilisation de TabularInline pour un affichage compact
    model = DifficultyCompletion
    extra = 1  # Nombre de champs supplémentaires pour ajouter de nouvelles instances dans le formulaire
    fields = ["difficulty", "count"]  # Les champs à afficher dans l'interface


@admin.register(ClimbingSession)
class ClimbingSessionAdmin(admin.ModelAdmin):
    list_display = (
        "climber",
        "date_time_start",
        "location",
        "climb_type",
        "height",
        "comments",
    )
    inlines = [DifficultyCompletionInline]
