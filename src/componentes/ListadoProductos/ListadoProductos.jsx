import styles from './ListadoProductos.module.css';
import { Item } from '../Item/Item';

function ListadoProductos({ productos, onEditar, onEliminar, procesando }) {
    return (
        <section className={styles.section}>
            <div className={styles.grid}>
                {productos.map(prod => (
                    <div key={prod.id} className={styles.producto}>
                        <Item {...prod}>
                            <div className={styles.acciones}>
                                <button type="button" disabled={procesando} onClick={() => { onEditar(prod); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Editar</button>
                                <button className={styles.eliminar} type="button" disabled={procesando} onClick={() => onEliminar(prod)}>Eliminar</button>
                            </div>
                        </Item>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default ListadoProductos;
