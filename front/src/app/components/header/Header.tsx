'use client';
import React, { useEffect, useState } from 'react';
import { Irish_Grover } from 'next/font/google';
import CustomLink from '../custom-link';
import Link from 'next/link';
import SearchContainer from './search/SearchContainer';
import Image from 'next/image';
import { signOut } from 'next-auth/react';  // signOutをインポート
// import axios from 'axios';
import { useRouter } from 'next/navigation';

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
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // const [email] = useState('');
    // const [password] = useState('');
    const router = useRouter();

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

    const handleLogout = () => {
        // localStorageからトークンを削除して、isLoggedInをfalseに
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        signOut({ redirect: false }); // next-authのsignOutを実行
    };

    const handleSignUp = () => {
        router.push('/sign-up');  // サインアップフォームのページに遷移
    };

    // const handleLogin = async () => {
    //     try {
    //         const response = await axios.post('http://localhost:8000/api/login', {
    //             email,
    //             password,
    //         });
    //         console.log('Login Success:', response.data);
    //         localStorage.setItem('token', response.data.token);
    //         setIsLoggedIn(true);
    //     } catch (error) {
    //         console.error('Login Error:', error);
    //     }
    // };

    if (!data) {
        return <div>読み込み中...</div>;
    }

    return (
        <div className='border-b-2 border-btm-hizurun-gr flex justify-between items-center p-4'>
            <CustomLink className="no-underline flex items-center space-x-4" href="/">
                <Image
                    src="/image/Hizurun-footer.png"
                    alt="Hizurun Icon"
                    width={100}
                    height={100}
                    style={{ objectFit: "cover" }}
                    className="rounded my-2"
                />
                <h1 className={`text-6xl text-hizurun-gr ${irishGrover.className}`}>Hizurun</h1>
            </CustomLink>

            <SearchContainer />
            <ul className='flex'>
                <li className='bg-white rounded-lg p-1 mr-3'>
                    <Link className='text-hizurun-gr' href={`../../user/account`}>アカウント情報</Link>
                </li>
                <li className='bg-white rounded-lg p-1 mr-3'>
                    <Link className='text-hizurun-gr' href={`#`}>注文履歴</Link>
                </li>
                <li className='bg-white rounded-lg p-1 mr-3'>
                    <Link className='text-hizurun-gr' href={`../../cart`}>カート</Link>
                </li>
                {!isLoggedIn ? (
                    <>
                        <li className='bg-hizurun-gr rounded-lg p-1 mr-3'>
                            <button className='text-white' onClick={handleSignUp}>SignUp</button>
                        </li>
                    </>
                ) : (
                    <li className='bg-hizurun-gr rounded-lg p-1'>
                        <button className='text-white' onClick={handleLogout}>Logout</button>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default Header;
