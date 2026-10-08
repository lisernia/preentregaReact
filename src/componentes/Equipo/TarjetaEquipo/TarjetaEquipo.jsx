import styles from './TarjetaEquipo.module.css';

export function TarjetaEquipo({ nombre, email, puesto, foto, descripcion }) {
    return (
        <article className={styles.card}>
            <img className={styles.avatar} src={foto} alt={nombre} loading="lazy" />
            <h3>{nombre}</h3>
            <p className={styles.puesto}>{puesto}</p>
            {descripcion && <p className={styles.descripcion}>{descripcion}</p>}
            <a className={styles.email} href={`mailto:${email}`}>{email}</a>
        </article>
    );
}
