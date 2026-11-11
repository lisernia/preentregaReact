import { useState } from 'react';
import styles from './Item.module.css';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const moneda = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 });

export function Item({ id, nombre, precio, stock, imagen }) {
  const [cantidad, setCantidad] = useState(0);
  const [esFavorito, setEsFavorito] = useState(() => {
    try {
      return localStorage.getItem(`producto-favorito:${id}`) === 'true';
    } catch {
      return false;
    }
  });
  const [imagenFallida, setImagenFallida] = useState(false);

  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({ id, nombre, precio, stock, imagen }, cantidad)

  }
  const cambiarFavorito = () => {
    const nuevoFavorito = !esFavorito;
    try {
      if (nuevoFavorito) {
        localStorage.setItem(`producto-favorito:${id}`, 'true');
      } else {
        localStorage.removeItem(`producto-favorito:${id}`);
      }
    } catch {
      alert('No se pudo guardar el favorito en este navegador.');
      return;
    }
    setEsFavorito(nuevoFavorito);
  };



  return (
    <article className={styles.card}>
      <div className={styles.foto}>
        {imagen && !imagenFallida
          ? <img src={imagen} alt={nombre} loading="lazy" onError={() => setImagenFallida(true)} />
          : <div className={styles.sinFoto}>Foto no disponible</div>}
        <button type="button" className={styles.favorito} onClick={cambiarFavorito} aria-pressed={esFavorito} aria-label={`${esFavorito ? 'Quitar' : 'Agregar'} ${nombre} ${esFavorito ? 'de' : 'a'} favoritos`}>
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

          <Link className={styles.masInfo} to={`/productos/${id}`}>Más info... <span aria-hidden="true">↗</span></Link>

          <button type="button" className={styles.agregar} disabled={cantidad === 0 || cantidad > stock} onClick={handleAddToCart}>Agregar al carrito</button>
        </div>
      </div>
    </article>
  );
}

