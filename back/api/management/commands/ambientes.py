from django.core.management.base import BaseCommand
from api.models import Ambiente, Responsavel, Local
import pandas as pd
import os

class Command(BaseCommand):
    help = "Importa os ambientes vinculando a Locais e Responsáveis"

    def handle(self, *args, **options):
        caminho = os.path.join('population', 'ambientes.csv')
        
        try:
            df = pd.read_csv(caminho, encoding='utf-8-sig')
            
            for index, row in df.iterrows():
                # 1. Busca o Responsável pelo ID (conforme seu CSV de ambientes)
                # Se no CSV for o nome, mude para filter(nome=...)
                id_resp = row['responsavel']
                responsavel = Responsavel.objects.filter(id=id_resp).first()

                # 2. Busca o Local pelo ID (o CSV usa 1, 2, 3, 4)
                id_local = row['local']
                local_obj = Local.objects.filter(id=id_local).first()

                if not responsavel:
                    self.stdout.write(self.style.WARNING(f"Responsável ID {id_resp} não encontrado."))
                    continue
                
                if not local_obj:
                    self.stdout.write(self.style.WARNING(f"Local ID {id_local} não encontrado."))
                    continue

                # 3. Cria o ambiente
                obj, created = Ambiente.objects.get_or_create(
                    local=local_obj,  # Passa o objeto Local recuperado do banco
                    defaults={
                        'descricao': row.get('descricao', ''),
                        'responsavel': responsavel
                    }
                )
                if created:
                    self.stdout.write(self.style.SUCCESS(f"Ambiente criado para: {local_obj.local}"))
                else:
                    self.stdout.write(f"Ambiente já existe: {local_obj.local}")

        except Exception as e:
            self.stdout.write(self.style.ERROR(f"Erro: {e}"))