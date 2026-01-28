import Header from '../components/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import { CartProvider } from '../context/useCartContext';

export default function AuthLayout() {
  return (
    <CartProvider>
      <main>
        <Header />
        <div>
          <Outlet />
        </div>
        <Footer />
      </main>
    </CartProvider>
  );
}
