
'use client';
import React, { useEffect, useState } from 'react';
import { useParams, } from 'next/navigation';
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

const Reviews = () => {
  const { id } = useParams();
//   const router = useRouter();
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

//   const handleViewAllReviews = () => {
//     router.push(`/reviews?productId=${id}`);
//   };

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
      <section className={`${mplus1p.className} p-6`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">レビュー</h2>
          {/* <button
            onClick={handleViewAllReviews}
            className="bg-[#ffb4c1] text-white px-4 py-2 rounded hover:bg-[#fbc2c9]"
          >
            全てのレビューを見る
          </button> */}
        </div>

        {/* レビュー投稿フォーム */}
        <form onSubmit={handleSubmitReview} className="mb-8 bg-white p-4 rounded shadow">
          <h3 className="text-xl mb-4">レビューを投稿</h3>
          <div className="mb-4">
            <label className="block mb-2">評価</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                  className={`text-2xl ${
                    value <= rating ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-2">コメント</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-2 border rounded"
              rows={4}
              required
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#ffb4c1] text-white px-4 py-2 rounded hover:bg-[#fbc2c9] disabled:opacity-50"
          >
            {isSubmitting ? '投稿中...' : 'レビューを投稿'}
          </button>
        </form>

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
      </section>
    </div>
  );
};

export default Reviews;
