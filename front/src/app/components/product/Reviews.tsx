import React, { useEffect, useState } from 'react'
// import Image from 'next/image'
import { useParams } from 'next/navigation';
import { Irish_Grover, M_PLUS_1p } from 'next/font/google';

const irishGrover = Irish_Grover({
    subsets: ['latin'],
    weight: '400',
});

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
    const { id } = useParams(); // useParamsを使用してIDを取得
    const [product, setProduct] = useState<Product | null>(null);
    // const [quantity, setQuantity] = useState<number>(1);
    const [rating, setRating] = useState<number | null>(null);
    const [comment, setComment] = useState<string>('');
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        const fetchProduct = async () => {
            if (id) {
                const response = await fetch(`http://localhost:8000/api/products/${id}`);
                if (response.ok) {
                    const productData: Product = await response.json();
                    setProduct(productData);
                } else {
                    console.error('商品情報の取得に失敗しました');
                }
            }
        };

        fetchProduct();
    }, [id]);

    // ログイン状態をチェックする関数
    useEffect(() => {
        const checkLoginStatus = async () => {
            // ログイン状態を確認するAPI呼び出しを行う（仮のエンドポイント）
            const response = await fetch('/api/check-login');
            if (response.ok) {
                const data = await response.json();
                setIsLoggedIn(data.isLoggedIn); // APIからの結果に基づいてログイン状態を更新
            }
        };

        checkLoginStatus();
    }, []);

    // フォームの送信処理
    const handleSubmitReview = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (product && rating !== null) {
            const response = await fetch(`/api/reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    product_id: product.id,
                    rating,
                    comment,
                }),
            });

            if (response.ok) {
                console.log('レビューが投稿されました');
                setComment('');
                setRating(null); // 送信後に評価をリセット
            } else {
                console.error('レビューの投稿に失敗しました');
            }
        }
    };


    if (!product) {
        return <div>読み込み中...</div>;
    }

  return (
    <div>

        <section className={`${mplus1p.className}`}>
            <h2>レビュー</h2>
            {product.reviews.length > 0 ? (
                product.reviews.map((review) => (
                    <div key={review.id}>
                        <h5>評価: {review.rating}/5</h5>
                        <p>{review.comment}</p>
                        <p>投稿者: {review.user.name}</p>
                    </div>
                ))
            ) : (
                <p>まだレビューがありません。</p>
            )}

            {isLoggedIn && (
                <form onSubmit={handleSubmitReview}>
                    <div>
                        <label htmlFor="rating">評価</label>
                        <select
                            name="rating"
                            id="rating"
                            value={rating || ''}
                            onChange={(e) => setRating(Number(e.target.value))}
                            required
                        >
                            <option value="">選択してください</option>
                            {[1, 2, 3, 4, 5].map((i) => (
                                <option key={i} value={i}>{i}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="comment">コメント</label>
                        <textarea
                            name="comment"
                            id="comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <button type="submit">レビューを投稿</button>
                </form>
            )}
        </section>
    </div>
  )
}

export default Reviews
