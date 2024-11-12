'use client';
import { useEffect, useState } from 'react';
import { Irish_Grover, M_PLUS_1p } from 'next/font/google';

const irishGrover = Irish_Grover({
    subsets: ['latin'],
    weight: '400',
});

const mplus1p = M_PLUS_1p({
    subsets: ['latin'],
    weight: '400',
});


const OpeningShutter = () => {
    const [Visible, setVisible] = useState(true);

    useEffect(() => {
        // ローカルストレージから表示状態を取得
        const hasSeenShutter = localStorage.getItem('hasSeenShutter');

        // すでに表示されたことがある場合は非表示にする
        if (hasSeenShutter) {
            setVisible(false);
        } else {
            // 一定時間後にシャッターを非表示にする
            const timer = setTimeout(() => {
                setVisible(false);
                localStorage.setItem('hasSeenShutter', 'true'); // 表示したことを記録
            }, 3000); // 3秒後に非表示

            return () => clearTimeout(timer);
        }
    }, []);

    if (!Visible) return null; // 非表示の場合は何もレンダリングしない

    return (
        <div
            className={`
                    fixed
                    z-50
                    top-0
                    left-0
                    w-full
                    h-full
                    flex
                    items-center
                    justify-center
                    bg-hizurun-gr
                    transition-opacity
                    duration-1000
                    ${Visible ? 'opacity-100' : 'opacity-0'}
                `}
        >
            <h1 className={`text-white text-4xl ${mplus1p.className}`}>ようこそ、<span className={`${irishGrover.className}`}>Hizurun</span>へ！</h1>
        </div>
    );
};

export default OpeningShutter;
