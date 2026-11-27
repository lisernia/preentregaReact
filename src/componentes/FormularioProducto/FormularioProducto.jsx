import styles from "./FormularioProducto.module.css";

function FormularioProducto( { datosForm, manejarChange, manejarEnvio, manejarCambioImagen, editando, onCancelar, enviando, error }) {

    return (

        <form className={styles.formulario} onSubmit={manejarEnvio}>
            <div className={styles.encabezado}>
                <p className={styles.etiqueta}>LA COCINA DE CASA</p>
                <h1>{editando ? 'Editar producto' : 'Agregar nuevo producto'}</h1>
                <p>Sumá una nueva propuesta a nuestro menú casero.</p>
            </div>
            <div>
                <label htmlFor="id">ID del producto</label>
                <input type="text" id="id" name="id" value={datosForm.id} onChange={manejarChange} required readOnly={editando} />
            </div>
            <div>

                <label htmlFor="nombre"> Nombre del producto</label>
                <input type="text"
                    id="nombre"
                    name="nombre"
                    placeholder="ej: Tarta de verduras"
                    value={datosForm.nombre}
                    onChange={manejarChange} required
                ></input>
            </div>
            <div className={styles.fila}>
            <div>
                <label htmlFor="precio">Precio</label>
                <input type="number"
                    id="precio"
                    name="precio"
                    placeholder="ej: 95"
                    value={datosForm.precio}
                    onChange={manejarChange} required min="0.01" step="any"
                ></input>

            </div>
            <div>
                <label htmlFor="stock">Stock</label>
                <input type="number"
                    id="stock"
                    name="stock"
                    placeholder="ej: 10"
                    value={datosForm.stock}
                    onChange={manejarChange} required min="0" step="1"
                ></input>

            </div>

            </div>
            <div className={styles.oferta}>
                <input type="checkbox" id="oferta" name="oferta" checked={datosForm.oferta} onChange={manejarChange} />
                <label htmlFor="oferta">Mostrar este producto en ofertas</label>
            </div>
            <div>
                <label htmlFor="imagen-url">URL o ruta local de la imagen</label>
                <input type="text" id="imagen-url" name="imagen" value={datosForm.imagen} onChange={manejarChange} placeholder="https://ejemplo.com/imagen.jpg o /images/imagen.jpg" />
            </div>
            <div className={styles.archivo}>
                <label htmlFor="imagen">O subir una foto desde tu dispositivo</label>
                <p>Si seleccionás un archivo, se usará en lugar de la URL. La subida requiere configurar ImgBB.</p>
                <input type="file"
                    id="imagen"
                    name="archivoImagen"
                    accept="image/*"
                    onChange={manejarCambioImagen}

                ></input>

            </div>

            {error && <p role="alert" className={styles.error}>{error}</p>}
            <button className={styles.boton} type="submit" disabled={enviando}>{enviando ? 'Guardando...' : 'Guardar producto'} <span aria-hidden="true">→</span></button>
            {editando && <button type="button" disabled={enviando} onClick={onCancelar}>Cancelar edición</button>}

        </form>


    )


}

export default FormularioProducto;
