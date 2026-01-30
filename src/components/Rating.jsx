// components/Rating.jsx
export default function Rating({ value = 0, max = 5 }) {
  const rounded = Math.round(value);

  return (
    <div className="rating">
      {[...Array(max)].map((_, index) => {
        const star = index + 1;
        return <i key={star} className={`fa ${star <= rounded ? 'fa-star' : 'fa-star-o'}`} />;
      })}
      <span className="rating-number">{value.toFixed(1)}</span>
    </div>
  );
}
