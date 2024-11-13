'use client'
import { Irish_Grover, M_PLUS_1p } from 'next/font/google';
import React, { useState } from 'react';
import CustomLink from '../components/custom-link';


const irishGrover = Irish_Grover({
    subsets: ['latin'],
    weight: '400',
});

const mplus1p = M_PLUS_1p({
    subsets: ['latin'],
    weight: '500',
});

const SignUp = () => {
  // 入力値の状態管理
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // フォーム送信処理
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!name || !password) {
      setError('ユーザー名とパスワードは必須です');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    // フォームデータを送信
    try {
      const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, password }),
      });

      if (response.ok) {
        // 登録成功時の処理
        console.log('ユーザー登録が成功しました');
        // 例：リダイレクト
        window.location.href = '/login'; // ログインページにリダイレクトする例
      } else {
        // エラーメッセージの処理
        const data = await response.json();
        setError(data.message || '登録に失敗しました');
      }
    } catch (error) {
      setError('サーバーとの通信に失敗しました');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='flex flex-col justify-center h-screen items-center'>
        <CustomLink className='no-underline' href='/'>
            <h1 className={`text-8xl text-hizurun-gr ${irishGrover.className}`} >Hizurun</h1>
        </CustomLink>
        <div className='text-3xl text-center border-2 rounded-lg p-5'>
            <h1 className={`text-hizurun-gr ${mplus1p.className}`}>新規ユーザー登録</h1>
            <form onSubmit={handleSubmit}>
            <div className='flex flex-col m-1'>
                <label className={`text-hizurun-gr ${irishGrover.className}`} htmlFor="name">UserName</label>
                <input
                    className='border-2 rounded-lg p-1'
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="UserName"
                />
            </div>
            <div className='flex flex-col m-3'>
                <label className={`text-hizurun-gr ${irishGrover.className}`} htmlFor="password">Password</label>
                <input
                    className='border-2 rounded-lg p-1'
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Password"
                />
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button className={`bg-hizurun-gr px-10 py-1 rounded-lg  ${irishGrover.className}`} type="submit" disabled={isSubmitting}>
                {isSubmitting ? '送信中...' : 'SignUp'}
            </button>
            </form>
        </div>
    </div>
  );
};

export default SignUp;
