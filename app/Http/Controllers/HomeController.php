<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * ホームページのデータをJSON形式で返す
     */
    public function index()
    {
        // 人気商品：注文アイテム数の多い順に上位3つの商品を取得
        $popularProducts = Product::withCount('orderItems')
                                  ->orderBy('order_items_count', 'desc')
                                  ->take(3)
                                  ->get();

        // カテゴリー：親カテゴリ(parent_idがnull)とその子カテゴリを取得
        $categories = Category::whereNull('parent_id')->with('children')->get();

        // おすすめ商品：ランダムに5つの商品を取得
        $recommendedProducts = Product::inRandomOrder()->take(6)->get();

        // JSON形式でデータを返す
        return response()->json([
            'popularProducts' => $popularProducts,
            'categories' => $categories,
            'recommendedProducts' => $recommendedProducts,
        ]);
    }
}
