import { useEffect, useState } from 'react';
import { crearCupon, eliminarCupon, leerCupones } from '../../services/cuponesServices';
import styles from './Cupones.module.css';

export default function Cupones() {
    const [cupones, setCupones] = useState([]);
    const [codigo, setCodigo] = useState('');
    const [descuento, setDescuento] = useState('');
    const [cargando, setCargando] = useState(true);
    const [procesando, setProcesando] = useState(false);
    const [error, setError] = useState('');
    const [aviso, setAviso] = useState('');

    useEffect(() => {
        let activo = true;
        leerCupones()
            .then((datos) => { if (activo) setCupones(datos); })
            .catch(() => { if (activo) setError('No se pudieron cargar los cupones. Recargá la página para intentar nuevamente.'); })
            .finally(() => { if (activo) setCargando(false); });
        return () => { activo = false; };
    }, []);

    async function guardar(evento) {
        evento.preventDefault();
        const codigoNormalizado = codigo.trim().toUpperCase();
        const porcentaje = Number(descuento);
        setError('');
        setAviso('');
        if (!/^[A-Z0-9_-]{1,40}$/.test(codigoNormalizado)) {
            setError('El código debe tener hasta 40 letras, números, guiones o guiones bajos, sin espacios.');
            return;
        }
        if (!Number.isInteger(porcentaje) || porcentaje < 1 || porcentaje > 100) {
            setError('El descuento debe ser un número entero entre 1 y 100.');
            return;
        }
        setProcesando(true);
        try {
            const nuevo = await crearCupon(codigoNormalizado, porcentaje);
            setCupones((anteriores) => [...anteriores, nuevo]);
            setCodigo('');
            setDescuento('');
            setAviso('Cupón creado correctamente.');
        } catch (fallo) {
            setError(fallo.message === 'Ya existe un cupón con ese código.' ? fallo.message : 'No se pudo crear el cupón. Intentá nuevamente.');
        } finally {
            setProcesando(false);
        }
    }

    async function eliminar(cupon) {
        if (!window.confirm(`¿Querés eliminar el cupón ${cupon.codigo}?`)) return;
        setError('');
        setAviso('');
        setProcesando(true);
        try {
            await eliminarCupon(cupon.id);
            setCupones((anteriores) => anteriores.filter((item) => item.id !== cupon.id));
            setAviso('Cupón eliminado correctamente.');
        } catch {
            setError('No se pudo eliminar el cupón. Intentá nuevamente.');
        } finally {
            setProcesando(false);
        }
    }

    return (
        <section className={styles.seccion} aria-labelledby="titulo-cupones">
            <h2 id="titulo-cupones">Gestión de cupones</h2>
            <p>Creá cupones con un porcentaje de descuento.</p>
            <form className={styles.formulario} onSubmit={guardar}>
                <div><label htmlFor="codigo-cupon">Código</label><input id="codigo-cupon" value={codigo} onChange={(evento) => setCodigo(evento.target.value)} maxLength={40} required placeholder="Ej.: BIENVENIDA" /></div>
                <div><label htmlFor="descuento-cupon">Descuento (%)</label><input id="descuento-cupon" type="number" min="1" max="100" step="1" value={descuento} onChange={(evento) => setDescuento(evento.target.value)} required /></div>
                <button type="submit" disabled={procesando || cargando}>{procesando ? 'Procesando...' : 'Crear cupón'}</button>
            </form>
            {error && <p className={styles.error} role="alert">{error}</p>}
            {aviso && <p role="status">{aviso}</p>}
            <h3>Cupones disponibles</h3>
            {cargando ? <p role="status">Cargando cupones...</p> : cupones.length === 0 ? <p>No hay cupones para mostrar.</p> : (
                <ul className={styles.lista}>
                    {cupones.map((cupon) => <li key={cupon.id}><span><strong>{cupon.codigo}</strong> · {cupon.descuento}% de descuento</span><button type="button" disabled={procesando} onClick={() => eliminar(cupon)}>Eliminar</button></li>)}
                </ul>
            )}
        </section>
    );
}
