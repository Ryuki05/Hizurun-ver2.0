'use client';
import React, { useEffect, useState } from 'react'
import { Irish_Grover } from 'next/font/google';
import CustomLink from '../custom-link';
import Dashboard from '../Dashboard';
import Search from './Search';

const irishGrover = Irish_Grover({
    subsets: ['latin'],
    weight: '400',
});

interface Category {
    id: number;
    name: string;
}

interface Product {
    id: number;
    name: string;
    price: number;
    image_path: string;
}

interface ProductListData {
    products: Product[];
    categories: Category[];
    current_page: number;
    last_page: number;
    total: number;
}


const Header = () => {

    const [data, setData] = useState<ProductListData | null>(null);
    // const [search, setSearch] = useState<string>('');
    // const [category, setCategory] = useState<string>('');
    // const [sort, setSort] = useState<string>('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/products');
                if (!response.ok) {
                    throw new Error('データの取得に失敗しました');
                }
                const result: ProductListData = await response.json();
                setData(result);
            } catch (error) {
                console.error('エラー:', error);
            }
        };
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token); // トークンがあればログイン状態をtrueに

        fetchData();
    }, []);


    if (!data) {
        return <div>読み込み中...</div>;
    }

    return (
        <div className='border-b-2 border-btm-hizurun-gr flex justify-between items-center p-4'>
            <CustomLink className='no-underline' href='/'>
                <h1 className={`text-6xl text-hizurun-gr ${irishGrover.className}`}>Hizurun</h1>
            </CustomLink>

            <Search/>

            {/* ログインしている場合はダッシュボードを表示 */}
            {isLoggedIn ? (
                <Dashboard />
            ) : (
                <div className='flex items-center'>
                    <CustomLink href="../../login" className='no-underline text-lg text-hizurun-gr'>
                        Login
                    </CustomLink>
                </div>
            )}
        </div>
    )
}

export default Header;
