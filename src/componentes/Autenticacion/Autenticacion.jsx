import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './Autenticacion.module.css';

const mensajes = {
    'auth/invalid-credential': 'El correo o la contraseña son incorrectos.',
    'auth/email-already-in-use': 'Ya existe una cuenta con ese correo.',
    'auth/invalid-email': 'Ingresá un correo válido.',
    'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres.',
    'auth/too-many-requests': 'Demasiados intentos. Esperá un momento y volvé a intentar.',
    'auth/network-request-failed': 'No se pudo conectar. Revisá tu conexión e intentá nuevamente.',
    'auth/operation-not-allowed': 'El acceso con correo y contraseña no está habilitado en Firebase.',
};

export default function Autenticacion({ registro = false }) {
    const { usuario, cargandoAuth, registrar, iniciarSesion } = useAuth();
    const [email, setEmail] = useState('');
    const [clave, setClave] = useState('');
    const [error, setError] = useState('');
    const [enviando, setEnviando] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const destino = location.state?.desde === '/gestion' ? '/gestion' : '/';

    async function enviar(evento) {
        evento.preventDefault();
        setError('');
        setEnviando(true);
        try {
            await (registro ? registrar(email.trim(), clave) : iniciarSesion(email.trim(), clave));
            navigate(destino, { replace: true });
        } catch (fallo) {
            setError(mensajes[fallo.code] || 'No se pudo completar la operación. Intentá nuevamente.');
        } finally {
            setEnviando(false);
        }
    }

    if (cargandoAuth) return <p role="status">Comprobando sesión...</p>;
    if (usuario) return <Navigate to={destino} replace />;

    return (
        <section className={styles.contenedor}>
            <h1>{registro ? 'Crear cuenta' : 'Iniciar sesión'}</h1>
            <p>{registro ? 'Registrate con tu correo y una contraseña.' : 'Ingresá con tu cuenta para continuar.'}</p>
            <form onSubmit={enviar} className={styles.formulario}>
                <label htmlFor="email">Correo electrónico</label>
                <input id="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <label htmlFor="clave">Contraseña</label>
                <input id="clave" type="password" autoComplete={registro ? 'new-password' : 'current-password'} minLength={6} value={clave} onChange={(e) => setClave(e.target.value)} required />
                {error && <p role="alert" className={styles.error}>{error}</p>}
                <button type="submit" disabled={enviando}>{enviando ? 'Procesando...' : registro ? 'Registrarme' : 'Ingresar'}</button>
            </form>
            <p>{registro ? '¿Ya tenés cuenta? ' : '¿No tenés cuenta? '}<Link to={registro ? '/login' : '/registro'} state={location.state}>{registro ? 'Iniciá sesión' : 'Registrate'}</Link></p>
        </section>
    );
}
