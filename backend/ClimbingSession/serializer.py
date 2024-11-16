from rest_framework import serializers
from .models import ClimbingSession, ClimbingGymLocations, Difficulty, DifficultyCompletion, DifficultySet, DifficultyOrder
from ClimbingGymLocations.serializer import ClimbingGymLocationsSerializer
    
class DifficultySerializer(serializers.ModelSerializer):
    class Meta:
        model = Difficulty
        fields = '__all__'
        
# Serializer pour afficher les difficultés avec leur nombre de complétion
class DifficultyCompletionRetrieveSerializer(serializers.ModelSerializer):
    difficulty = DifficultySerializer()
    class Meta:
        model = DifficultyCompletion
        fields = ['difficulty', 'count']
        
class DifficultyCompletionCreateUpdateSerializer(serializers.ModelSerializer):
    difficulty = serializers.PrimaryKeyRelatedField(queryset=Difficulty.objects.all())
    class Meta:
        model = DifficultyCompletion
        fields = ['difficulty', 'count']

# Serializer pour les requêtes GET - inclut la liste des difficultés complétées
class ClimbingSessionRetrieveSerializer(serializers.ModelSerializer):
    location = ClimbingGymLocationsSerializer()
    difficulty_completions = DifficultyCompletionRetrieveSerializer(many=True, read_only=True)

    class Meta:
        model = ClimbingSession
        fields = '__all__'

# Serializer pour les requêtes POST et PUT - accepte les IDs des difficultés et leur nombre
class ClimbingSessionCreateUpdateSerializer(serializers.ModelSerializer):
    location = serializers.PrimaryKeyRelatedField(queryset=ClimbingGymLocations.objects.all())
    difficulty_completions = DifficultyCompletionCreateUpdateSerializer(many=True)

    class Meta:
        model = ClimbingSession
        fields = '__all__'

    def create(self, validated_data):
        print(validated_data)
        difficulty_completions_data = validated_data.pop('difficulty_completions')
        session = ClimbingSession.objects.create(**validated_data)
        
        # Crée les enregistrements de DifficultyCompletion associés
        for completion_data in difficulty_completions_data:
            DifficultyCompletion.objects.create(session=session, **completion_data)
        
        return session

    def update(self, instance, validated_data):
        difficulty_completions_data = validated_data.pop('difficulty_completions')
        
        # Met à jour les champs de la session
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # Si aucune donnée de difficulté n'est fournie, on ne fait rien
        if not difficulty_completions_data:
            return instance
        
        # Met à jour ou crée les DifficultyCompletion associés
        instance.difficulty_completions.all().delete()  # Efface les anciennes entrées
        for completion_data in difficulty_completions_data:
            DifficultyCompletion.objects.create(session=instance, **completion_data)
        
        return instance
        
class DifficultyOrderSerializer(serializers.ModelSerializer):
    difficulty = DifficultySerializer()
    class Meta:
        model = DifficultyOrder
        fields = ['difficulty', 'order']

class DifficultySetSerializer(serializers.ModelSerializer):
    difficulties = DifficultyOrderSerializer(source='difficultyorder_set', many=True)

    class Meta:
        model = DifficultySet
        fields = ['id', 'difficulties']