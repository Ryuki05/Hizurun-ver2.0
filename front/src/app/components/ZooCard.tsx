'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface ZooCardProps {
    id: number;
    name: string;
    location: string;
    description?: string;
}

const ZooCard: React.FC<ZooCardProps> = ({ id, name, location, description }) => {
    return (
        <div className='item'>
            <Link href={`/zoos/${id}`}>
                <h2>{name}</h2>
                <Image src="/image/hizurun.png" alt='ロゴ' width={200} height={200} />
                <p>Location: {location}</p>
                <p className='text_right'>{description || 'No description available'}</p>
            </Link>
        </div>
    );
};

export default ZooCard;
