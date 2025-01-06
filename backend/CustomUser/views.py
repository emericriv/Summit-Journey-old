from CustomUser.serializer import CustomUserSerializer
from rest_framework import permissions, viewsets
from rest_framework.decorators import action
from rest_framework.exceptions import MethodNotAllowed
from rest_framework.response import Response
from rest_framework.views import APIView


class UserView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_permissions(self):
        if self.request.method == "POST":
            return [permissions.AllowAny()]
        return super().get_permissions()

    def post(self, request):
        serializer = CustomUserSerializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except Exception as e:
            # TODO : gérer les erreurs pour pouvoir les afficher en front
            return Response({"error": str(e)}, status=400)
        serializer.save()
        return Response(serializer.data)

    def get(self, request):
        user = request.user

        # Méthode GET : renvoyer les informations de l'utilisateur
        serializer = CustomUserSerializer(user)
        return Response(serializer.data)

    def patch(self, request):
        user = request.user
        serializer = CustomUserSerializer(user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
