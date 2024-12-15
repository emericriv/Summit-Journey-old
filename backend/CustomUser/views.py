from rest_framework import permissions, viewsets
from rest_framework.decorators import action
from rest_framework.exceptions import MethodNotAllowed
from rest_framework.response import Response

from .models import CustomUser
from .serializer import CustomUserSerializer


class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

    # Allow only creation user without authentication
    def get_permissions(self):
        if self.action == "create":
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

    @action(
        detail=False,
        methods=["get", "put", "patch"],  # Accepte les trois méthodes
        permission_classes=[permissions.IsAuthenticated],
    )
    def me(self, request):
        """
        Endpoint pour récupérer ou mettre à jour les informations de l'utilisateur connecté.
        """
        user = request.user

        # Méthode GET : renvoyer les informations de l'utilisateur
        if request.method == "GET":
            serializer = self.get_serializer(user)
            return Response(serializer.data)

        # Méthodes PUT et PATCH : mettre à jour l'utilisateur
        elif request.method in ["PUT", "PATCH"]:
            partial = request.method == "PATCH"
            serializer = self.get_serializer(user, data=request.data, partial=partial)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)

        # Si une autre méthode est utilisée, lever une erreur
        raise MethodNotAllowed(request.method)
