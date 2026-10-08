
import { EquipoList } from "../EquipoList/EquipoList";

import { useEffect, useState } from 'react';


export function EquipoContainer({ json, Mensaje }) {
    const [equipo, setEquipo] = useState([]);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        fetch('/data/equipo.json')
            .then((respuesta) => {
                if (!respuesta.ok) {
                    throw new Error('No se pudo cargar la información de los productos');
                }
                return respuesta.json();
            })
            .then((datos) => {
                setEquipo(datos);
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setCargando(false);
            });
    }, []);

    if (cargando) { return <p>Cargando equipo, por favor espere...</p>; }

    if (error) { return <p>Error: {error}</p>; }
    return (
        <div>
           
            <div>
                <EquipoList equipo={equipo} mensaje="Equipo" />
            </div>
        </div>
    );
}