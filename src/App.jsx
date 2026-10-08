import './App.css';
import { Layout } from './layout/Layout';
import { ItemListContainer } from './componentes/ItemListContainer/ItemListContainer';
import FormularioContainer from './componentes/FormularioContainer/FormularioContainer';

function App() {
  return (
    <Layout>
      <section className="portada" aria-labelledby="titulo-portada">
        <div className="portadaTexto">
          <p className="antetitulo">HECHO EN CASA, PARA VOS</p>
          <h1 id="titulo-portada">El sabor de casa,<br /><em>en cada bocado.</em></h1>
          <p>Pizza, hamburguesas y ensaladas para disfrutar sin ponerte a cocinar. Elegí tu favorito y dale sabor a tu día.</p>
          <a className="botonMenu" href="#nuestra-comida">Explorar el menú <span aria-hidden="true">↗</span></a>
        </div>
        <div className="portadaFoto">
          <img src="https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=1000&q=80" alt="Pizza margarita con tomate y albahaca" fetchPriority="high" />
          <span className="notaFoto">Un clásico que siempre dan ganas de repetir.</span>
        </div>
      </section>
      <section id="nuestra-comida" aria-label="Nuestra comida" className="menu">
        <p className="antetitulo">¿QUÉ TENÉS GANAS DE COMER?</p>
        <ItemListContainer json="/data/productos.json" Mensaje="Nuestros platos favoritos" />
      </section>
      <details className="gestion">
        <summary>Agregar un plato al catálogo</summary>
        <FormularioContainer />
      </details>
    </Layout>
  );
}
export default App;

