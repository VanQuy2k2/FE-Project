import { handleCart } from '../../services/cart/handleCart';

// dispatch làm tham số của hàm fetchCart cũng giống như useDispatch() vậy đều dùng để gửi dispatch dạng {} qua redux
//  vì do trong trường hợp này không phải là nằm trong react component nên sử dụng dispatch làm tham số để gửi dispatch qua redux
export const fetchCart = () => async (dispatch) => {
  const data = JSON.parse(localStorage.getItem('data'));
  const res = await handleCart.getCart(data);
  const results = res.data;
  dispatch({
    type: 'FETCH_CART_SUCCESS',
    payload: results,
  });
};
