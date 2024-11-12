'use client'
import { useEffect, useState } from "react";

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

const Search = () => {
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

    return (
        <div>
            <form onSubmit={handleSearch}>
                <div>

                    <select
                        name="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">全カテゴリー</option>
                        {data && data.categories.map((cat) => (
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
                    <input
                        type="text"
                        name="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="商品を検索"
                        className="p-2 border rounded w-full"
                    />
                    <button type="submit">検索</button>
                </div>
            </form>
        </div>
    );
}

export default Search;
