// En /componentes/ItemListContainer/ItemListContainer.jsx
import { ItemList } from "../ItemList/ItemList";
import styles from "./ItemListContainer.module.css";
import { useEffect, useState } from 'react';

import { readProductos } from "../../services/productosServices"




export function ItemListContainer({ json, Mensaje }) {
    const [productos, setProductos] = useState([]);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {

        readProductos()
            .then((datos) => {
                setProductos(datos);
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setCargando(false);
            });
    }, []);

    if (cargando) { return <p>Cargando productos, por favor espere...</p>; }

    if (error) { return <p>Error: {error}</p>; }
    return (
        <div>

            <div>
                <ItemList productos={productos} mensaje={Mensaje} />
            </div>
        </div>
    );
}