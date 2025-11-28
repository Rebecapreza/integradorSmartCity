from django.contrib import admin
from .models import Responsavel, Local, Ambiente, Sensor, Historico

# Configuração para Ambiente (Adicione esta classe)
class AmbienteAdmin(admin.ModelAdmin):
    # Aqui definimos quais colunas aparecem na tabela
    list_display = ('local', 'descricao', 'responsavel')
    # Adiciona campo de busca para facilitar
    search_fields = ('local__local', 'responsavel__nome')

# Configuração para Sensor (Já existia, mantive igual)
class SensorAdmin(admin.ModelAdmin):
    list_display = ('tipo', 'mac_address', 'ambiente', 'status', 'unidade_medida')
    list_filter = ('tipo', 'status', 'ambiente')
    search_fields = ('mac_address', 'localizacao')

# Configuração para Histórico (Já existia, mantive igual)
class HistoricoAdmin(admin.ModelAdmin):
    list_display = ('sensor', 'valor', 'data_hora')
    list_filter = ('sensor__tipo', 'data_hora')
    ordering = ('-data_hora',)

# Registros no Admin
admin.site.register(Responsavel)
admin.site.register(Local)
admin.site.register(Ambiente, AmbienteAdmin) 
admin.site.register(Sensor, SensorAdmin)
admin.site.register(Historico, HistoricoAdmin)