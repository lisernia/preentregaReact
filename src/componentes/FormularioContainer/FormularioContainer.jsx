import { useState } from "react";
import FormularioProducto from "../FormularioProducto/FormularioProducto";


function FormularioContainer({ onProducto, productoInicial, onCancelar }) {

    const [datosForm, setDatosForm] = useState(
        {
            id: productoInicial?.id ?? '',
            nombre: productoInicial?.nombre ?? '',
            precio: productoInicial?.precio ?? '',
            stock: productoInicial?.stock ?? '',
            imagen: productoInicial?.imagen ?? '',
            oferta: productoInicial?.oferta === true
        });

    const [imagenFile, setImagenFile] = useState(null);
    const [enviando, setEnviando] = useState(false);
    const [error, setError] = useState('');


    const manejarChange = (e) => {
        const { name, value, type, checked } = e.target;
        setDatosForm({
            ...datosForm,
            [name]: type === 'checkbox' ? checked : value
        });


    }

    const manejarEnvio = async (evento) => {
        evento.preventDefault();
        const formulario = evento.currentTarget;
        setError('');
        const nombre = datosForm.nombre.trim();
        const imagen = datosForm.imagen.trim();
        if (!nombre) {
            setError('Ingresá el nombre del producto.');
            return;
        }
        if (!Number.isFinite(Number(datosForm.precio)) || Number(datosForm.precio) <= 0) {
            setError('El precio debe ser mayor que cero.');
            return;
        }
        if (!Number.isInteger(Number(datosForm.stock)) || Number(datosForm.stock) < 0) {
            setError('El stock debe ser un número entero mayor o igual a cero.');
            return;
        }
        if (!imagenFile && !imagen) {
            setError('Ingresá una URL o ruta de imagen, o seleccioná un archivo.');
            return;
        }
        if (!imagenFile && !/^(https?:\/\/[^\s]+|\/(?!\/)[^\s]+|\.\.?\/[^\s]+)$/i.test(imagen)) {
            setError('Ingresá una URL válida que comience con http:// o https://, o una ruta local.');
            return;
        }
        setEnviando(true);
        try {
            let urlImagen = imagen;
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
                    const guardado = await onProducto({ ...datosForm, nombre }, urlImagen);
                    if (guardado) {
                        setDatosForm({ id: '', nombre: '', precio: '', stock: '', imagen: '', oferta: false });
                        setImagenFile(null);
                        formulario.reset();
                    }
                }
        } catch (error) {
            console.error("Error en el proceso de envío:", error);
            setError("No se pudo subir la imagen. Revisá la configuración de ImgBB o usá una URL.");
        } finally {
            setEnviando(false);
        }
    };





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
            error={error}
        />

    )

}




export default FormularioContainer;
