'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import '../globals.css';

// カートアイテムの型に image プロパティを追加
interface CartItem {
    product_id: number;
    name: string;
    price: number;
    quantity: number;
    image: string; // 画像URL
}

const CartPage = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);

    // カートアイテムを取得する関数を定義
    const fetchCartItems = async () => {
        const response = await fetch('/api/cart');
        if (response.ok) {
            const data = await response.json();
            setCartItems(data.cartItems);
            setTotal(data.total);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchCartItems(); // 初回レンダリング時にカートアイテムを取得
    }, []);

    const updateCart = async (productId: number, quantity: number) => {
        const response = await fetch('/api/cart/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                quantities: {
                    [productId]: quantity,
                },
            }),
        });

        if (response.ok) {
            alert('カートが更新されました');
            fetchCartItems(); // 更新後にカートアイテムを再取得
        } else {
            alert('カートの更新に失敗しました');
        }
    };

    const removeFromCart = async (productId: number) => {
        const response = await fetch('/api/cart', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                product_id: productId,
            }),
        });

        if (response.ok) {
            setCartItems(cartItems.filter(item => item.product_id !== productId));
            alert('商品がカートから削除されました');
        } else {
            alert('削除に失敗しました');
        }
    };

    const addToCart = async (productId: number, quantity: number) => {
        const response = await fetch('/api/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                product_id: productId,
                quantity: quantity,
            }),
        });

        if (response.ok) {
            alert('商品がカートに追加されました');
            fetchCartItems(); // カートアイテムを再取得して更新
        } else {
            alert('カートへの追加に失敗しました');
        }
    };

    if (loading) return <div>読み込み中...</div>;

    return (
        <div>
            <Header />
            <h1>カート</h1>
            {cartItems.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>商品画像</th>
                            <th>商品</th>
                            <th>価格</th>
                            <th>数量</th>
                            <th>小計</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map(item => (
                            <tr key={item.product_id}>
                                <td>
                                    <Image
                                        src="/image/Hizurun-ico.png"
                                        alt="Hizurun Icon"
                                        width={200}
                                        height={200}
                                        style={{ objectFit: "cover" }}
                                        className="rounded"
                                    />
                                </td>
                                <td>{item.name}</td>
                                <td>¥{item.price}</td>
                                <td>
                                    <input
                                        type="number"
                                        value={item.quantity}
                                        onChange={(e) => updateCart(item.product_id, Number(e.target.value))}
                                        min="1"
                                    />
                                </td>
                                <td>¥{item.price * item.quantity}</td>
                                <td>
                                    <button onClick={() => removeFromCart(item.product_id)}>削除</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div>カートは空です</div>
            )}
            <div>
                合計: ¥{total}
            </div>
            <Footer />
        </div>
    );
};

export default CartPage;
