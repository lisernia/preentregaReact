import { useState } from "react";
import FormularioProducto from "../FormularioProducto/FormularioProducto";


function FormularioContainer({ onProducto, productoInicial, onCancelar }) {

    const [datosForm, setDatosForm] = useState(
        {
            id: productoInicial?.id ?? '',
            nombre: productoInicial?.nombre ?? '',
            precio: productoInicial?.precio ?? '',
            stock: productoInicial?.stock ?? '',
            imagen: productoInicial?.imagen ?? ''
        });

    // 1. Nuevo estado para el archivo de imagen
    const [imagenFile, setImagenFile] = useState(null);
    const [enviando, setEnviando] = useState(false);


    const manejarChange = (e) => {
        const { name, value } = e.target;
        setDatosForm({
            ...datosForm,
            [name]: value
        });


    }

    const manejarEnvio = async (evento) => {
        evento.preventDefault();
        const formulario = evento.currentTarget;
        // Validamos que el usuario haya seleccionado una imagen
        if (!imagenFile && !productoInicial) {
            alert("Por favor, selecciona una imagen para el producto.");
            return;
        }
        // --- Lógica para subir la imagen a Imgbb ---
        setEnviando(true);
        try {
            let urlImagen = datosForm.imagen;
            if (imagenFile) {
                const apiKey = import.meta.env.VITE_API_KEY;
                const formData = new FormData();
                formData.append('image', imagenFile);
                const respuestaImgbb = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                    method: 'POST',
                    body: formData,
                });
                const datosImgbb = await respuestaImgbb.json();
                if (!respuestaImgbb.ok || !datosImgbb.success) throw new Error('La subida de la imagen a Imgbb falló.');
                urlImagen = datosImgbb.data.url;
            }
                if (onProducto) {
                    const guardado = await onProducto(datosForm, urlImagen);
                    if (guardado) {
                        setDatosForm({ id: '', nombre: '', precio: '', stock: '', imagen: '' });
                        setImagenFile(null);
                        formulario.reset();
                    }
                }
        } catch (error) {
            console.error("Error en el proceso de envío:", error);
            alert("Hubo un error al subir la imagen. Por favor, intentá de nuevo.");
        } finally {
            setEnviando(false);
        }
    };





    const manejarCambio = (evento) => {
        // Se mantiene igual
    };
    // 2. Nueva función para manejar el cambio del input de tipo "file"
    const manejarCambioImagen = (evento) => {
        setImagenFile(evento.target.files[0]);
    };
    return (
        <FormularioProducto
            datosForm={datosForm}
            manejarChange={manejarChange}
            manejarEnvio={manejarEnvio}
            // Pasamos la nueva función como prop
            manejarCambioImagen={manejarCambioImagen}
            editando={Boolean(productoInicial)}
            onCancelar={onCancelar}
            enviando={enviando}
        />

    )

}




export default FormularioContainer;
