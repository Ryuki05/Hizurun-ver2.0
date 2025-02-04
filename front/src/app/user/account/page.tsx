'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // app router用のnext/navigationをインポート
import Image from 'next/image';
import axios from 'axios';
import Header from '@/app/components/header/Header';
import { useAuth } from '@/app/contexts/AuthContext';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// 注文情報の型を定義
interface Order {
    id: number;
    total_amount: number;
    status: string;
}

// ウィッシュリスト商品の型を定義
interface WishlistItem {
    id: number;
    name: string;
    price: number;
    image_path: string;
}

const AccountPage = () => {
    const router = useRouter();
    const { user, checkAuth } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initializeAuth = async () => {
            setIsLoading(true);
            const isAuthed = await checkAuth();
            if (!isAuthed) {
                router.push('/sign-up');
                return;
            }
            await fetchUserData();
            setIsLoading(false);
        };

        initializeAuth();
    }, []);

    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const response = await axios.get(`${API_URL}/api/user/account`, {
                withCredentials: true,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.data) {
                setOrders(response.data.orders || []);
                setWishlist(response.data.wishlist || []);
            }
        } catch (error) {
            console.error('ユーザー情報の取得に失敗:', error);
        }
    };

    if (isLoading) {
        return <div>読み込み中...</div>;
    }

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const formData = new FormData(e.currentTarget);
            const response = await axios.patch(
                `${API_URL}/api/user/account`,
                {
                    name: formData.get('name'),
                    email: formData.get('email')
                },
                {
                    withCredentials: true,
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            if (response.data && response.data.user) {
                alert('更新が完了しました');
            }
        } catch (error) {
            console.error('更新エラーが発生しました。', error);
            alert('更新に失敗しました。');
        }
    };

    return (
        <div className="bg-white text-gray-900">
            <Header />
            <div className="max-w-4xl mx-auto px-6 py-8">
                <h1 className="text-4xl font-serif text-hizurun-gr mb-8">アカウント情報</h1>

                {/* プロフィールセクション */}
                <section className="bg-white shadow-lg rounded-lg p-6 mb-8 border-btm-hizurun-gr">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">個人情報</h2>
                    {user && (
                        <form onSubmit={handleUpdate} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="text-sm text-gray-600">名前</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    defaultValue={user.name}
                                    required
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="text-sm text-gray-600">メールアドレス</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    defaultValue={user.email}
                                    required
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                />
                            </div>
                            <button type="submit" className="btn-hizurun-gr mt-4">更新</button>
                        </form>
                    )}
                </section>

                {/* 注文履歴セクション */}
                <section className="bg-white shadow-lg rounded-lg p-6 mb-8 border-btm-hizurun-gr">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">注文履歴</h2>
                    {orders.length > 0 ? (
                        orders.map(order => (
                            <div key={order.id} className="border-b border-gray-200 py-4">
                                <h5 className="text-xl text-gray-800">注文番号: {order.id}</h5>
                                <p className="text-gray-600">合計: ¥{new Intl.NumberFormat().format(order.total_amount)}</p>
                                <p className="text-gray-600">状態: {order.status}</p>
                                <a href={`/orders/${order.id}`} className="text-pink-500 hover:text-pink-600">詳細を見る</a>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">注文履歴がありません。</p>
                    )}
                </section>

                {/* ウィッシュリストセクション */}
                <section className="bg-white shadow-lg rounded-lg p-6 border-btm-hizurun-gr">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">ウィッシュリスト</h2>
                    {wishlist.length > 0 ? (
                        wishlist.map(product => (
                            <div key={product.id} className="flex items-center border-b border-gray-200 py-4">
                                <Image
                                    src={product.image_path}
                                    alt={product.name}
                                    width={100}
                                    height={100}
                                    className="rounded-md mr-4"
                                />
                                <div className="flex-grow">
                                    <h5 className="text-xl text-gray-800">{product.name}</h5>
                                    <p className="text-gray-600">価格: ¥{new Intl.NumberFormat().format(product.price)}</p>
                                    <a href={`/products/${product.id}`} className="text-pink-500 hover:text-pink-600">詳細を見る</a>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>
                            <p className="text-gray-500">ウィッシュリストは空です。</p>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default AccountPage;
