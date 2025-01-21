'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

// axios.postのURLを環境変数から取得するように修正
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function AuthForm() {
    const [formType, setFormType] = useState<'login' | 'register'>('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [csrfToken, setCsrfToken] = useState('');
    const router = useRouter();

    // ページが読み込まれた時に CSRF トークンを取得
    useEffect(() => {
        const savedFormType = localStorage.getItem('formType') as 'login' | 'register' | null;
        if (savedFormType) {
            setFormType(savedFormType);
        }

        // CSRF トークンを取得
        axios.post(`${API_URL}/api/csrf-token`)
            .then((response) => {
                setCsrfToken(response.data.csrfToken);
            })
            .catch((error) => {
                console.error('CSRF トークンの取得に失敗:', error);
            });
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/api/login`, {
                email,
                password,
            }, {
                headers: {
                    'X-CSRF-TOKEN': csrfToken,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                withCredentials: true
            });

            if (response.data.status === 'success') {
                alert('ログイン成功');
                router.push('/');
            } else {
                alert('ログインに失敗しました');
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const message = error.response?.data?.message || 'ログインに失敗しました';
                alert(message);
            }
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            console.log('送信データ:', { name, email, password });

            const response = await axios.post(`${API_URL}/api/sign-up`, {
                name,
                email,
                password,
            }, {
                headers: {
                    'X-CSRF-TOKEN': csrfToken,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                withCredentials: true
            });

            console.log('レスポンス:', response.data);

            if (response.data.status === 'success') {
                alert('登録成功');
                router.push('/');
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Registration error:', {
                    status: error.response?.status,
                    data: error.response?.data,
                    headers: error.response?.headers
                });

                const errorMessage = error.response?.data?.message
                    || error.response?.data?.error
                    || (error.response?.data?.errors && Object.values(error.response?.data?.errors as Record<string, string[]>)[0]?.[0])
                    || '登録に失敗しました';

                alert(errorMessage);
            }
        }
    };

    const switchFormType = (type: 'login' | 'register') => {
        setFormType(type);
        localStorage.setItem('formType', type);
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
                        className="w-full space-y-4 px-4 mr-10 flex-shrink-0"
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
