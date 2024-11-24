from rest_framework import serializers
from .models import City

class CitySerializer(serializers.ModelSerializer):
    label = serializers.CharField(read_only=True)
    department_name = serializers.CharField(read_only=True)

    # Méthode pour formater le champ `label`
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        # Formater le label avec la première lettre en majuscule
        representation['label'] = representation['label'].capitalize()
        representation['department_name'] = representation['department_name'].capitalize()
        return representation

    class Meta:
        model = City
        fields = ['id', 'label', 'zip_code', 'department_name']  # Ajoute tous les champs dont tu as besoin