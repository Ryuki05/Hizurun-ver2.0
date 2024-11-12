'use client'
import { useEffect, useState } from 'react';
import { CartItem, Product } from '../types/homeTypes';
import Link from 'next/link';
import Image from 'next/image';

const CartPage = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [products, setProducts] = useState<Product[]>([]); // 商品の配列
    const [total, setTotal] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/cart');
                if (!response.ok) throw new Error('データ取得エラー');
                const data = await response.json();
                setCartItems(data.cartItems);
                setTotal(data.total);
                const productResponse = await fetch('http://localhost:8000/api/products');
                const productData = await productResponse.json();
                setProducts(productData.products);
            } catch (error: unknown) { // 'unknown'型を指定
                if (error instanceof Error) {
                    setError(error.message); // Errorインスタンスの場合のみメッセージを取得
                } else {
                    setError('不明なエラーが発生しました'); // その他のエラーの場合
                }
                console.error('カートのデータ取得エラー:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCartItems();
    }, []);


    if (loading) return <div>読み込み中...</div>;
    if (error) return <div>エラーが発生しました: {error}</div>;

    return (
        <div>
            <h1>カート</h1>
            {cartItems.length > 0 ? (
                <form action="http://localhost:8000/api/cart/update" method="POST">
                    <table>
                        <thead>
                            <tr>
                                <th>商品</th>
                                <th>価格</th>
                                <th>数量</th>
                                <th>小計</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item) => {
                                const product = products.find(p => p.id === item.productId); // 商品を取得
                                return (
                                    <tr key={item.id}>
                                        <td>
                                            {product && (
                                                <Image
                                                    src={`http://localhost:8000/storage/${product.image_path}`}
                                                    alt={product.name}
                                                    width={100}
                                                    height={100}
                                                />
                                            )}
                                            {product ? product.name : '商品情報がありません'}
                                        </td>
                                        <td>¥{new Intl.NumberFormat().format(product ? product.price : 0)}</td>
                                        <td>
                                            <input
                                                type="number"
                                                name={`quantities[${item.id}]`}
                                                defaultValue={item.quantity}
                                                min="1"
                                                max={product ? product.stock : 1}
                                            />
                                        </td>
                                        <td>¥{new Intl.NumberFormat().format(product ? product.price * item.quantity : 0)}</td>
                                        <td>
                                            <button type="submit" name="remove" value={item.id}>削除</button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <div>
                        <table>
                            <tbody>
                                <tr>
                                    <th>合計</th>
                                    <td>¥{new Intl.NumberFormat().format(total)}</td>
                                </tr>
                            </tbody>
                        </table>
                        <button type="submit">カートを更新</button>
                        <Link href="/orders/create">チェックアウトへ進む</Link>
                    </div>
                </form>
            ) : (
                <div>
                    カートは空です。<Link href="/products">商品一覧</Link>から商品を追加してください。
                </div>
            )}
        </div>
    );
};

export default CartPage;
