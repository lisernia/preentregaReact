import { useEffect, useState } from 'react';
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../fileStore/config';
import { useAuth } from '../../context/AuthContext';

function VerificarAdministrador({ uid }) {
    const [resultado, setResultado] = useState(null);

    useEffect(() => {
        let activo = true;
        getDoc(doc(db, 'administradores', uid))
            .then((documento) => {
                if (activo) setResultado({ uid, autorizado: documento.exists() });
            })
            .catch(() => {
                if (activo) setResultado({ uid, error: true });
            });
        return () => { activo = false; };
    }, [uid]);

    if (!resultado || resultado.uid !== uid) return <p role="status">Comprobando permisos...</p>;
    if (resultado.error) return <p role="alert">No se pudieron comprobar tus permisos. Revisá la conexión y volvé a intentar.</p>;
    if (!resultado.autorizado) return <section><h1>Acceso restringido</h1><p>Tu cuenta no tiene permisos de administración.</p><Link to="/">Volver al inicio</Link></section>;
    return <Outlet />;
}

export default function RutaProtegida() {
    const { usuario, cargandoAuth } = useAuth();
    const ubicacion = useLocation();
    if (cargandoAuth) return <p role="status">Comprobando sesión...</p>;
    if (!usuario) return <Navigate to="/login" state={{ desde: ubicacion.pathname }} replace />;
    return <VerificarAdministrador key={usuario.uid} uid={usuario.uid} />;
}
