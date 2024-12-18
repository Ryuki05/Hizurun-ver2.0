'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import '../globals.css'
interface CartItem {
  product: {
    id: number;
    name: string;
    price: number;
  };
  quantity: number;
}

interface OrderSummary {
  cartItems: CartItem[];
  total: number;
}

const Orders = () => {
  const [orderSummary, setOrderSummary] = useState<OrderSummary | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const router = useRouter();

  // 注文内容を取得（カートアイテムと合計金額）
  useEffect(() => {
    const fetchOrderSummary = async () => {
      const response = await fetch('http://localhost:8000/api/orders/create', {
        method: 'GET',
      });

      if (response.ok) {
        const data = await response.json();
        setOrderSummary(data);
      } else {
        console.error('注文内容の取得に失敗しました');
      }
    };

    fetchOrderSummary();
  }, []);


  // 注文確定
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!orderSummary) {
      console.error('注文内容が取得できていません');
      return;
    }

    const orderData = {
      name,
      email,
      address,
      phone,
      payment_method: paymentMethod,
      total_amount: orderSummary.total,
      cartItems: orderSummary.cartItems.map(item => ({
        product: {
          id: item.product.id,
          price: item.product.price,
        },
        quantity: item.quantity,
      })),
    };

    const response = await fetch('http://localhost:8000/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    if (response.ok) {
        alert('注文を確定しました');
        router.push('/');
    } else {
      console.error('注文確定に失敗しました');
    }
  };

  if (!orderSummary) {
    return <div>読み込み中...</div>;
  }

  return (
    <div className=" min-h-screen">
      <Header />
      <div className="max-w-3xl mt-3 mx-auto px-4 py-10 hizurun-border">

        <form onSubmit={handleSubmit} className="hizurun-border-inner bg-white p-8 rounded-lg shadow-lg">
            <div className="text-center">
                <button type="submit" className="btn-hizurun-gr">
                注文を確定する
                </button>
            </div>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">配送情報</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-600">氏名</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 border rounded-lg shadow-sm"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-600">メールアドレス</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border rounded-lg shadow-sm"
                />
              </div>
              <div>
                <label htmlFor="address" className="block text-gray-600">住所</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-3 border rounded-lg shadow-sm"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-gray-600">電話番号</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-3 border rounded-lg shadow-sm"
                />
              </div>

              <h2 className="text-2xl font-semibold text-gray-700 mt-8 mb-4">支払い方法</h2>
              <div>
                <select
                  name="payment_method"
                  required
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  value={paymentMethod}
                  className="w-full p-3 border rounded-lg shadow-sm"
                >
                  <option value="">選択してください</option>
                  <option value="credit_card">クレジットカード</option>
                  <option value="bank_transfer">銀行振込</option>
                  <option value="convenience_store">コンビニ決済</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">注文内容</h2>
            <table className="w-full table-auto border-collapse mb-6">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-gray-700">商品名</th>
                  <th className="px-4 py-2 text-left text-gray-700">数量</th>
                  <th className="px-4 py-2 text-left text-gray-700">価格</th>
                </tr>
              </thead>
              <tbody>
                {orderSummary.cartItems.map((item, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-2">{item.product.name}</td>
                    <td className="px-4 py-2">{item.quantity}</td>
                    <td className="px-4 py-2">¥{new Intl.NumberFormat().format(item.product.price * item.quantity)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th colSpan={2} className="text-right px-4 py-2 font-semibold">合計</th>
                  <td className="px-4 py-2">¥{new Intl.NumberFormat().format(orderSummary.total)}</td>
                </tr>
              </tfoot>
            </table>
          </div>


        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Orders;
