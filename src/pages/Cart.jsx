import { useEffect, useState } from 'react';
import { handleCart } from '../services/cart/handleCart';
import useCartContext from '../context/useCartContext';
import { Link } from 'react-router-dom';

export default function Cart() {
  let total = 0;
  const { increase, cart, carts, setCarts, decrease, removeCartItem } = useCartContext();
  console.log('carts', carts);
  useEffect(() => {
    const loadDataCart = async () => {
      const res = await handleCart.getCart(cart);
      if (res.response === 'success') {
        setCarts(res.data);
      }
    };
    loadDataCart();
  }, []);
  return (
    <section id="cart_items">
      <div className="container">
        <div className="breadcrumbs">
          <ol className="breadcrumb">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li className="active">Shopping Cart</li>
          </ol>
        </div>
        <div className="table-responsive cart_info">
          <table className="table table-condensed">
            <thead>
              <tr className="cart_menu">
                <td className="image">Item</td>
                <td className="description"></td>
                <td className="price">Price</td>
                <td className="quantity">Quantity</td>
                <td className="total">Total</td>
                <td></td>
              </tr>
            </thead>

            <tbody>
              {carts.length > 0 &&
                carts.map((item, index) => {
                  let img = item.image ? JSON.parse(item.image) : [];
                  let totalPrice = carts.reduce((sum, item) => {
                    return sum + item.price * item.qty;
                  }, 0);
                  total = totalPrice;
                  return (
                    <tr key={index}>
                      <td className="cart_product">
                        <a href="">
                          <img
                            src={`http://localhost/laravel8/laravel8/public/upload/product/${item.id_user}/${img}`}
                            alt=""
                            style={{ width: '208px', height: '183px' }}
                          />
                        </a>
                      </td>
                      <td className="cart_description">
                        <h4>
                          <a href="">Colorblock Scuba</a>
                        </h4>
                        <p>Web ID: 1089772</p>
                      </td>
                      <td className="cart_price">
                        <p>{item.price}</p>
                      </td>
                      <td className="cart_quantity">
                        <div className="cart_quantity_button">
                          <a className="cart_quantity_up" onClick={() => increase(item.id)}>
                            {' '}
                            +{' '}
                          </a>
                          <input
                            className="cart_quantity_input"
                            type="text"
                            name="quantity"
                            readOnly
                            value={item.qty}
                            size="2"
                          />
                          <a
                            className={`cart_quantity_down ${item.qty === 1 ? 'disabled' : ''}`}
                            onClick={() => decrease(item.id)}
                          >
                            {' '}
                            -{' '}
                          </a>
                        </div>
                      </td>
                      <td className="cart_total">
                        <p className="cart_total_price">{item.qty * item.price}</p>
                      </td>
                      <td className="cart_delete">
                        <a className="cart_quantity_delete" onClick={() => removeCartItem(item.id)}>
                          <i className="fa fa-times"></i>
                        </a>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <div className="total_area">
            <ul>
              <li>
                Shipping Cost
                <span>Free</span>
              </li>
              <li className="total">
                Total
                <span>${total}</span>
              </li>
            </ul>
            <a className="btn btn-default update" href="#">
              Update
            </a>
            <a className="btn btn-default check_out" href="#">
              Check Out
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
