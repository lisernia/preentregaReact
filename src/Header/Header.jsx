import { Link } from 'react-router-dom';
import styles from './.module.css';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';


function Header() {

    const { getCartQuantity } = useCart();
    const { usuario, cargandoAuth, cerrarSesion } = useAuth();
    const [errorSesion, setErrorSesion] = useState('');

    const salir = async () => {
        try { await cerrarSesion(); setErrorSesion(''); }
        catch { setErrorSesion('No se pudo cerrar la sesión. Intentá nuevamente.'); }
    };

    const totalItems = getCartQuantity();

    return (
        <header id="inicio" className={styles.header}>
            <Link to="/" className={styles.brand}>La cocina de casa</Link>
            <nav aria-label="Navegación principal">
                <ul className={styles.links}>
                    <li><Link to="/">Inicio</Link></li>
                    <li><Link to="/productos">Nuestra comida</Link></li>
                    <li><Link to="/nosotros">Nosotros</Link></li>
                    <li><Link to="/gestion">Gestión de productos</Link></li>
                    {!cargandoAuth && (usuario
                        ? <li><button type="button" className={styles.sesion} onClick={salir}>Cerrar sesión</button></li>
                        : <li><Link to="/login">Ingresar</Link></li>)}
                    <li>
                        <Link to="/carrito" className={styles.carrito} aria-label={`Ver carrito: ${totalItems} productos`} title="Ver carrito">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M2 3h3l3 12h11l3-9H6" />
                                <circle cx="9" cy="20" r="1" />
                                <circle cx="19" cy="20" r="1" />
                            </svg>
                            {totalItems > 0 && <span className={styles.totalItems} aria-hidden="true">{totalItems > 99 ? '99+' : totalItems}</span>}
                        </Link>
                    </li>
                </ul>
            </nav>
            {errorSesion && <p role="alert">{errorSesion}</p>}
        </header>
    );
}
export default Header;
