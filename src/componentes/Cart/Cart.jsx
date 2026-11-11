// src/componentes/Cart/Cart.jsx
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import styles from './Cart.module.css';

const moneda = new Intl.NumberFormat('es-AR', {
    style: 'currency', currency: 'ARS', maximumFractionDigits: 0,
});

const Cart = () => {

    const { cart, clearCart, removeFromCart, getCartTotal, getCartQuantity } = useCart();

    if (cart.length === 0) {
        return (
            <section className={styles.vacio}>
                <span className={styles.icono} aria-hidden="true">♡</span>
                <h1>Tu carrito está vacío</h1>
                <p>Elegí algo rico de nuestro menú para empezar.</p>
                <Link className={styles.boton} to="/productos">Ver nuestra comida →</Link>
            </section>
        );
    }

    return (
        <section aria-labelledby="titulo-carrito">
            <div className={styles.encabezado}>
                <div>
                    <p className={styles.etiqueta}>LA COCINA DE CASA</p>
                    <h1 id="titulo-carrito">Tu carrito</h1>
                    <p>{getCartQuantity()} unidades para disfrutar.</p>
                </div>
                <Link className={styles.enlace} to="/productos">← Seguir eligiendo</Link>
            </div>
            <div className={styles.contenedor}>
                <div className={styles.lista}>
                    {cart.map((producto) => (
                        <article className={styles.tarjeta} key={producto.id}>
                            <Link to={`/productos/${producto.id}`} className={styles.foto}>
                                <img src={producto.imagen} alt={producto.nombre} />
                            </Link>
                            <div className={styles.datos}>
                                <h2><Link to={`/productos/${producto.id}`}>{producto.nombre}</Link></h2>
                                <p className={styles.suave}>{moneda.format(producto.precio)} por unidad</p>
                                <span className={styles.cantidad}>Cantidad: {producto.quantity}</span>
                            </div>
                            <div className={styles.acciones}>
                                <p className={styles.subtotal}>{moneda.format(producto.precio * producto.quantity)}</p>
                                <button className={styles.eliminar} type="button" onClick={() => removeFromCart(producto.id)} aria-label={`Eliminar ${producto.nombre} del carrito`}>Eliminar</button>
                            </div>
                        </article>
                    ))}
                </div>
                <aside className={styles.resumen} aria-labelledby="titulo-resumen">
                    <h2 id="titulo-resumen">Resumen de tu pedido</h2>
                    <div className={styles.linea}><span>Unidades</span><span>{getCartQuantity()}</span></div>
                    <div className={styles.total}><span>Total</span><strong>{moneda.format(getCartTotal())}</strong></div>
                    <button className={styles.vaciar} type="button" onClick={clearCart}>Vaciar carrito</button>
                </aside>
            </div>
        </section>
    );
};

export default Cart;
