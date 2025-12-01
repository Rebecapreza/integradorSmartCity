import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    // Verifica se existe o token no localStorage 
    const token = localStorage.getItem('token');

    // Se tiver token, renderiza o conteúdo (Outlet), senão manda pro login
    return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;