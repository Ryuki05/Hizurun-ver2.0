import React from 'react'

const SlidebtnLeft = () => {
    const scroll = (direction: number, className: string) => {
        const container = document.querySelector(`.${className}`);
        if (container) {
            const scrollAmount = direction * 250; // スクロール量を調整
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };
  return (
    <div>
        <button
            className="absolute text-hizurun-gr text-xl left-0 top-20 py-16 z-10 bg-slate-50 rounded-full p-2 shadow hover:bg-gray-200"
            onClick={() => scroll(-1, 'recommended-products')}
        >
            &lt;
        </button>
    </div>
  )
}

export default SlidebtnLeft
