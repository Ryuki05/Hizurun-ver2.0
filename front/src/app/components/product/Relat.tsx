import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { Irish_Grover, M_PLUS_1p } from 'next/font/google';
import Link from 'next/link';

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

const Relat = () => {
    const { id } = useParams(); // useParamsを使用してIDを取得
    const [product, setProduct] = useState<Product | null>(null);
    // const [quantity, setQuantity] = useState<number>(1);
    // const [rating, setRating] = useState<number | null>(null);
    // const [comment, setComment] = useState<string>('');
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



    if (!product) {
        return <div>読み込み中...</div>;
    }

  return (
    <div>
        <section className='pb-80' >
                <h2 className={`${mplus1p.className}`}>関連商品</h2>
                <div className={`flex overflow-hidden space-x-4 popular-products`}>
                    {product.relatedProducts.length > 0 ? (
                        product.relatedProducts.map((relatedProduct) => (
                            <div className="flex-none w-64 p-4 bg-white rounded shadow" key={relatedProduct.id}>
                                <div>
                                    {/* <Image
                                        src={relatedProduct.image_path}
                                        alt={relatedProduct.name}
                                        width={300}
                                        height={300}
                                    /> */}
                                    <Image
                                        src="/image/Hizurun-ico.png"
                                        alt="Hizurun Icon"
                                        width={200}
                                        height={200}
                                        style={{ objectFit: "cover" }}
                                        className="rounded"
                                    />
                                    <div className={`mt-2 text-center `}>
                                        <h5 className={`${mplus1p.className}`}>{relatedProduct.name}</h5>
                                        <p>価格: ¥{new Intl.NumberFormat().format(relatedProduct.price)}</p>
                                        <Link className={`text-hizurun-gr`} href={`/products/${relatedProduct.id}`}>詳細を見る</Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>関連商品がありません。</p>
                    )}
                </div>
            </section>
    </div>
  )
}

export default Relat
