import django_filters as df
from .models import Sensor, Historico, Ambiente

class SensorFilter(df.FilterSet):
    # Filtros flexíveis: 'icontains' permite buscar parte do texto (ex: 'temp' acha 'temperatura')
    tipo = df.CharFilter(field_name='tipo', lookup_expr='icontains')
    status = df.BooleanFilter(field_name='status')
    ambiente = df.CharFilter(field_name='ambiente__local', lookup_expr='icontains')

    class Meta:
        model = Sensor
        fields = ['tipo', 'status', 'ambiente', 'mac_address']

class HistoricoFilter(df.FilterSet):
    # Filtros de data e hora para o histórico (Critério 12)
    data_inicio = df.DateTimeFilter(field_name='data_hora', lookup_expr='gte') # >= data
    data_fim = df.DateTimeFilter(field_name='data_hora', lookup_expr='lte')    # <= data
    sensor_id = df.NumberFilter(field_name='sensor__id')
    tipo_sensor = df.CharFilter(field_name='sensor__tipo', lookup_expr='icontains')

    class Meta:
        model = Historico
        fields = ['sensor_id', 'tipo_sensor', 'data_inicio', 'data_fim']