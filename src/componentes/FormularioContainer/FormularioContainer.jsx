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


    const manejarChange = (e) => {
        const { name, value } = e.target;
        setDatosForm({
            ...datosForm,
            [name]: value
        });


    }

    const manejarEnvio = async (evento) => {
        evento.preventDefault();
      /*  const apiKey = 'TU-API-KEY'; //  ¡Aquí va tu clave!
        const formData = new FormData();
        formData.append('image', imagenFile);

        const respuesta = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
            method: 'POST',
            body: formData,
        });
        const imgbbData = await respuesta.json();
        const urlImagen = imgbbData.data.url;

        const productoCompleto = { ...datosForm, urlImagen: urlImagen };*/
        console.log('Producto listo para enviar:'  );
    };

    return (
         <FormularioProducto  datosForm={datosForm} manejarChange={manejarChange} manejarEnvio={manejarEnvio} />

    )

}




export default FormularioContainer;