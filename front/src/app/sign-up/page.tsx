'use client'
import React, { useState } from 'react';

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
    <div>
      <h2>新規ユーザー登録</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">ユーザー名</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="ユーザー名"
          />
        </div>
        <div>
          <label htmlFor="password">パスワード</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="パスワード"
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? '送信中...' : '登録'}
        </button>
      </form>
    </div>
  );
};

export default SignUp;
