import { useState } from "react";

interface Category {
    id: number;
    name: string;
}

interface HamburgerMenuProps {
    category: string;
    sort: string;
    setCategory: (value: string) => void;
    setSort: (value: string) => void;
    data: { categories: Category[] } | null;
}

const HamburgerMenu = ({ category, sort, setCategory, setSort, data }: HamburgerMenuProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <div>
            <button
                className="flex flex-col items-center space-y-1.5 p-2"
                onClick={toggleMenu}
                aria-label="Toggle menu"
            >
                <span className={`w-6 h-0.5 bg-hizurun-gr transition-all duration-500 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`w-6 h-0.5 bg-hizurun-gr transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
                <span className={`w-6 h-0.5 bg-hizurun-gr transition-all duration-500 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>

            <div className={`fixed flex  items-center justify-center bg-white bg-opacity-95 z-50 ${isOpen ? 'block' : 'hidden'}`}>
                <ul className="items-center py-4">
                    <li className="py-2">
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
                    </li>
                    <li className="py-2">
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
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default HamburgerMenu;
