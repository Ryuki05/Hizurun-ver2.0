'use client'
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image'; // Imageコンポーネントをインポート

interface Category {
    id: number;
    name: string;
}

interface Product {
    id: number;
    name: string;
    price: number;
    image_path: string;
}

interface ProductListData {
    products: Product[];
    categories: Category[];
    current_page: number;
    last_page: number;
    total: number;
}

const ProductListPage = () => {
    const searchParams = useSearchParams();
    const [data, setData] = useState<ProductListData | null>(null);

    // クエリパラメータを取得
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const sort = searchParams.get('sort') || '';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const params = new URLSearchParams();
                if (search) params.append('search', search);
                if (category) params.append('category', category);
                if (sort) params.append('sort', sort);

                const response = await fetch(`http://localhost:8000/api/products?${params.toString()}`);
                if (!response.ok) {
                    throw new Error('データの取得に失敗しました');
                }
                const result: ProductListData = await response.json();
                setData(result);
            } catch (error) {
                console.error('エラー:', error);
            }
        };

        fetchData();
    }, [search, category, sort]);

    if (!data) {
        return <div>読み込み中...</div>;
    }

    return (
        <div>
            <h1>商品一覧</h1>
            <div>
                {data.products.length > 0 ? (
                    data.products.map((product) => (
                        <div key={product.id}>
                            <div>
                                <Image
                                    src={product.image_path}
                                    alt={product.name}
                                    width={200}
                                    height={200}
                                    layout="responsive"
                                />
                                <div>
                                    <h3>{product.name}</h3>
                                    <p>価格: ¥{new Intl.NumberFormat().format(product.price)}</p>
                                    <a href={`/products/${product.id}`}>詳細を見る</a>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>
                        <p>商品が見つかりませんでした。</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductListPage;
