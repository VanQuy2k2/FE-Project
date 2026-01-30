import React from 'react';
import useWishlistContext from '../context/useWishlistContext';

export default function WishList() {
  const { uiWishlist, toggleWishlist } = useWishlistContext();
  console.log(uiWishlist, 'uiWishlist');

  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 20 }}>❤️ Sản phẩm yêu thích</h2>

      {uiWishlist.length === 0 ? (
        <p>Chưa có sản phẩm yêu thích nào</p>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: 20,
          }}
        >
          {uiWishlist.map((item) => {
            let images = [];
            if (item.image && item.image !== 'undefined') {
              try {
                images = JSON.parse(item.image);
              } catch (e) {
                images = [];
              }
            }
            return (
              <div
                key={item.id}
                style={{
                  border: '1px solid #eee',
                  borderRadius: 8,
                  padding: 12,
                }}
              >
                <img
                  src={`http://localhost/laravel8/laravel8/public/upload/product/${item.id_user}/${images[0]}`}
                  alt={item.name}
                  style={{
                    width: '100%',
                    height: 160,
                    objectFit: 'cover',
                    borderRadius: 6,
                  }}
                />

                <h3
                  style={{
                    fontSize: 16,
                    margin: '10px 0 6px',
                  }}
                >
                  {item.name}
                </h3>

                <p style={{ color: '#e11d48', fontWeight: 600 }}>{item.price.toLocaleString()} ₫</p>

                <button
                  onClick={() => toggleWishlist(item.id)}
                  style={{
                    marginTop: 10,
                    width: '100%',
                    padding: '8px 0',
                    borderRadius: 6,
                    border: 'none',
                    cursor: 'pointer',
                    background: '#ef4444',
                    color: '#fff',
                  }}
                >
                  ❌ Xoá khỏi yêu thích
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
