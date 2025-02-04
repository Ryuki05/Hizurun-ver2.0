'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { M_PLUS_1p } from 'next/font/google';

const mplus1p = M_PLUS_1p({
  subsets: ['latin'],
  weight: '500',
});

interface Review {
  id: number;
  rating: number;
  comment: string;
  user: {
    name: string;
  };
}

interface RelatedProduct {
  id: number;
  name: string;
  price: number;
  image_path: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image_path: string;
  stock: number;
  reviews: Review[];
  relatedProducts: RelatedProduct[];
}

const ReviewsPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 商品情報の取得
  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        try {
          const response = await fetch(`http://localhost:8000/api/products/${id}`);
          if (response.ok) {
            const productData: Product = await response.json();
            setProduct(productData);
          }
        } catch (error) {
          console.error('商品情報の取得に失敗しました:', error);
        }
      }
    };

    fetchProduct();
  }, [id]);

  const handleViewAllReviews = () => {
    router.push(`/reviews?productId=${id}`);
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    try {
      const response = await fetch(`http://localhost:8000/api/products/${id}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          rating,
          comment
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'レビューの投稿に失敗しました');
      }

      alert('レビューを投稿しました');
      setComment('');
      setRating(5);

      // 商品情報を再取得
      const productResponse = await fetch(`http://localhost:8000/api/products/${id}`);
      const updatedProduct = await productResponse.json();
      setProduct(updatedProduct);

    } catch (error) {
      console.error('レビュー投稿エラー:', error);
      alert(error instanceof Error ? error.message : 'レビューの投稿に失敗しました');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!product) {
    return <div>読み込み中...</div>;
  }

  return (
    <div>

        {/* レビュー一覧 */}
        <div className="space-y-4">
          {product?.reviews?.length > 0 ? (
            product.reviews.map((review) => (
              <div key={review.id} className="bg-white p-4 rounded shadow">
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-xl ${
                        i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p className="mb-2">{review.comment}</p>
                <p className="text-sm text-gray-600">
                    投稿者: {review.user?.name || 'anonymous'}
                </p>
              </div>
            ))
          ) : (
            <p>まだレビューがありません。</p>
          )}
        </div>

    </div>
  );
};

export default ReviewsPage;
