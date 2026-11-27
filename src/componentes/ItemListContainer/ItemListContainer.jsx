import { useEffect, useState } from 'react';
import { ItemList } from '../ItemList/ItemList';
import { readProductos, readProductosEnOferta } from '../../services/productosServices';

export function ItemListContainer({ Mensaje, soloOfertas = false }) {
    const [productos, setProductos] = useState([]);
    const [error, setError] = useState(false);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        let activo = true;
        const consulta = soloOfertas ? readProductosEnOferta() : readProductos();
        consulta.then((datos) => { if (activo) setProductos(datos); })
            .catch(() => { if (activo) setError(true); })
            .finally(() => { if (activo) setCargando(false); });
        return () => { activo = false; };
    }, [soloOfertas]);

    if (cargando) return <p role="status">Cargando productos, por favor esperá...</p>;
    if (error) return <p role="alert">No se pudieron cargar los productos. Intentá nuevamente más tarde.</p>;
    if (productos.length === 0) return <section><h2>{Mensaje}</h2><p>{soloOfertas ? 'Por el momento no hay productos en oferta.' : 'Por el momento no hay productos disponibles.'}</p></section>;
    return <ItemList productos={productos} mensaje={Mensaje} />;
}
