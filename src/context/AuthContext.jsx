import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../fileStore/config';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(null);
    const [cargandoAuth, setCargandoAuth] = useState(true);

    useEffect(() => onAuthStateChanged(auth, (actual) => {
        setUsuario(actual);
        setCargandoAuth(false);
    }, () => {
        setUsuario(null);
        setCargandoAuth(false);
    }), []);

    const registrar = (email, clave) => createUserWithEmailAndPassword(auth, email, clave);
    const iniciarSesion = (email, clave) => signInWithEmailAndPassword(auth, email, clave);
    const cerrarSesion = () => signOut(auth);

    return <AuthContext.Provider value={{ usuario, cargandoAuth, registrar, iniciarSesion, cerrarSesion }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const contexto = useContext(AuthContext);
    if (!contexto) throw new Error('useAuth debe usarse dentro de AuthProvider');
    return contexto;
}
