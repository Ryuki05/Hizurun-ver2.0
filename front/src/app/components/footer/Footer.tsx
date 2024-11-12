'use client';
import React from 'react';
import Image from 'next/image';
import { Irish_Grover } from 'next/font/google';

const irishGrover = Irish_Grover({
    subsets: ['latin'],
    weight: '400',
});


const Footer = () => {
    return (
      <footer className='mt-1 z-10 fixed bottom-0 left-0 w-full h-[254px] bg-hizurun-gr text-center flex items-center justify-center'>
          <div>
            <Image
                    src="/image/Hizurun-footer.png"
                    alt="Hizurun Icon"
                    width={100}
                    height={100}
                />
            <p className={`text-white text-4xl ${irishGrover.className}`}>&copy; Hizurun</p>
          </div>

      </footer>
    );
  };



export default Footer;
