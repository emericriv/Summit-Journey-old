# Generated by Django 5.1.2 on 2025-01-06 10:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('CustomUser', '0002_customuser_favorite_climbing_gym'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='climbing_harness',
            field=models.CharField(blank=True, max_length=50),
        ),
        migrations.AddField(
            model_name='customuser',
            name='climbing_helmet',
            field=models.CharField(blank=True, max_length=50),
        ),
        migrations.AddField(
            model_name='customuser',
            name='climbing_rope',
            field=models.CharField(blank=True, max_length=50),
        ),
        migrations.AddField(
            model_name='customuser',
            name='climbing_shoes',
            field=models.CharField(blank=True, max_length=50),
        ),
    ]
