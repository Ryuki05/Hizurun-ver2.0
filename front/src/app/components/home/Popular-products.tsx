'use client';
import { Irish_Grover, M_PLUS_1p } from 'next/font/google';
import React, { useEffect, useState } from 'react'
import { HomeData, Product } from '../../types/homeTypes';
import Image from 'next/image';

const irishGrover = Irish_Grover({
    subsets: ['latin'],
    weight: '400',
});

const mplus1p = M_PLUS_1p({
    subsets: ['latin'],
    weight: '500',
});

const Popularproducts = () => {



    const [data, setData] = useState<HomeData>({
        popularProducts: [],
        categories: [],
        recommendedProducts: [],
    });


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/home');
                const jsonData: HomeData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {

            }
        };

        fetchData();
    }, []);

    const scroll = (direction: number, className: string) => {
        const container = document.querySelector(`.${className}`);
        if (container) {
            const scrollAmount = direction * 250; // スクロール量を調整
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };


    return (
    <div>
        {/* 人気商品セクション */}
        <section className="mb-8 px-4">
                <h2 className={`text-2xl font-bold mb-4 ${mplus1p.className}`}>人気商品</h2>
                <div className={`flex  space-x-4 relative`}>
                    <button
                        className="flex  left-0 z-10 bg-white rounded-full p-2 shadow hover:bg-gray-200"
                        onClick={() => scroll(-1, 'popular-products')}
                    >
                        &lt;
                    </button>
                    <div className={`flex overflow-hidden space-x-4 popular-products`}>
                        {data.popularProducts.length > 0 ? (
                            data.popularProducts.map((product: Product) => (
                                <div className="flex-none w-64 p-4 bg-white rounded shadow" key={product.id}>
                                    <Image
                                        src="/image/Hizurun-ico.png"
                                        alt="Hizurun Icon"
                                        width={200}
                                        height={200}
                                        style={{ objectFit: "cover" }}
                                        className="rounded"
                                    />
                                    <div className={`mt-2 text-center`}>
                                        <h3 className={`text-lg font-semibold ${mplus1p.className}`}>{product.name}</h3>
                                        <p className={`text-gray-600 ${irishGrover.className}`}>
                                            <span className={`${mplus1p.className}`}>価格:</span> ¥{new Intl.NumberFormat().format(product.price)}
                                        </p>
                                        <a href={`/products/${product.id}`} className={`text-hizurun-gr ${mplus1p.className}`}>詳細を見る</a>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className={`text-2xl font-bold mb-4 ${mplus1p.className}`}>現在、人気商品はありません。</p>
                        )}
                    </div>
                    <button
                        className="absolute right-0 z-10 bg-white rounded-full p-2 shadow hover:bg-gray-200"
                        onClick={() => scroll(1, 'popular-products')}
                    >
                        &gt;
                    </button>
                </div>
            </section>
    </div>
    )
}

export default Popularproducts
