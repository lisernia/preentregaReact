import { useState } from "react";
import FormularioProducto from "../FormularioProducto/FormularioProducto";


function FormularioContainer() {

    const [datosForm, setDatosForm] = useState(
        {
            id: '',
            nombre: '',
            precio: '',
            stock: '',
            imagen: ''
        });

    // 1. Nuevo estado para el archivo de imagen
    const [imagenFile, setImagenFile] = useState(null);


    const manejarChange = (e) => {
        const { name, value } = e.target;
        setDatosForm({
            ...datosForm,
            [name]: value
        });


    }

    const manejarEnvio = async (evento) => {
        evento.preventDefault();
        // Validamos que el usuario haya seleccionado una imagen
        if (!imagenFile) {
            alert("Por favor, selecciona una imagen para el producto.");
            return;
        }
        // --- Lógica para subir la imagen a Imgbb ---
        const apiKey = import.meta.env.VITE_API_KEY;
        const formData = new FormData();
        formData.append('image', imagenFile);
        try {
            console.log("Subiendo imagen a Imgbb...");
            const respuestaImgbb = await
                fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                    method: 'POST',
                    body: formData,
                });
            const datosImgbb = await respuestaImgbb.json();
            if (datosImgbb.success) {
                console.log("Imagen subida con éxito. URL:", datosImgbb.data.url);
                // Unimos la URL de la imagen con el resto de los datos del formulario
                const productoCompleto = {
                    ...datosForm,
                    // Agregamos la URL obtenida
                    urlImagen: datosImgbb.data.url
                };

                // Por el momento hacemos un console.log
                console.log('Enviando los siguientes datos COMPLETOS a la API:',
                    productoCompleto);
            } else {
                throw new Error('La subida de la imagen a Imgbb falló.');
            }
        } catch (error) {
            console.error("Error en el proceso de envío:", error);
            alert("Hubo un error al subir la imagen. Por favor, intentá de nuevo.");
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
        />

    )

}




export default FormularioContainer;
