// src/componentes/Gestion/Gestion.jsx
import { useState, useEffect } from 'react';
import FormularioContainer from '../FormularioContainer/FormularioContainer';
import { createProducto, readProductos, updateProducto, deleteProducto } from '../../services/productosServices';
import ListadoProductos from '../ListadoProductos/ListadoProductos';
import styles from './Gestion.module.css';

const Gestion = () => {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [procesando, setProcesando] = useState(false);
    const [productoEditado, setProductoEditado] = useState(null);

    useEffect(() => {
        readProductos()
            .then(setProductos)
            .catch(() => setError('No se pudieron cargar los productos.'))
            .finally(() => setCargando(false));
    }, []);

    const manejarEnvio = async (datosForm, urlImagen) => {
        const producto = {
            ...datosForm,
            precio: Number(datosForm.precio),
            stock: Number(datosForm.stock),
            imagen: urlImagen
        };
        if (productoEditado) {
            const { id, ...datos } = producto;
            const guardado = await manejarEditar(id, datos);
            if (guardado) setProductoEditado(null);
            return guardado;
        }
        console.log('Datos del producto:', producto);
        try {
            const id = await createProducto(producto);
            setProductos((prev) => [...prev, { ...producto, id }]);
            alert("Producto creado correctamente");
            return true;
        }

        catch (error) {
            console.error(error);
            alert(error.message || 'No se pudo crear el producto');
            return false;
        }
    };
    const manejarEditar = async (id, datos) => {
        setProcesando(true);
        try {
            await updateProducto(id, datos);
            setProductos((prev) => prev.map((producto) => producto.id === id ? { ...producto, ...datos } : producto));
            alert('Producto actualizado correctamente.');
            return true;
        } catch (error) {
            console.error(error);
            alert('No se pudo editar el producto.');
            return false;
        } finally {
            setProcesando(false);
        }
    };

    const manejarEliminar = async (producto) => {
        if (!window.confirm(`¿Querés eliminar ${producto.nombre}?`)) return;
        setProcesando(true);
        try {
            await deleteProducto(producto.id);
            setProductos((prev) => prev.filter((item) => item.id !== producto.id));
            setProductoEditado((actual) => actual?.id === producto.id ? null : actual);
        } catch (error) {
            console.error(error);
            alert('No se pudo eliminar el producto.');
        } finally {
            setProcesando(false);
        }
    };
    return (
        <main className={styles.gestion}>
            <h1>Gestión de productos</h1>
            <br />
            <FormularioContainer key={productoEditado?.id ?? 'nuevo'} productoInicial={productoEditado} onProducto={manejarEnvio} onCancelar={() => setProductoEditado(null)} />
            <h2 className={styles.tituloLista}>Lista de productos</h2>
            {cargando && <p>Cargando productos...</p>}
            {error && <p role="alert">{error}</p>}
            {!cargando && !error && productos.length === 0 && <p>No hay productos disponibles.</p>}
            {!cargando && !error && <ListadoProductos productos={productos} onEditar={setProductoEditado} onEliminar={manejarEliminar} procesando={procesando} />}
        </main>
    );
};


export default Gestion;

