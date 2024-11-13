'use client';
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

const Login = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, password }),
            });
            const result = await response.json();
            // ログイン成功時の処理を追加
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div className='flex flex-col justify-center h-screen items-center'>
            <CustomLink className='no-underline' href='/'>
                <h1 className={`text-8xl text-hizurun-gr ${irishGrover.className}`} >Hizurun</h1>
            </CustomLink>
            <div className='text-3xl text-center border-2 rounded-lg p-5'>
                <h1 className={`text-hizurun-gr  ${mplus1p.className}`}>ログイン</h1>
                <form onSubmit={handleLogin}>
                    <div className='flex flex-col m-1'>
                        <label className={`text-hizurun-gr ${irishGrover.className}`}>UserName</label>
                        <input
                            className='border-2 rounded-lg p-1'
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className='flex flex-col m-3'>
                        <label className={`text-hizurun-gr ${irishGrover.className}`}>Password</label>
                        <input
                            className='border-2 rounded-lg p-1'
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button className={`bg-hizurun-gr px-10 py-1 rounded-lg  ${irishGrover.className}`} type="submit">Login</button>
                </form>
            </div>
            <div className='w-full max-w-md text-center'>
                <div className="flex items-center my-4">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <p className={`${mplus1p.className} px-4 text-gray-400`}>初めて<span className={`${irishGrover.className}`}>Hizurun</span>をご利用ですか？</p>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>
                <CustomLink href='../sign-up' className={`px-10 py-1 rounded-lg border-2 text-hizurun-gr no-underline ${mplus1p.className}`}>新規登録</CustomLink>
            </div>
        </div>
    );
};

export default Login;
