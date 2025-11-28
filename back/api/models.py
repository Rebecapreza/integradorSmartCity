from django.db import models

# 1. Tabela LOCAL (Vem de locais.csv)
# Armazena apenas o nome físico da sala.
class Local(models.Model):
    local = models.CharField(max_length=100, unique=True)
    
    def __str__(self):
        return self.local

    class Meta:
        verbose_name = "Local"
        verbose_name_plural = "Locais"

# 2. Tabela RESPONSAVEL 
class Responsavel(models.Model):
    nome = models.CharField(max_length=100)

    def __str__(self):
        return self.nome
    
    class Meta:
        verbose_name = "Responsável"
        verbose_name_plural = "Responsáveis"

# 3. Tabela AMBIENTE (Vem de ambientes.csv)
# Esta tabela CRIA O VÍNCULO com o Local e o Responsável.
class Ambiente(models.Model):
    # Aqui fazemos a ligação: Um Ambiente PERTENCE a um Local.
    local = models.ForeignKey(Local, on_delete=models.CASCADE, related_name='ambientes')
    
    descricao = models.TextField(null=True, blank=True)
    responsavel = models.ForeignKey(Responsavel, on_delete=models.SET_NULL, null=True, related_name='ambientes')

    def __str__(self):
        # Mostra o nome do Local para representar este Ambiente
        return str(self.local) 

    class Meta:
        verbose_name = "Ambiente"
        verbose_name_plural = "Ambientes"

# 4. Tabela SENSOR (Vem de sensores.csv)
class Sensor(models.Model):
    TIPO_SENSOR_CHOICES = [
        ('temperatura', 'Temperatura'),
        ('umidade', 'Umidade'),
        ('luminosidade', 'Luminosidade'),
        ('contador', 'Contador'),
    ]

    tipo = models.CharField(max_length=50, choices=TIPO_SENSOR_CHOICES)
    mac_address = models.CharField(max_length=50, null=True, blank=True)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    localizacao = models.CharField(max_length=100, null=True, blank=True)
    unidade_medida = models.CharField(max_length=20, null=True, blank=True)
    status = models.BooleanField(default=True)
    observacao = models.TextField(null=True, blank=True)
    
    # O Sensor fica dentro de um Ambiente
    ambiente = models.ForeignKey(Ambiente, on_delete=models.SET_NULL, null=True, related_name='sensores')
    
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.tipo} ({self.mac_address})"

    class Meta:
        verbose_name = "Sensor"
        verbose_name_plural = "Sensores"

# 5. Tabela HISTORICO (Medições)
class Historico(models.Model):
    sensor = models.ForeignKey(Sensor, on_delete=models.CASCADE, related_name='medicoes')
    valor = models.FloatField()
    data_hora = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.sensor} - {self.valor}"

    class Meta:
        verbose_name = "Histórico"
        verbose_name_plural = "Históricos"