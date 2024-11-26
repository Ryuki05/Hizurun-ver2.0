"use client";

import { Irish_Grover, M_PLUS_1p } from "next/font/google";
import { useEffect } from "react";
import Image from "next/image";

// フォント設定
const irishGrover = Irish_Grover({
  subsets: ["latin"],
  weight: "400",
});

const mplus1p = M_PLUS_1p({
  subsets: ["latin"],
  weight: "400",
});

// OpeningShutter コンポーネント
const OpeningShutter = ({ onAnimationEnd }: { onAnimationEnd: () => void }) => {
  useEffect(() => {
    // 5秒後にアニメーションが終了
    const timer = setTimeout(() => {
      onAnimationEnd(); // 親コンポーネントへ終了を通知
    }, 8000);

    // コンポーネントのクリーンアップ時にタイマーをクリア
    return () => clearTimeout(timer);
  }, [onAnimationEnd]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* 障子 */}
      <div className="absolute inset-0 flex">
        <div className="z-10 w-1/2 h-full transition-transform transform translate-x-0 animate-shoji-left">
          <Image
            src="/image/leftshouji.png"
            alt="Hizurun Icon"
            width={1000}
            height={950}
            style={{ objectFit: "cover" }}
            className="rounded   w-fit h-fit"
          />
        </div>
        <div className="z-10 w-1/2 h-full  transition-transform transform -translate-x-0 animate-shoji-right">
          <Image
            src="/image/rightshouji.png"
            alt="Hizurun Icon"
            width={1000}
            height={950}
            style={{ objectFit: "cover" }}
            className="rounded  w-fit h-fit"
          />
        </div>
      </div>

      {/* 日の丸 */}
      <div
        className={`absolute text-center text-8xl text-hizurun-gr transform opacity-0 animate-sunrise ${irishGrover.className}`}
        style={{
          top: "20%",
          left: "41%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Image
          src="/image/Hizurun-footer.png"
          alt="Hizurun Icon"
          width={1000}
          height={1000}
          style={{ objectFit: "cover" }}
          className="rounded  w-fit h-fit"
        />
        <span className="">Hizurun</span>
      </div>
    </div>
  );
};

export default OpeningShutter;
