import axios from 'axios';
import { useState } from 'react';
import { Rating } from 'react-simple-star-rating';

export default function RatingProduct(props) {
  const { id_blog, onRated } = props;
  const [ratingValue, setRatingValue] = useState(0);

  const handleRating = async (rate) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = JSON.parse(localStorage.getItem('token'));
    setRatingValue(rate);
    const data = {
      user_id: user.id,
      blog_id: id_blog,
      rate,
    };

    await axios.post('http://localhost/laravel8/laravel8/public/api/blog/rate/id', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    onRated();
  };

  return (
    <>
      {/* set initial value */}
      <Rating onClick={handleRating} initialValue={ratingValue} />
    </>
  );
}
