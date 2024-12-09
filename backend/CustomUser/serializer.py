from rest_framework import serializers

from .models import CustomUser


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = "__all__"

    def create(self, validated_data):

        password = validated_data.pop("password")  # Récupère le mot de passe

        # Créé un user avec toutes les infos sauf le mot de passe
        user = CustomUser.objects.create_user(**validated_data)
        user.set_password(password)  # Hash le mot de passe
        user.save()
        return user
