import { EquipoContainer } from "../Equipo/EquipoContainer/EquipoContainer";

function Footer() {
    return (
        <footer>
            <p>La cocina de casa · El sabor de comer casero.</p>
            <section id="nosotros" aria-label="Nosotros">
                <EquipoContainer json="/equipo.json" Mensaje="Equipo" />
            </section>
            <section id="contacto" aria-labelledby="titulo-contacto">
                <h2 id="titulo-contacto">Contacto</h2>
                <p>Próximamente compartiremos nuestros canales de contacto.</p>
            </section>
            
        </footer>
    );
}
export default Footer;

