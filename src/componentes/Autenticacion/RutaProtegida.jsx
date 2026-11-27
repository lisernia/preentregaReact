import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function RutaProtegida() {
    const { usuario, cargandoAuth } = useAuth();
    const ubicacion = useLocation();
    if (cargandoAuth) return <p role="status">Comprobando sesión...</p>;
    if (!usuario) return <Navigate to="/login" state={{ desde: ubicacion.pathname }} replace />;
    return <Outlet />;
}
