'use client'
import { M_PLUS_1p } from 'next/font/google';
import React, { useEffect, useState } from 'react'
import { Category, HomeData } from '../types/homeTypes';
import Image from 'next/image';


const mplus1p = M_PLUS_1p({
    subsets: ['latin'],
    weight: '400',
});


const Categories = () => {

    const [data, setData] = useState<HomeData>({
        popularProducts: [],
        categories: [],
        recommendedProducts: [],
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/home');
                const jsonData: HomeData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
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

    if (loading) return <div>Loading...</div>;


    return (
    <div>
                {/* カテゴリーセクション */}
                <section className="mb-8 px-4">
            <h2 className={`text-2xl font-bold mb-4 ${mplus1p.className}`}>カテゴリー</h2>
            <div className={`flex overflow-x-auto overflow-hidden space-x-4 relative`}>
                <button
                    className="absolute left-0 z-10 bg-white rounded-full p-2 shadow hover:bg-gray-200"
                    onClick={() => scroll(-1, 'categories')}
                >
                    &lt;
                </button>
                <div className={`flex overflow-x-auto overflow-hidden space-x-4 categories`}>
                    {data.categories.length > 0 ? (
                        data.categories.map((category: Category) => (
                            <div className="flex-none w-64 p-4 bg-white rounded shadow" key={category.id}>
                                <Image
                                    src="/image/Hizurun-ico.png"
                                    alt="Hizurun Icon"
                                    width={200}
                                    height={200}
                                    style={{ objectFit: "cover" }}
                                    className="rounded"
                                />
                                <div className="mt-2 text-center">
                                    <h3 className={`text-lg font-semibold ${mplus1p.className}`}>{category.name}</h3>
                                    <a href={`/products?category=${category.id}`} className={`text-blue-500 ${mplus1p.className}`}>商品を見る</a>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className={`text-2xl font-bold mb-4 ${mplus1p.className}`}>カテゴリーがありません。</p>
                    )}
                </div>
                <button
                    className="absolute right-0 z-10 bg-white rounded-full p-2 shadow hover:bg-gray-200"
                    onClick={() => scroll(1, 'categories')}
                >
                    &gt;
                </button>
            </div>
        </section>

    </div>
    )
}

export default Categories
