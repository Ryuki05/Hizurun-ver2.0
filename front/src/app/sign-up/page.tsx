'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react'; // signInをインポート

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState(''); // 確認用パスワードの状態
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    // パスワード長さチェック
    if (password.length < 8) {
      alert('Password must be at least 8 characters.');
      return;
    }

    // パスワード確認チェック
    if (password !== passwordConfirmation) {
      alert('Password confirmation does not match.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/sign-up', { name, email, password, password_confirmation: passwordConfirmation });

      if (response.status === 200 || response.status === 201) {
        alert('Sign up successful!');

        // サインアップ後にログイン処理
        const { token } = response.data; // サーバーから返されたトークンを取得

        const res = await signIn('credentials', {
          redirect: false,
          name,
          password,
        });

        if (res?.error) {
          console.error('Login failed:', res.error); // エラーメッセージをコンソールに表示
          alert('Login failed');
        } else {
          // トークンをlocalStorageに保存
          localStorage.setItem('token', token);
          alert('Login successful');
          router.push('/'); // `page.tsx`に遷移
        }
      } else {
        alert('Unexpected response from server.');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const err = error.response?.data;
        console.error('Axios Error:', err);
        if (err && err.errors) {
          const errorMessages = Object.values(err.errors).join(', ');
          alert(`Sign up failed: ${errorMessages}`);
        } else {
          alert('An unexpected error occurred.');
        }
      } else {
        console.error('Unexpected Error:', error);
        alert('Sign up failed.');
      }
    }
  };

  return (
    <div className='flex flex-col justify-center h-screen items-center'>
      <h1 className='text-4xl mb-5'>Sign Up</h1>
      <form onSubmit={handleSignup} className='w-1/3'>
        <div className='mb-4'>
          <label className='block text-gray-700'>UserName</label>
          <input
            className='w-full border rounded px-3 py-2'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700'>Email</label>
          <input
            className='w-full border rounded px-3 py-2'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700'>Password</label>
          <input
            className='w-full border rounded px-3 py-2'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700'>Confirm Password</label>
          <input
            className='w-full border rounded px-3 py-2'
            type='password'
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            required
          />
        </div>
        <button
          type='submit'
          className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
