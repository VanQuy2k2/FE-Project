import Header from '../components/Header';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import Menu_Left from '../components/Menu_Left';
import Menu_Left_Account from '../components/Menu_Left_Account';
import { CartProvider } from '../context/useCartContext';

export default function Layout() {
  const param = useLocation();

  return (
    <CartProvider>
      <main>
        <Header />
        <div className="container">
          <div className="row">
            <div className="col-sm-3">
              {param['pathname'].includes('account') ? <Menu_Left_Account /> : <Menu_Left />}
            </div>
            <div className="col-sm-9">
              <Outlet />
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </CartProvider>
  );
}
