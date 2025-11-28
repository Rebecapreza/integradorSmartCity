from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ResponsavelViewSet, AmbienteViewSet, SensorViewSet, 
    HistoricoViewSet, RegisterView
)
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = DefaultRouter()
router.register(r'responsaveis', ResponsavelViewSet)
router.register(r'ambientes', AmbienteViewSet)
router.register(r'sensores', SensorViewSet)
router.register(r'historico', HistoricoViewSet)

urlpatterns = [
    # Rotas da API (CRUDs)
    path('', include(router.urls)),
    
    # Autenticação JWT (Critério 14)
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # Registro de Usuário
    path('register/', RegisterView.as_view(), name='register'),
]