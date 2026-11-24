import { db } from "../fileStore/config";
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore';


const productosDB = collection(db, "productos");

export const updateProducto = (id, datos) => updateDoc(doc(productosDB, id), datos);
export const deleteProducto = (id) => deleteDoc(doc(productosDB, id));

// Create - guardar un producto con el ID ingresado.
export const createProducto = async (producto) => {
    const { id, ...datos } = producto;
    const idProducto = String(id ?? '').trim();
    if (!idProducto || idProducto.includes('/')) {
        throw new Error('Ingresá un ID válido sin barras.');
    }
    const referencia = doc(productosDB, idProducto);
    const existente = await getDoc(referencia);
    if (existente.exists()) {
        throw new Error('Ya existe un producto con ese ID.');
    }
    await setDoc(referencia, datos);
    return idProducto;
};

// Leer un producto por su ID.
export const readProducto = async (id) => {
    const resultado = await getDoc(doc(productosDB, id));
    return resultado.exists() ? { ...resultado.data(), id: resultado.id } : null;
};

//Read - obtener todos los documentos de nuestra coleccion productos 

export const readProductos = () => {
    return getDocs(productosDB).then((resp) => (

        resp.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
        }))))
}




