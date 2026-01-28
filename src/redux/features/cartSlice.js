const initState = {
  carts: [],
};

const cartsReducer = (state = initState, action) => {
  console.log(action.payload, 'action');
  switch (action.type) {
    case 'FETCH_CART_SUCCESS':
      return {
        ...state,
        carts: action.payload,
      };

    default:
      return state;
  }
};

export default cartsReducer;
