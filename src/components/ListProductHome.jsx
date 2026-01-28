import { useEffect, useState } from 'react';
import { handProduct } from '../services/product/handleProduct';
import { Link } from 'react-router-dom';
import { handleCart } from '../services/cart/handleCart';
import useCartContext from '../context/useCartContext';
import { fetchCart } from '../redux/features/reduxThunk';
import { useDispatch } from 'react-redux';
export default function ListProductHome() {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const loadDataProduct = async () => {
      const res = await handProduct.getProduct();
      if (res.response === 'success') {
        setProducts(res.data);
      }
    };
    loadDataProduct();
  }, []);
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  return (
    <div className="features_items">
      <h2 className="title text-center">Features Items</h2>
      {products.length > 0 &&
        products.map((product, index) => {
          let images = [];
          if (product.image && product.image !== 'undefined') {
            try {
              images = JSON.parse(product.image);
            } catch (e) {
              images = [];
            }
          }
          return (
            <div className="col-sm-4" key={index}>
              <div className="product-image-wrapper">
                <div className="single-products">
                  <div className="productinfo text-center">
                    {images.length > 0 && (
                      <img
                        src={`http://localhost/laravel8/laravel8/public/upload/product/${product.id_user}/${images[0]}`}
                        alt=""
                      />
                    )}
                    <h2>{product.price}</h2>
                    <p>{product.name}</p>
                    <a href="#" className="btn btn-default add-to-cart">
                      <i className="fa fa-shopping-cart"></i>Add to cart
                    </a>
                  </div>
                  <div className="product-overlay">
                    <div className="overlay-content">
                      <h2>{product.price}</h2>
                      <p>{product.name}</p>
                      <a href="#" className="btn btn-default add-to-cart">
                        <i className="fa fa-shopping-cart"></i>Add to cart
                      </a>
                    </div>
                  </div>
                </div>
                <div className="choose">
                  <ul className="nav nav-pills nav-justified">
                    <li>
                      <a href="#">
                        <i className="fa fa-plus-square"></i>Add to wishlist
                      </a>
                    </li>
                    <li>
                      <Link to={`/product/detail/${product.id}`}>
                        <i className="fa fa-plus-square"></i>Add to compare
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
