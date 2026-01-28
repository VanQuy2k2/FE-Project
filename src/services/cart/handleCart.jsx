import axios from 'axios';

export const handleCart = {
  getCart: async (data) => {
    const res = await axios.post(
      'http://localhost/laravel8/laravel8/public/api/product/cart',
      data,
    );
    return res.data;
  },
};
