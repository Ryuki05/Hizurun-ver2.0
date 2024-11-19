'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // next/router から next/navigation へ変更

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    // 仮のデータを取得する処理
    const fetchWishlist = async () => {
      try {
        const response = await fetch('/api/wishlist');
        const data = await response.json();
        setWishlistItems(data);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    };
    fetchWishlist();
  }, []);

  return (
    <div>
      <h1>My Wishlist</h1>
      <ul>
        {wishlistItems.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default WishlistPage;
