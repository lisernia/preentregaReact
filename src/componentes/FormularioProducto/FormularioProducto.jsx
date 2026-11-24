import styles from "./FormularioProducto.module.css";

function FormularioProducto( { datosForm, manejarChange, manejarEnvio, manejarCambioImagen, editando, onCancelar, enviando }) {

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
                    onChange={manejarChange} required min="0" step="any"
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
            <div className={styles.archivo}>
                <label htmlFor="imagen">Foto del producto</label>
                {editando && <p>Dejá este campo vacío para conservar la imagen actual.</p>}
                <input type="file"
                    id="imagen"
                    name="imagen"
                    onChange={manejarCambioImagen}

                ></input>

            </div>

            <button className={styles.boton} type="submit" disabled={enviando}>{enviando ? 'Guardando...' : 'Guardar producto'} <span aria-hidden="true">→</span></button>
            {editando && <button type="button" disabled={enviando} onClick={onCancelar}>Cancelar edición</button>}

        </form>


    )


}

export default FormularioProducto;
