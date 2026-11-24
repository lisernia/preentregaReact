import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './ItemDetalle.module.css';
import { readProducto } from '../../services/productosServices';

const moneda = new Intl.NumberFormat('es-AR', {
    style: 'currency', currency: 'ARS', maximumFractionDigits: 0,
});

function ItemDetalle() {
    const { id } = useParams();
    const [resultado, setResultado] = useState(null);
    const [imagenFallida, setImagenFallida] = useState(null);

    useEffect(() => {
        let activo = true;

        async function cargarProducto() {
            try {
                const producto = await readProducto(id);
                if (activo) setResultado({ id, producto });
            } catch (error) {
                if (activo) setResultado({ id, error: error.message });
            }
        }

        cargarProducto();
        return () => { activo = false; };
    }, [id]);

    if (!resultado || resultado.id !== id) return <p role="status">Cargando producto...</p>;

    if (resultado.error || !resultado.producto) {
        return (
            <section className={styles.estado}>
                <h1>{resultado.error ? 'No pudimos cargar el producto' : 'Producto no encontrado'}</h1>
                <p>{resultado.error || 'El producto que buscás no está en nuestro menú.'}</p>
                <Link to="/productos">Volver a nuestra comida</Link>
            </section>
        );
    }

    const { nombre, precio, stock, imagen, detalles } = resultado.producto;

    return (
        <section aria-labelledby="titulo-producto">
            <Link className={styles.volver} to="/productos">← Volver a nuestra comida</Link>
            <article className={styles.detalle}>
                {imagen && imagenFallida !== imagen
                    ? <img className={styles.foto} src={imagen} alt={nombre} onError={() => setImagenFallida(imagen)} />
                    : <div className={styles.sinFoto}>Foto no disponible</div>}
                <div className={styles.contenido}>
                    <p className={styles.etiqueta}>NUESTRA COMIDA</p>
                    <h1 id="titulo-producto">{nombre}</h1>
                    <p className={styles.descripcion}>{detalles || 'Una propuesta de nuestra cocina casera.'}</p>
                    <p className={styles.precio}>{moneda.format(precio)}</p>
                    <p className={styles.stock}>{stock > 0 ? `${stock} unidades disponibles` : 'Agotado por el momento'}</p>
                </div>
            </article>
        </section>
    );


}
export default ItemDetalle
