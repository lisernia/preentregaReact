import { useState } from 'react';
import styles from './Item.module.css';

const moneda = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 });

export function Item({ nombre, precio, stock, imagen }) {
  const [cantidad, setCantidad] = useState(0);
  const [esFavorito, setEsFavorito] = useState(false);
  const [imagenFallida, setImagenFallida] = useState(false);

  const agregarAlCarrito = () => {
    if (cantidad > 0 && cantidad <= stock) {
      alert(`Agregaste ${cantidad} unidades de ${nombre} al carrito.`);
    }
  };

  return (
    <article className={styles.card}>
      <div className={styles.foto}>
        {imagen && !imagenFallida
          ? <img src={imagen} alt={nombre} loading="lazy" onError={() => setImagenFallida(true)} />
          : <div className={styles.sinFoto}>Foto no disponible</div>}
        <button type="button" className={styles.favorito} onClick={() => setEsFavorito(!esFavorito)} aria-pressed={esFavorito} aria-label={`${esFavorito ? 'Quitar' : 'Agregar'} ${nombre} ${esFavorito ? 'de' : 'a'} favoritos`}>
          <span aria-hidden="true">{esFavorito ? '♥' : '♡'}</span>
        </button>
      </div>
      <div className={styles.contenido}>
        <h3>{nombre}</h3>
        <p className={styles.precio}>{moneda.format(precio)}</p>
        <p className={styles.stock}>{stock > 0 ? `${stock} disponibles` : 'Agotado por el momento'}</p>
        <div className={styles.acciones}>
          <div className={styles.contador} role="group" aria-label={`Cantidad de ${nombre}`}>
            <button type="button" disabled={cantidad === 0} onClick={() => setCantidad(cantidad - 1)} aria-label={`Quitar una unidad de ${nombre}`}>−</button>
            <span aria-live="polite">{cantidad}</span>
            <button type="button" disabled={cantidad >= stock} onClick={() => setCantidad(cantidad + 1)} aria-label={`Sumar una unidad de ${nombre}`}>+</button>
          </div>
          <button type="button" className={styles.agregar} disabled={cantidad === 0 || cantidad > stock} onClick={agregarAlCarrito}>Agregar al carrito</button>
        </div>
      </div>
    </article>
  );
}

