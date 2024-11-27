'use client';

import { useEffect, useState } from "react";
import { SessionProvider } from 'next-auth/react';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import "./globals.css";
import OpeningShutter from './components/home/OpeningShutter';
import Popularproducts from './components/home/Popular-products';
import Featuredproducts from './components/home/Featured-products';
import Categories from './components/Categories';

const HomePage = () => {
    const [isShutterVisible, setIsShutterVisible] = useState(false);

    useEffect(() => {
        // ローカルストレージから状態を確認
        const hasSeenShutter = localStorage.getItem('hasSeenShutter');
        if (!hasSeenShutter) {
            setIsShutterVisible(true);
        }
    }, []);

    // オープニングシャッター終了後に呼び出される
    const handleAnimationEnd = () => {
        setIsShutterVisible(false); // シャッターを非表示にする
        localStorage.setItem('hasSeenShutter', 'true'); // 状態を保存
    };

    return (
        <SessionProvider>
            <div className={`bg-gray-100`}>
                {isShutterVisible ? (
                    <OpeningShutter onAnimationEnd={handleAnimationEnd} />
                ) : (
                    <>
                        <Header />
                        <Popularproducts />
                        <Categories />
                        <Featuredproducts />
                        <Footer />
                    </>
                )}
            </div>
        </SessionProvider>
    );
};

export default HomePage;
