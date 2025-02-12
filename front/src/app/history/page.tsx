'use client'
import { useEffect, useState } from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import '../globals.css';

interface OrderItem {
  product: {
    id: number;
    name: string;
    price: number;
  };
  quantity: number;
}

interface Order {
  id: number;
  total_amount: number;
  orderItems: OrderItem[];
}

const OrderHistory = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  // 注文履歴を取得
  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch('http://localhost:8000/api/orders');
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      } else {
        console.error('注文履歴の取得に失敗しました');
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <div className="max-w-3xl mt-3 mx-auto px-4 py-10 ">
        <h2 className="text-2xl font-semibold mb-4">注文履歴</h2>
        {orders.length === 0 ? (
          <div>注文履歴がありません。</div>
        ) : (
          <table className="w-full table-auto border-collapse mb-6">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">注文ID</th>
                <th className="px-4 py-2 text-left">合計金額</th>
                <th className="px-4 py-2 text-left">注文内容</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-t">
                  <td className="px-4 py-2">{order.id}</td>
                  <td className="px-4 py-2">¥{new Intl.NumberFormat().format(order.total_amount)}</td>
                  <td className="px-4 py-2">
                    <ul>
                      {order && order.orderItems ? (
                        order.orderItems.map((item, index) => (
                          <li key={index}>
                            {item.product.name} - 数量: {item.quantity} - 価格: ¥{new Intl.NumberFormat().format(item.product.price)}
                          </li>
                        ))
                      ) : (
                        <li>注文アイテムがありません</li>
                      )}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default OrderHistory;
