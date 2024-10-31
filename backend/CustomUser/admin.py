from django.contrib import admin
from .models import CustomUser

@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    model = CustomUser
    list_display = ['username', 'email', 'first_name', 'last_name', 'is_active', 'is_staff', 'is_superuser']
