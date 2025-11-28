from django.core.management.base import BaseCommand
from api.models import Responsavel
import pandas as pd
import os

class Command(BaseCommand):
    help = "Importa os responsáveis a partir de um arquivo CSV"

    def handle(self, *args, **options):
        caminho = os.path.join('population', 'nomes.csv')
        
        try:
            df = pd.read_csv(caminho, encoding='utf-8-sig')
            
            # Limpa espaços em branco dos nomes
            df['nome'] = df['nome'].astype(str).str.strip()

            for index, row in df.iterrows():
                obj, created = Responsavel.objects.get_or_create(
                    nome=row['nome']
                )
                if created:
                    self.stdout.write(self.style.SUCCESS(f"Responsável criado: {obj.nome}"))
                else:
                    self.stdout.write(f"Responsável já existe: {obj.nome}")
                    
        except FileNotFoundError:
            self.stdout.write(self.style.ERROR(f"Arquivo não encontrado em: {caminho}"))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"Erro: {e}"))