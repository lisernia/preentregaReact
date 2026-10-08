
function FormularioProducto( { datosForm, manejarChange, manejarEnvio }) {

    return (

        <form onSubmit={manejarEnvio}>
            <h3> Agregar nuevo producto</h3>
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

            <div>
                <label htmlFor="imagen">Imagen</label>
                <input type="file"
                    id="imagen"
                    name="imagen"
                    onChange={manejarChange}

                ></input>

            </div>

            <button type="submit">Guardar Producto</button>

        </form>


    )


}

export default FormularioProducto;
