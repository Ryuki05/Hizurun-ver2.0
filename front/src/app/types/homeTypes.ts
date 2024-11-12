// types/homeTypes.ts

export interface Product {
    id: number;
    name: string;
    image_path: string;
    price: number;
}

export interface Category {
    id: number;
    name: string;
}

export interface HomeData {
    popularProducts: Product[];
    categories: Category[];
    recommendedProducts: Product[];
}
// カート関連
export interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
    image_path: string; // 必要に応じて他のプロパティも追加
}

export interface CartItem {
    id: number;          // カートアイテムのID
    productId: number;  // 商品ID
    quantity: number;    // 数量
}
