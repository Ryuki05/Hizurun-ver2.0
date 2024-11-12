import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const AccountPage = () => {
    const [user, setUser] = useState<any>(null);
    const [orders, setOrders] = useState<any[]>([]);
    const [wishlist, setWishlist] = useState<any[]>([]);
    const router = useRouter();

    useEffect(() => {
        // ユーザー情報を取得
        const fetchUserData = async () => {
            const response = await fetch('/api/user'); // UserControllerのAPIエンドポイントを指定
            const data = await response.json();
            setUser(data.user);
            setOrders(data.orders);
            setWishlist(data.wishlist);
        };

        fetchUserData();
    }, []);

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const response = await fetch('/api/user/update', {
            method: 'PATCH',
            body: formData,
        });

        if (response.ok) {
            // 更新成功時の処理
            router.reload(); // ページをリロードして最新の情報を取得
        } else {
            // エラーハンドリング
            console.error('更新エラーが発生しました。');
        }
    };

    return (
        <div>
            <h1>アカウント情報</h1>

            <div>
                <section>
                    <div>
                        <h2>個人情報</h2>
                    </div>
                    <div>
                        {user && (
                            <form onSubmit={handleUpdate}>
                                <div>
                                    <label htmlFor="name">名前</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        defaultValue={user.name}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email">メールアドレス</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        defaultValue={user.email}
                                        required
                                    />
                                </div>
                                <button type="submit">更新</button>
                            </form>
                        )}
                    </div>
                </section>
            </div>

            <div>
                <section>
                    <div>
                        <h2>注文履歴</h2>
                    </div>
                    <div>
                        {orders.length > 0 ? (
                            orders.map(order => (
                                <div key={order.id}>
                                    <h5>注文番号: {order.id}</h5>
                                    <p>合計: ¥{new Intl.NumberFormat().format(order.total_amount)}</p>
                                    <p>状態: {order.status}</p>
                                    <a href={`/orders/${order.id}`}>詳細を見る</a>
                                </div>
                            ))
                        ) : (
                            <p>注文履歴がありません。</p>
                        )}
                    </div>
                </section>
            </div>

            <section>
                <div>
                    <h2>ウィッシュリスト</h2>
                </div>
                <div>
                    {wishlist.length > 0 ? (
                        wishlist.map(product => (
                            <div key={product.id}>
                                <div>
                                    <img src={product.image_path} alt={product.name} />
                                    <div>
                                        <h5>{product.name}</h5>
                                        <p>価格: ¥{new Intl.NumberFormat().format(product.price)}</p>
                                        <a href={`/products/${product.id}`}>詳細を見る</a>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>
                            <p>ウィッシュリストは空です。</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default AccountPage;
