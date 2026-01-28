import { createContext, useContext, useEffect, useState } from 'react';
import { handleCart } from '../services/cart/handleCart';
const CartContext = createContext(null);
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('data')) || {});
  const [carts, setCarts] = useState([]);
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('data')) || {};
    setCart(data);
    const fetchCart = async () => {
      const res = await handleCart.getCart(data);
      if (res.response === 'success') {
        setCarts(res.data);
      }
    };
    fetchCart();
  }, []);

  const sum = Object.values(cart).reduce((acc, qty) => {
    return acc + qty;
  }, 0);

  const increase = (id) => {
    setCarts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty: item.qty + 1 } : item)),
    );
    setCart((prev) => {
      const updateCart = {
        ...prev,
        [id]: (prev[id] || 0) + 1,
      };
      localStorage.setItem('data', JSON.stringify(updateCart));
      return updateCart;
    });
  };

  const decrease = (id) => {
    setCarts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty: item.qty - 1 } : item)),
    );
    setCart((prev) => {
      const updateCart = {
        ...prev,
        [id]: prev[id] - 1,
      };
      localStorage.setItem('data', JSON.stringify(updateCart));
      return updateCart;
    });
  };
  const removeCartItem = (id) => {
    setCarts((prev) => prev.filter((item) => item.id !== id));
    setCart((prev) => {
      if (!prev[id]) return prev;
      const updateCart = { ...prev };
      delete updateCart[id];
      localStorage.setItem('data', JSON.stringify(updateCart));
      return updateCart;
    });
  };

  return (
    <CartContext.Provider
      value={{ sum, setCarts, increase, setCart, decrease, removeCartItem, carts, cart }}
    >
      {children}
    </CartContext.Provider>
  );
};
export default function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useUserContext must be used inside UserProvider');
  }
  return context;
}
