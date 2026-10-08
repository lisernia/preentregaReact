 
import { TarjetaEquipo } from "../TarjetaEquipo/TarjetaEquipo";
import styles from './EquipoList.module.css';

export function EquipoList({ equipo, mensaje }) {
    return (
        <section className={styles.section}>
            <h2>{mensaje}</h2>
            <div className={styles.grid}>
            {equipo.map(integrante => (
                <TarjetaEquipo key={integrante.id} {...integrante} />
            ))}
            </div>
        </section>
    );
}
