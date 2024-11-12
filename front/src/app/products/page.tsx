'use client'
import { useEffect, useState } from 'react';
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
    const [data, setData] = useState<ProductListData | null>(null);
    const [search, setSearch] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [sort, setSort] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/products');
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
    }, []);

    const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const params = new URLSearchParams();
        if (search) params.append('search', search);
        if (category) params.append('category', category);
        if (sort) params.append('sort', sort);

        const response = await fetch(`http://localhost:8000/api/products?${params.toString()}`);
        if (response.ok) {
            const result: ProductListData = await response.json();
            setData(result);
        } else {
            console.error('検索に失敗しました');
        }
    };

    if (!data) {
        return <div>読み込み中...</div>;
    }

    return (
        <div>
            <h1>商品一覧</h1>

            <form  onSubmit={handleSearch}>
                <div>
                    <input
                        type="text"
                        name="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="商品を検索"
                    />
                    <select
                        name="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">全カテゴリー</option>
                        {data.categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                    <select
                        name="sort"
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                    >
                        <option value="">並び替え</option>
                        <option value="price_asc">価格: 安い順</option>
                        <option value="price_desc">価格: 高い順</option>
                        <option value="newest">新着順</option>
                    </select>
                    <button type="submit">検索</button>
                </div>
            </form>

            <div>
                {data.products.length > 0 ? (
                    data.products.map((product) => (
                        <div key={product.id}>
                            <div>
                                <Image
                                    src={product.image_path}
                                    alt={product.name}
                                    width={200} // 適切な幅を設定
                                    height={200} // 適切な高さを設定
                                    layout="responsive" // レスポンシブ設定
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

            <div>
                <div>
                    {Array.from({ length: data.last_page }, (_, index) => (
                        <button
                            key={index}
                            onClick={async () => {
                                const response = await fetch(`/api/products?page=${index + 1}`);
                                if (response.ok) {
                                    const result: ProductListData = await response.json();
                                    setData(result);
                                }
                            }}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductListPage;
