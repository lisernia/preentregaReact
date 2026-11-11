import styles from "./FormularioProducto.module.css";

function FormularioProducto( { datosForm, manejarChange, manejarEnvio , manejarCambioImagen}) {

    return (

        <form className={styles.formulario} onSubmit={manejarEnvio}>
            <div className={styles.encabezado}>
                <p className={styles.etiqueta}>LA COCINA DE CASA</p>
                <h1>Agregar nuevo producto</h1>
                <p>Sumá una nueva propuesta a nuestro menú casero.</p>
            </div>
            <div>

                <label htmlFor="nombre"> Nombre del producto</label>
                <input type="text"
                    id="nombre"
                    name="nombre"
                    placeholder="ej: Tarta de verduras"
                    value={datosForm.nombre}
                    onChange={manejarChange}
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
                    onChange={manejarChange}
                ></input>

            </div>
            <div>
                <label htmlFor="stock">Stock</label>
                <input type="number"
                    id="stock"
                    name="stock"
                    placeholder="ej: 10"
                    value={datosForm.stock}
                    onChange={manejarChange}
                ></input>

            </div>

            </div>
            <div className={styles.archivo}>
                <label htmlFor="imagen">Foto del producto</label>
                <input type="file"
                    id="imagen"
                    name="imagen"
                    onChange={manejarCambioImagen}

                ></input>

            </div>

            <button className={styles.boton} type="submit">Guardar producto <span aria-hidden="true">→</span></button>

        </form>


    )


}

export default FormularioProducto;
