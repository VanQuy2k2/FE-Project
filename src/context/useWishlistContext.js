import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
const WishlistContext = createContext();
export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [uiWishlist, setUiWishlist] = useState([]);
  useEffect(() => {
    const fetchWishlist = async () => {
      const res = await axios.get('http://localhost/laravel8/laravel8/public/api/product/wishlist');
      setUiWishlist(res.data.data);
      const ids = res.data.data.map((item) => item.id);
      setWishlist(ids);
    };

    fetchWishlist();
  }, []);
  const toggleWishlist = async (id) => {
    setUiWishlist(uiWishlist.filter((item) => item.id !== id));
  };

  return (
    <WishlistContext.Provider value={{ setWishlist, wishlist, toggleWishlist, uiWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export default function useWishlistContext() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlistContext must be used inside UserProvider');
  }
  return context;
}
