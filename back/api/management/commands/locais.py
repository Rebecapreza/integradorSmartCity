from django.core.management.base import BaseCommand
from api.models import Local
import pandas as pd
import os

class Command(BaseCommand):
    help = "Importa os locais da escola a partir do CSV"

    def handle(self, *args, **options):
        # Caminho do arquivo
        caminho = os.path.join('population', 'locais.csv')
        
        try:
            # Lê o CSV
            df = pd.read_csv(caminho, encoding='utf-8-sig')
            
            for index, row in df.iterrows():
                nome_local = str(row['local']).strip()
                
                # Cria ou atualiza o Local
                obj, created = Local.objects.get_or_create(
                    local=nome_local
                )
                
                if created:
                    self.stdout.write(self.style.SUCCESS(f"Local criado: {obj.local}"))
                else:
                    self.stdout.write(f"Local já existe: {obj.local}")

        except FileNotFoundError:
            self.stdout.write(self.style.ERROR(f"Arquivo não encontrado em: {caminho}"))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"Erro: {e}"))