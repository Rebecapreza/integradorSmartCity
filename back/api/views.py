from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from datetime import timedelta
from django.utils import timezone

from .models import Responsavel, Ambiente, Sensor, Historico
from .serializers import (
    ResponsavelSerializer, AmbienteSerializer, SensorSerializer, 
    HistoricoSerializer, RegisterSerializer
)
from .filters import SensorFilter, HistoricoFilter

# View para Registro de Usuários
class RegisterView(CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer

class ResponsavelViewSet(ModelViewSet):
    queryset = Responsavel.objects.all()
    serializer_class = ResponsavelSerializer
    permission_classes = [IsAuthenticated]

class AmbienteViewSet(ModelViewSet):
    queryset = Ambiente.objects.all()
    serializer_class = AmbienteSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ['local', 'descricao']

class SensorViewSet(ModelViewSet):
    queryset = Sensor.objects.all()
    serializer_class = SensorSerializer
    permission_classes = [IsAuthenticated]
    
    # Filtros exigidos no PDF (Critério 12)
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_class = SensorFilter
    search_fields = ['mac_address', 'localizacao']
    ordering_fields = ['id', 'tipo']

class HistoricoViewSet(ModelViewSet):
    queryset = Historico.objects.all().order_by('-data_hora') # Ordena do mais recente para o antigo
    serializer_class = HistoricoSerializer
    permission_classes = [IsAuthenticated]
    
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_class = HistoricoFilter

    # CRITÉRIO 13: Endpoint para medições recentes (últimas 24h ou parametrizável)
    # Uso: /api/historico/recentes/ ou /api/historico/recentes/?hours=48
    @action(detail=False, methods=['get'])
    def recentes(self, request):
        horas = int(request.query_params.get('hours', 24)) # Padrão 24h
        limite = timezone.now() - timedelta(hours=horas)
        
        # Filtra registros mais novos que o limite
        queryset = self.get_queryset().filter(data_hora__gte=limite)
        
        # Se quiser filtrar por sensor específico também: /api/historico/recentes/?hours=24&sensor_id=1
        sensor_id = request.query_params.get('sensor_id')
        if sensor_id:
            queryset = queryset.filter(sensor_id=sensor_id)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)