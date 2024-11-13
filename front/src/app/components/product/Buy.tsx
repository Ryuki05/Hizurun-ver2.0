import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
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
  image_paths: string[];  // ここを配列として追加
  reviews: Review[];
  relatedProducts: RelatedProduct[];
}

const Buy = () => {
  const { id } = useParams(); // useParamsを使用してIDを取得
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
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

  // 購入処理
  const handlePurchase = async () => {
    if (isLoggedIn && product) {
      const response = await fetch(`/api/purchase`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_id: product.id,
          quantity,
        }),
      });

      if (response.ok) {
        console.log('購入が完了しました');
      } else {
        console.error('購入に失敗しました');
      }
    } else if (!isLoggedIn) {
      console.error('ログインが必要です');
    }
  };

  if (!product) {
    return <div>読み込み中...</div>;
  }

  return (
    <div>
      <div className='flex flex-row'>
        <div>
          {/* 商品画像スライダー部分 */}
          {product.image_paths && product.image_paths.length > 0 ? (
            <div className="overflow-x-auto flex items-center space-x-2">
              {product.image_paths.map((image, index) => (
                <div key={index} className="flex-none">
                  <Image
                    src={image}  // 画像パスをそのまま使用
                    alt={`商品画像${index + 1}`}
                    width={500}
                    height={500}
                    style={{ objectFit: "cover" }}
                    className="rounded"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div>画像がありません</div>
          )}
        </div>
        <div className='flex-col'>
          <h1>{product.name}</h1>
          <p className={`m-2 ${mplus1p.className}`}>価格: <span className={`${irishGrover.className}`}>¥{new Intl.NumberFormat().format(product.price)}</span></p>
          <p>{product.description}</p>
          <div>
            <label className={`m-2 ${mplus1p.className}`} htmlFor="quantity">数量</label>
            <input
              className={`text-right m-2 w-20 border border-gray-300 ${irishGrover.className}`}
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              min="1"
              max={product.stock}
            />
            <div className='flex-col m-2'>
              <button className={`btn2-hizurun-gr w-96 ${mplus1p.className}`} onClick={handlePurchase}>カートに追加</button>
            </div>
            <div className='flex-col m-2'>
              <button className={`btn-hizurun-gr w-96 ${mplus1p.className}`} onClick={handlePurchase}>購入</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Buy;
