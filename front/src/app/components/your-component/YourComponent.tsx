const YourComponent = () => {
    // 例として、購入する商品の情報を定義
    const orderData = {
        items: [
            {
                productId: 1,
                quantity: 2,
            },
            {
                productId: 2,
                quantity: 1,
            },
        ],
    };

    const handlePurchaseConfirm = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 必要に応じてトークンを追加
                },
                body: JSON.stringify(orderData), // orderDataは購入する商品の情報
            });

            if (response.ok) {
                const result = await response.json();
                console.log('注文が確定しました:', result);
                // 注文履歴ページに遷移しない
            } else {
                console.error('注文の確定に失敗しました');
            }
        } catch (error) {
            console.error('エラー:', error);
        }
    };

    return (
        <div>
            {/* 他のコンポーネントや要素 */}
            <button onClick={handlePurchaseConfirm}>購入確定</button>
        </div>
    );
};

export default YourComponent;
