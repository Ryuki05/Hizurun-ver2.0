import React from 'react';

const SearchButton: React.FC = () => {
  return (
    <div className='flex justify-end'>
        <button
        type="submit"
        className="flex items-center gap-2 p-2 text-hizurun-gr  hover:bg-gray-200"
        >
        {/* SVG アイコン */}
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20px"
            height="20px"
            viewBox="0 0 300 300"
            enableBackground="new 0 0 300 300"
            className='flex-shrink-0'  // enableBackgroundを指定
            transform='translate(85,0)'
        >
            <g >
            {/* 円形アイコン */}
            <circle
                cx="150"
                cy="125.5"
                r="71"
                fill="none"  // 塗りつぶしなし
                stroke="#ffb4c1"  // 線の色
                strokeWidth="20"  // 線の太さ
                strokeLinecap="round"  // 線の端を丸く
                strokeLinejoin="round"  // 線の接続部分を丸く
            />
            {/* 斜線 */}
            <line
                x1="179"
                y1="186.5"
                x2="235"
                y2="245.5"
                stroke="#fbc2c9"  // 線の色
                strokeWidth="20"  // 線の太さ
                strokeLinecap="round"  // 線の端を丸く
            />
            </g>
        </svg>
        </button>
    </div>
  );
};

export default SearchButton;
