import React from 'react'

const SlidebtnRight = () => {
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
            className="absolute right-0 text-hizurun-gr text-xl top-20 py-16 z-10 bg-white rounded-full p-2 shadow hover:bg-gray-200"
            onClick={() => scroll(1, 'recommended-products')}
        >
            &gt;
        </button>
    </div>
  )
}

export default SlidebtnRight
