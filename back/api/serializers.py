from rest_framework import serializers
from .models import Responsavel, Ambiente, Sensor, Historico
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password

class ResponsavelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Responsavel
        fields = '__all__'

class AmbienteSerializer(serializers.ModelSerializer):
    # Para mostrar o nome do responsável em vez de apenas o ID 
    responsavel_nome = serializers.ReadOnlyField(source='responsavel.nome')

    class Meta:
        model = Ambiente
        fields = ['id', 'local', 'descricao', 'responsavel', 'responsavel_nome']

class SensorSerializer(serializers.ModelSerializer):
    # Usamos SerializerMethodField para evitar erro se o ambiente for None
    ambiente_local = serializers.SerializerMethodField()

    class Meta:
        model = Sensor
        fields = [
            'id', 'tipo', 'mac_address', 'latitude', 'longitude', 
            'localizacao', 'unidade_medida', 'status', 'observacao', 
            'ambiente', 'ambiente_local', 'created_at'
        ]

    def get_ambiente_local(self, obj):
        # Se existe um ambiente e esse ambiente tem um local, retorna o nome do local
        if obj.ambiente and obj.ambiente.local:
            return str(obj.ambiente.local)
        return "Sem ambiente"

class HistoricoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Historico
        fields = '__all__'

# === Serializer de Registro de Usuário (Mantido para o Login) ===
class RegisterSerializer(serializers.ModelSerializer):
    username = serializers.CharField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all(), message="Usuário já existe.")]
    )
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password],
        style={'input_type': 'password'}
    )

    class Meta:
        model = User
        fields = ('id', 'username', 'password')

    def create(self, validated_data):
        return User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password']
        )