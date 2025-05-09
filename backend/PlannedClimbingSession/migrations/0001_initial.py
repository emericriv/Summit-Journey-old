# Generated by Django 5.1.2 on 2025-01-12 13:59

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('ClimbingGymLocations', '0004_remove_climbinggymlocations_lat_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='PlannedClimbingSession',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_time', models.DateTimeField()),
                ('end_time', models.DateTimeField(blank=True, null=True)),
                ('participants', models.TextField(blank=True, help_text='Separate names with commas.')),
                ('is_completed', models.BooleanField(default=False)),
                ('location', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='ClimbingGymLocations.climbinggymlocations')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='planned_sessions', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
