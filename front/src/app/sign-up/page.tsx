'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function AuthForm() {
  const [formType, setFormType] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const router = useRouter();

  useEffect(() => {
    // UI崩れ防止: フォームが正しい位置に表示されるよう初期状態を設定
    const savedFormType = localStorage.getItem('formType') as 'login' | 'register' | null;
    if (savedFormType) {
      setFormType(savedFormType);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        alert('ログインに失敗しました');
      } else {
        alert('ログイン成功');
        router.push('/');
      }
    } catch (error) {
      console.error('ログインエラー:', error);
      alert('予期せぬエラーが発生しました');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== passwordConfirmation) {
      alert('確認用パスワードが一致しません');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/sign-up', {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });

      if (response.status === 200 || response.status === 201) {
        alert('登録成功');
        setFormType('login'); // 登録後にログイン画面に切り替える
        localStorage.setItem('formType', 'login'); // 状態を保存
      } else {
        alert('サーバーから予期しない応答を受け取りました');
      }
    } catch (error) {
      console.error('登録エラー:', error);
      alert('登録中にエラーが発生しました');
    }
  };

  const switchFormType = (type: 'login' | 'register') => {
    setFormType(type);
    localStorage.setItem('formType', type); // 状態をローカルに保存
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-[#ffb4c1] relative">
      {/* 背景アニメーション */}
      <div className="absolute inset-0 overflow-hidden opacity-50">
        <ul className="animate-background">
          {Array(7)
            .fill(0)
            .map((_, i) => (
              <li
                key={i}
                className={`bg-circle bg-opacity-${(i + 1) * 10}`}
                style={{
                  backgroundColor: i % 2 === 0 ? '#ffb1bf' : '#ffd1d9',
                }}
              />
            ))}
        </ul>
      </div>

      {/* フォーム全体のラッパー */}
      <div
        id="form"
        className="relative w-[350px] h-[500px] p-10 rounded-md shadow-lg bg-white overflow-hidden border border-[#fbc2c9]"
      >
        {/* トグルボタン */}
        <div className="flex mb-6 justify-center space-x-4 border border-gray-300 rounded-full overflow-hidden">
          <button
            className={`w-1/2 py-2 text-sm font-semibold transition ${
              formType === 'login' ? 'bg-[#ffb4c1] text-white' : 'bg-gray-100 text-gray-800'
            }`}
            onClick={() => switchFormType('login')}
          >
            ログイン
          </button>
          <button
            className={`w-1/2 py-2 text-sm font-semibold transition ${
              formType === 'register' ? 'bg-[#ffb4c1] text-white' : 'bg-gray-100 text-gray-800'
            }`}
            onClick={() => switchFormType('register')}
          >
            登録
          </button>
        </div>

        {/* スライドするフォーム */}
        <div
        className="relative w-full h-full flex transition-transform duration-500"
        style={{
            transform: formType === 'login' ? 'translateX(0%)' : 'translateX(-130%)',
            transition: 'transform 0.5s ease-in-out',
        }}
        >
            {/* ログインフォーム */}
            <form
                className="w-full space-y-4 px-4 mr-10 flex-shrink-0 "
                onSubmit={handleLogin}
            >
                <h4 className="text-gray-800 text-center text-lg font-bold">ログイン</h4>
                <input
                type="email"
                placeholder="メールアドレス"
                className="w-full bg-gray-100 text-gray-800 placeholder-gray-500 px-3 py-2 rounded focus:outline-none focus:ring focus:ring-[#ffd1d9]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
                <input
                type="password"
                placeholder="パスワード"
                className="w-full bg-gray-100 text-gray-800 placeholder-gray-500 px-3 py-2 rounded focus:outline-none focus:ring focus:ring-[#ffd1d9]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
                <button
                type="submit"
                className="w-full bg-[#ffb4c1] text-white py-2 rounded hover:bg-[#fbc2c9]"
                >
                ログイン
                </button>
            </form>

            {/* 登録フォーム */}
            <form
                className="w-full space-y-4 px-4 ml-10 flex-shrink-0"
                onSubmit={handleRegister}
            >
                <h4 className="text-gray-800 text-center text-lg font-bold">登録</h4>
                <input
                type="text"
                placeholder="名前"
                className="w-full bg-gray-100 text-gray-800 placeholder-gray-500 px-3 py-2 rounded focus:outline-none focus:ring focus:ring-[#ffd1d9]"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                />
                <input
                type="email"
                placeholder="メールアドレス"
                className="w-full bg-gray-100 text-gray-800 placeholder-gray-500 px-3 py-2 rounded focus:outline-none focus:ring focus:ring-[#ffd1d9]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
                <input
                type="password"
                placeholder="パスワード"
                className="w-full bg-gray-100 text-gray-800 placeholder-gray-500 px-3 py-2 rounded focus:outline-none focus:ring focus:ring-[#ffd1d9]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
                <input
                type="password"
                placeholder="確認用パスワード"
                className="w-full bg-gray-100 text-gray-800 placeholder-gray-500 px-3 py-2 rounded focus:outline-none focus:ring focus:ring-[#ffd1d9]"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                required
                />
                <button
                type="submit"
                className="w-full bg-[#ffb4c1] text-white py-2 rounded hover:bg-[#fbc2c9]"
                >
                登録
                </button>
            </form>
        </div>
      </div>
    </section>
  );
}
