'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/user/account`, {
                withCredentials: true
            });
            setIsLoggedIn(!!response.data.user);
        } catch {
            setIsLoggedIn(false);
        }
    };

    const handleLogout = async () => {
        try {
            await axios.post(`${API_URL}/api/logout`, {}, {
                withCredentials: true
            });
            setIsLoggedIn(false);
            router.push('/sign-up');
        } catch (error) {
            console.error('ログアウトに失敗:', error);
        }
    };

    return (
        <header className="bg-white shadow-md">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* 既存のナビゲーション要素 */}
                    <div className="flex items-center">
                        {isLoggedIn ? (
                            <>
                                <Link href="/user/account" className="text-gray-700 hover:text-gray-900 px-3 py-2">
                                    マイページ
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="text-gray-700 hover:text-gray-900 px-3 py-2"
                                >
                                    ログアウト
                                </button>
                            </>
                        ) : (
                            <Link href="/sign-up" className="text-gray-700 hover:text-gray-900 px-3 py-2">
                                ログイン
                            </Link>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
} 