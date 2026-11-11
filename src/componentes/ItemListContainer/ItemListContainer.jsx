// En /componentes/ItemListContainer/ItemListContainer.jsx
import { ItemList } from "../ItemList/ItemList";
import styles from "./ItemListContainer.module.css";
import { useEffect, useState } from 'react';

import { db } from "../../fileStore/config";
import { collection, getDocs } from 'firebase/firestore';


export function ItemListContainer({ json, Mensaje }) {
    const [productos, setProductos] = useState([]);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const productosDB = collection(db, "productos");

        getDocs(productosDB).then((resp) => {
            setProductos(
                resp.docs.map((doc) => {
                    return { ...doc.data(), id: doc.id }
                })
            );
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