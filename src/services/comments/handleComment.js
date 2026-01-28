import axios from 'axios';

const token = JSON.parse(localStorage.getItem('token'));
export const handleComments = {
  postComments: async (data) => {
    const res = await axios.post(
      'http://localhost/laravel8/laravel8/public/api/blog/comment/id',
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    );
    return res.data.data;
  },
};
