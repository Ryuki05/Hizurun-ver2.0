'use client';  // クライアントサイドコンポーネントとしてマーク

import { SessionProvider } from 'next-auth/react'; // 追加
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import "./globals.css";
import OpeningShutter from './components/home/OpeningShutter';
import Popularproducts from './components/home/Popular-products';
import Featuredproducts from './components/home/Featured-products';
import Categories from './components/Categories';

const HomePage = () => {
    return (
        <SessionProvider>  {/* SessionProviderでラップ */}
            <div className={`bg-gray-100`}>
                <OpeningShutter />
                <Header />
                <Popularproducts />
                <Categories />
                <Featuredproducts />
                <Footer />
            </div>
        </SessionProvider>
    );
};

export default HomePage;
