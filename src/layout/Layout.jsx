// En /components/Layout/Layout.jsx
import Header from '../Header/Header';
import Footer from '../componentes/Footer/Footer';
// Todo lo que pongamos dentro de <Layout> en App.jsx será el "children".
export function Layout({ children }) {
    return (
        <div>
            <Header />
            <main>
                {children}
            </main>
            <Footer />
        </div>);
}
