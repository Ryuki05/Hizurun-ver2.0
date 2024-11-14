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
    <footer className="bg-hizurun-gr text-center py-8 mt-8">
      <div className="flex justify-center items-center">
        <Image
          src="/image/Hizurun-footer.png"
          alt="Hizurun Icon"
          width={100}
          height={100}
        />
        <p className={`text-white text-4xl ml-4 ${irishGrover.className}`}>
          &copy; Hizurun
        </p>
      </div>
    </footer>
  );
};

export default Footer;
