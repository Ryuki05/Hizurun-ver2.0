import { useEffect, useState } from 'react';

interface CartItem {
    product: {
        name: string;
        price: number;
    };
    quantity: number;
}

interface CheckoutData {
    cartItems: CartItem[];
    total: number;
    user: {
        name: string;
        email: string;
    };
}

const CheckoutPage = () => {
    const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null);

    useEffect(() => {
        // APIからチェックアウトデータを取得
        const fetchCheckoutData = async () => {
            try {
                const response = await fetch('/api/checkout'); // 適切なAPIエンドポイントを指定
                if (!response.ok) {
                    throw new Error('データの取得に失敗しました');
                }
                const data: CheckoutData = await response.json();
                setCheckoutData(data);
            } catch (error) {
                console.error('エラー:', error);
            }
        };

        fetchCheckoutData();
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const response = await fetch('/api/orders', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            // 注文が成功した場合の処理
            console.log('注文が確定しました');
        } else {
            console.error('注文の確定に失敗しました');
        }
    };

    if (!checkoutData) {
        return <div>読み込み中...</div>;
    }

    return (
        <div>
            <h1>チェックアウト</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <h2>配送情報</h2>
                    <div>
                        <label htmlFor="name">氏名</label>
                        <input type="text" id="name" name="name" required defaultValue={checkoutData.user.name} />
                    </div>
                    <div>
                        <label htmlFor="email">メールアドレス</label>
                        <input type="email" id="email" name="email" required defaultValue={checkoutData.user.email} />
                    </div>
                    <div>
                        <label htmlFor="address">住所</label>
                        <input type="text" id="address" name="address" required />
                    </div>
                    <div>
                        <label htmlFor="phone">電話番号</label>
                        <input type="tel" id="phone" name="phone" required />
                    </div>

                    <h2>支払い方法</h2>
                    <div>
                        <select name="payment_method" required>
                            <option value="">選択してください</option>
                            <option value="credit_card">クレジットカード</option>
                            <option value="bank_transfer">銀行振込</option>
                            <option value="convenience_store">コンビニ決済</option>
                        </select>
                    </div>
                </div>

                <div>
                    <h2>注文内容</h2>
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>商品名</th>
                                    <th>数量</th>
                                    <th>価格</th>
                                </tr>
                            </thead>
                            <tbody>
                                {checkoutData.cartItems.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.product.name}</td>
                                        <td>{item.quantity}</td>
                                        <td>¥{new Intl.NumberFormat().format(item.product.price * item.quantity)}</td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th colSpan={2}>合計</th>
                                    <td>¥{new Intl.NumberFormat().format(checkoutData.total)}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>

                <div>
                    <button type="submit">注文を確定する</button>
                </div>
            </form>
        </div>
    );
};

export default CheckoutPage;
