import './App.css';
import { Layout } from './layout/Layout';
import { ItemListContainer } from './componentes/ItemListContainer/ItemListContainer';
import FormularioContainer from './componentes/FormularioContainer/FormularioContainer';
import { Routes, Route, Link } from 'react-router-dom';
import { EquipoContainer } from './componentes/Equipo/EquipoContainer/EquipoContainer';
import ItemDetalle from './componentes/ItemDetalle/ItemDetalle';
import Cart from './componentes/Cart/Cart';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={
          <>
            <section className="portada">
              <div className="portadaTexto">
                <p className="antetitulo">LA COCINA DE CASA</p>
                <h1>El sabor de comer <em>casero.</em></h1>
                <p>Comida hecha con cariño para disfrutar todos los días.</p>
                <Link className="botonMenu" to="/productos">Ver nuestra comida →</Link>
              </div>
              <div className="portadaFoto">
                <img src="/images/pizza.jpg" alt="Pizza casera de nuestro menú" />
              </div>
            </section>
            <section id="nuestra-comida" className="menu">
              <ItemListContainer json="/data/productos.json" Mensaje="Nuestra comida" />
            </section>
            <section id="nosotros" className="menu">
              <EquipoContainer Mensaje="Nuestro equipo" />
            </section>
            <section aria-label="Alta de producto">
              <FormularioContainer />
            </section>
          </>
        } />
        <Route path="/productos" element={<ItemListContainer
          json="/data/productos.json"
          Mensaje={"Productos destacados"} />} />
        <Route path="/nosotros" element={<EquipoContainer

          Mensaje={"Nuestro Equipo"} />} />
        <Route path="/alta" element={<FormularioContainer />} />

        <Route path="/productos/:id" element={<ItemDetalle />} />

         <Route path="/carrito" element={<Cart/>} /> 

        <Route path="*" element={<h1>Pagina no encontrada</h1>} />
      </Route>
    </Routes>);

}
export default App;

