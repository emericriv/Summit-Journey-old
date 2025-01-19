# serializers.py
from ClimbingGymLocations.models import ClimbingGymLocations
from ClimbingGymLocations.serializer import ClimbingGymLocationsSerializer
from PlannedClimbingSession.models import PlannedClimbingSession
from rest_framework import serializers


class PlannedClimbingSessionSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        self.fields["location"] = ClimbingGymLocationsSerializer()
        return super(PlannedClimbingSessionSerializer, self).to_representation(instance)

    def to_internal_value(self, data):
        self.fields["location"] = serializers.PrimaryKeyRelatedField(
            queryset=ClimbingGymLocations.objects.all()
        )
        return super(PlannedClimbingSessionSerializer, self).to_internal_value(data)

    def create(self, validated_data):
        planned_session = PlannedClimbingSession.objects.create(
            **validated_data, user=self.context["request"].user
        )

        return planned_session

    class Meta:
        model = PlannedClimbingSession
        exclude = ["user"]
