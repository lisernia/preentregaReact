import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../fileStore/config';
import { EquipoList } from '../EquipoList/EquipoList';

export function EquipoContainer({ Mensaje }) {
    const [equipo, setEquipo] = useState([]);
    const [error, setError] = useState(false);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        let activo = true;
        getDocs(collection(db, 'equipo'))
            .then((resultado) => {
                if (activo) setEquipo(resultado.docs.map((integrante) => ({ ...integrante.data(), id: integrante.id })));
            })
            .catch(() => { if (activo) setError(true); })
            .finally(() => { if (activo) setCargando(false); });
        return () => { activo = false; };
    }, []);

    if (cargando) return <p role="status">Cargando equipo, por favor esperá...</p>;
    if (error) return <p role="alert">No se pudo cargar el equipo. Intentá nuevamente más tarde.</p>;
    if (equipo.length === 0) return <p>Por el momento no hay integrantes para mostrar.</p>;
    return <EquipoList equipo={equipo} mensaje={Mensaje || 'Equipo'} />;
}
