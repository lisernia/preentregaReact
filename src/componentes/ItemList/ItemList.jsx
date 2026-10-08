// En /components/ItemList/ItemList.jsx
import { Item } from "../Item/Item";
import styles from './ItemList.module.css';
export function ItemList({ productos, mensaje }) {
    return (
        <section className={styles.section}>
            <h2>{mensaje}</h2>
            <div className={styles.grid}>
            {productos.map(prod => (
                <Item key={prod.id} {...prod} />
            ))}
            </div>
        </section>
    );
}
