// En /components/Layout/Layout.jsx
import Header from '../Header/Header';
import Footer from '../componentes/Footer/Footer';
import { Outlet } from 'react-router-dom';

export function Layout() {
    return (
        <div>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>);
}
