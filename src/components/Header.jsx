import { Link } from 'react-router-dom';
import logo from '../assets/images/home/logo.png';
import useCartContext from '../context/useCartContext';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchCart } from '../redux/features/reduxThunk';
export default function Header() {
  const token = JSON.parse(localStorage.getItem('token'));
  const cart = JSON.parse(localStorage.getItem('data')) || {};
  const dispatch = useDispatch();
  const { sum } = useCartContext();
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const cartRedux = useSelector((state) => state.cart.carts);
  const cartTotal = cartRedux.reduce((sum, item) => {
    return sum + item.qty;
  }, 0);
  console.log(cartTotal, 'cartTotal');
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  return (
    <div>
      <header id="header">
        <div className="header_top">
          <div className="container">
            <div className="row">
              <div className="col-sm-6">
                <div className="contactinfo">
                  <ul className="nav nav-pills">
                    <li>
                      <a href="">
                        <i className="fa fa-phone"></i> +2 95 01 88 821
                      </a>
                    </li>
                    <li>
                      <a href="">
                        <i className="fa fa-envelope"></i> info@domain.com
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="social-icons pull-right">
                  <ul className="nav navbar-nav">
                    <li>
                      <a href="">
                        <i className="fa fa-facebook"></i>
                      </a>
                    </li>
                    <li>
                      <a href="">
                        <i className="fa fa-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a href="">
                        <i className="fa fa-linkedin"></i>
                      </a>
                    </li>
                    <li>
                      <a href="">
                        <i className="fa fa-dribbble"></i>
                      </a>
                    </li>
                    <li>
                      <a href="">
                        <i className="fa fa-google-plus"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="header-middle">
          <div className="container">
            <div className="row">
              <div className="col-md-4 clearfix">
                <div className="logo pull-left">
                  <a href="index.html">
                    <img src={logo} alt="" />
                  </a>
                </div>
                <div className="btn-group pull-right clearfix">
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-default dropdown-toggle usa"
                      data-toggle="dropdown"
                    >
                      USA
                      <span className="caret"></span>
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <a href="">Canada</a>
                      </li>
                      <li>
                        <a href="">UK</a>
                      </li>
                    </ul>
                  </div>

                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-default dropdown-toggle usa"
                      data-toggle="dropdown"
                    >
                      DOLLAR
                      <span className="caret"></span>
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <a href="">Canadian Dollar</a>
                      </li>
                      <li>
                        <a href="">Pound</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-8 clearfix">
                <div className="shop-menu clearfix pull-right">
                  <ul className="nav navbar-nav">
                    <li>
                      <Link to={!token ? '/login' : '/account'}>
                        <i className="fa fa-user"></i> Account
                      </Link>
                    </li>
                    <li>
                      <a href="">
                        <i className="fa fa-star"></i> Wishlist
                      </a>
                    </li>
                    <li>
                      <Link to="/cart">
                        <i className="fa fa-crosshairs"></i> Checkout
                      </Link>
                      <span className="quantity">{cartTotal}</span>
                    </li>
                    <li>
                      <Link to="/cart">
                        <i className="fa fa-shopping-cart"></i> Cart
                      </Link>
                      <span className="quantity">{sum}</span>
                    </li>
                    {token ? (
                      <li onClick={handleLogout}>
                        <Link to="/login">
                          <i className="fa fa-lock"></i>Logout
                        </Link>
                      </li>
                    ) : (
                      <li>
                        <Link to="/login">
                          <i className="fa fa-lock"></i>Login
                        </Link>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="header-bottom">
          <div className="container">
            <div className="row">
              <div className="col-sm-9">
                <div className="navbar-header">
                  <button
                    type="button"
                    className="navbar-toggle"
                    data-toggle="collapse"
                    data-target=".navbar-collapse"
                  >
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>
                </div>
                <div className="mainmenu pull-left">
                  <ul className="nav navbar-nav collapse navbar-collapse">
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li className="dropdown">
                      <a href="#">
                        Shop<i className="fa fa-angle-down"></i>
                      </a>
                      <ul role="menu" className="sub-menu">
                        <li>
                          <a href="shop.html">Products</a>
                        </li>
                        <li>
                          <a href="product-details.html">Product Details</a>
                        </li>
                        <li>
                          <a href="checkout.html">Checkout</a>
                        </li>
                        <li>
                          <a href="cart.html" className="active">
                            Cart
                          </a>
                        </li>
                        <li>
                          <Link to="/login">Login</Link>
                        </li>
                      </ul>
                    </li>
                    <li className="dropdown">
                      <a href="#">
                        Blog<i className="fa fa-angle-down"></i>
                      </a>
                      <ul role="menu" className="sub-menu">
                        <li>
                          <Link to="/blog">Blog List</Link>
                        </li>
                        <li>
                          <Link to="/blog-detail">Blog Single</Link>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="404.html">404</a>
                    </li>
                    <li>
                      <a href="contact-us.html">Contact</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="search_box pull-right">
                  <input type="text" placeholder="Search" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
