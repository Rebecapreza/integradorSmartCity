from django.core.management.base import BaseCommand
from api.models import Sensor, Ambiente
import pandas as pd
import os

class Command(BaseCommand):
    help = "Importa os sensores e vincula aos ambientes"

    def handle(self, *args, **options):
        caminho = os.path.join('population', 'sensores.csv')
        
        try:
            df = pd.read_csv(caminho, encoding='utf-8-sig')
            
            for index, row in df.iterrows():
                # Busca o ambiente pelo nome
                nome_amb = str(row['ambiente']).strip()
                ambiente = Ambiente.objects.filter(local=nome_amb).first()

                if not ambiente:
                    self.stdout.write(self.style.WARNING(f"Ambiente '{nome_amb}' não encontrado para o sensor {row['mac_address']}"))
                    continue

                # Trata o campo status (converte string/numérico para booleano)
                status_raw = str(row.get('status', 'True')).lower()
                status_bool = status_raw in ['true', '1', 't', 'y', 'sim']

                tipo_sensor = row['sensor'] 

                obj, created = Sensor.objects.update_or_create(
                    mac_address=row['mac_address'],
                    defaults={
                        'tipo': tipo_sensor,  # Usa o valor lido da coluna 'sensor'
                        'latitude': row.get('latitude', 0.0),
                        'longitude': row.get('longitude', 0.0),
                        'localizacao': row.get('localizacao', ''),
                        'unidade_medida': row.get('unidade_medida', ''),
                        'ambiente': ambiente,
                        'status': status_bool,
                        'observacao': row.get('observacao', '')
                    }
                )
                action = "Criado" if created else "Atualizado"
                self.stdout.write(self.style.SUCCESS(f"Sensor {action}: {obj.tipo} - {obj.mac_address}"))

        except Exception as e:
            self.stdout.write(self.style.ERROR(f"Erro: {e}"))