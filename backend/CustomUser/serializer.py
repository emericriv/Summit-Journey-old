from ClimbingGymLocations.models import ClimbingGymLocations
from ClimbingGymLocations.serializer import ClimbingGymLocationsSerializer
from rest_framework import serializers

from .models import CustomUser


class CustomUserSerializer(serializers.ModelSerializer):
    favorite_climbing_gym = ClimbingGymLocationsSerializer(read_only=True)
    favorite_climbing_gym_id = serializers.PrimaryKeyRelatedField(
        queryset=ClimbingGymLocations.objects.all(),
        source="favorite_climbing_gym",
        write_only=True,
        required=False,
    )

    class Meta:
        model = CustomUser
        fields = "__all__"

    def create(self, validated_data):
        password = validated_data.pop("password", None)
        user = CustomUser.objects.create_user(**validated_data)
        if password:
            user.set_password(password)
        user.save()
        return user
