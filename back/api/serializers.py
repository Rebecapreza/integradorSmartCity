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
    ambiente_local = serializers.ReadOnlyField(source='ambiente.local')

    class Meta:
        model = Sensor
        fields = [
            'id', 'tipo', 'mac_address', 'latitude', 'longitude', 
            'localizacao', 'unidade_medida', 'status', 'observacao', 
            'ambiente', 'ambiente_local', 'created_at'
        ]

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