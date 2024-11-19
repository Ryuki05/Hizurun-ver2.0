'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn('credentials', {
      redirect: false,
      name,
      password,
    });

    console.log('SignIn Response:', res);

    if (res?.error) {
      console.error('Login error:', res.error);  // エラーの詳細をコンソールに表示
      alert('Login failed');
    } else {
      // ログイン成功後の処理
      alert('Login successful');
      router.push('/dashboard'); // ダッシュボードに遷移
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <label>UserName</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
