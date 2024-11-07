from rest_framework import viewsets
from .models import ClimbingSession, DifficultySet
from .serializer import ClimbingSessionCreateUpdateSerializer, ClimbingSessionRetrieveSerializer, DifficultySetSerializer

class ClimbingSessionViewSet(viewsets.ModelViewSet):
    queryset = ClimbingSession.objects.all()
    
    def get_serializer_class(self):
        # Voir le fichier serializer.py pour plus d'informations
        if self.request.method == 'GET':
            return ClimbingSessionRetrieveSerializer
        return ClimbingSessionCreateUpdateSerializer
    
class DifficultySetViewSet(viewsets.ModelViewSet):
    queryset = DifficultySet.objects.all()
    serializer_class = DifficultySetSerializer

# Ce qui suit n'est que le vestige de comment pouvais marcher l'API avant l'utilisation de viewsets
# Je le garde pour référence et pouvoir comprendre si nécessaire

# @api_view(['GET'])
# def get_sessions(request):
#     sessions = ClimbingSession.objects.all()
#     serializedData = ClimbingSessionSerializer(sessions, many=True).data
#     return Response(serializedData)

# @api_view(['POST'])
# def create_session(request):
#     data = request.data
#     serializer = ClimbingSessionSerializer(data=data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['PUT', 'DELETE'])
# def session_detail(request, pk):
#     try:
#         session = ClimbingSession.objects.get(pk=pk)
#     except ClimbingSession.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)

#     if request.method == 'DELETE':
#         session.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)
#     elif request.method == 'PUT':
#         data = request.data
#         serializer = ClimbingSessionSerializer(session, data=data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)    
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)