import { collection, deleteDoc, doc, getDocs, runTransaction } from 'firebase/firestore';
import { db } from '../fileStore/config';

const cuponesDB = collection(db, 'cupones');

export async function leerCupones() {
    const resultado = await getDocs(cuponesDB);
    return resultado.docs.map((documento) => ({ ...documento.data(), id: documento.id }));
}

export async function crearCupon(codigo, descuento) {
    const referencia = doc(cuponesDB, codigo);
    await runTransaction(db, async (transaccion) => {
        const existente = await transaccion.get(referencia);
        if (existente.exists()) throw new Error('Ya existe un cupón con ese código.');
        transaccion.set(referencia, { codigo, descuento });
    });
    return { id: codigo, codigo, descuento };
}

export function eliminarCupon(id) {
    return deleteDoc(doc(cuponesDB, id));
}
