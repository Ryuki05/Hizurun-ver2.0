import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const WishlistPage = () => {
    const [wishlistItems, setWishlistItems] = useState<any[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchWishlist = async () => {
            const response = await fetch('/api/user/wishlist'); // UserControllerのウィッシュリストAPIエンドポイントを指定
            const data = await response.json();
            setWishlistItems(data.wishlistItems);
        };

        fetchWishlist();
    }, []);

    const handleAddToCart = async (productId: number) => {
        const response = await fetch('/api/cart/store', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '',
            },
            body: JSON.stringify({ product_id: productId, quantity: 1 }),
        });

        if (response.ok) {
            // カートに追加成功時の処理
            alert('カートに追加しました！');
        } else {
            // エラーハンドリング
            console.error('カートに追加できませんでした。');
        }
    };

    return (
        <div>
            <h1>ウィッシュリスト</h1>

            {wishlistItems.length > 0 ? (
                <div>
                    {wishlistItems.map(item => (
                        <div key={item.id}>
                            <div>
                                <img src={item.image_path} alt={item.name} />
                                <div>
                                    <h5>{item.name}</h5>
                                    <p>価格: ¥{new Intl.NumberFormat().format(item.price)}</p>
                                    <div>
                                        <a href={`/products/${item.id}`}>詳細を見る</a>
                                        <button onClick={() => handleAddToCart(item.id)}>カートに追加</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div>
                    ウィッシュリストは空です。<a href="/products">商品一覧</a>から商品を追加してください。
                </div>
            )}
        </div>
    );
};

export default WishlistPage;
