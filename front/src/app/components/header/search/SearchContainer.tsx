'use client'
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import HamburgerMenu from "./HamburgerMenu";
import SearchBar from "./SearchBar";

interface Category {
    id: number;
    name: string;
}

interface ProductListData {
    categories: Category[];
}

const SearchContainer = () => {
    const [data, setData] = useState<ProductListData | null>(null);
    const [search, setSearch] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [sort, setSort] = useState<string>('');
    const router = useRouter();

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

    const handleSearch = async () => {
        const params = new URLSearchParams();
        if (search) params.append('search', search);
        if (category) params.append('category', category);
        if (sort) params.append('sort', sort);

        router.push(`/products?${params.toString()}`);
    };

    return (
        <div className="z-50 hizurun-border ">
            <div className="flex items-center space-x-4 h-10 w-96 hizurun-border-inner">
                <HamburgerMenu
                    category={category}
                    sort={sort}
                    setCategory={setCategory}
                    setSort={setSort}
                    data={data}
                />
                <SearchBar
                    search={search}
                    setSearch={setSearch}
                    onSearch={handleSearch}
                />
            </div>
        </div>
    );
};

export default SearchContainer;
