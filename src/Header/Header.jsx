import styles from './.module.css';

function Header() {
    return (
       <header id="inicio" className={styles.header}>
            <a href="#inicio" className={styles.brand}>La cocina de casa</a>
            <nav aria-label="Navegación principal">
                <ul className={styles.links}>
                    <li><a href="#inicio">Inicio</a></li>
                    <li><a href="#nuestra-comida">Nuestra comida</a></li>
                    <li><a href="#nosotros">Nosotros</a></li>
                    <li><a href="#contacto">Contacto</a></li>
                </ul>
            </nav>
        </header>
    );
}
export default Header;
