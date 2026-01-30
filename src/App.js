import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './layout/Layout';
import Blog from './pages/Blog';
import Blog_Detail from './pages/Blog_Detail';
import Auth from './pages/Auth';
import AuthLayout from './layout/AuthLayout';
import Account from './pages/Account';
import AddProduct from './pages/AddProduct';
import MyProduct from './pages/MyProduct';
import EditProduct from './pages/EditProduct';
import Home from './pages/Home';
import Product_Detail from './pages/Product_Detail';
import Cart from './pages/Cart';
import WishList from './pages/WishList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/detail/:id" element={<Blog_Detail />} />
          <Route path="/account" element={<Account />} />
          <Route path="/account/product/add" element={<AddProduct />} />
          <Route path="/account/product/list" element={<MyProduct />} />
          <Route path="/account/product/edit/:id" element={<EditProduct />} />
          <Route path="/product/detail/:id" element={<Product_Detail />} />
          <Route path="/product/wishlist" element={<WishList />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Auth />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
