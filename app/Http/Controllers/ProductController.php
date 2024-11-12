<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * 商品一覧を取得 (API)
     */
    public function index(Request $request)
    {
        $query = Product::query();

        // カテゴリーフィルター
        if ($request->has('category') && $request->category != '') {
            $query->where('category_id', $request->category);
        }

        // 検索フィルター
        if ($request->has('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        // ソート順
        if ($request->has('sort')) {
            switch ($request->sort) {
                case 'price_asc':
                    $query->orderBy('price', 'asc');
                    break;
                case 'price_desc':
                    $query->orderBy('price', 'desc');
                    break;
                case 'newest':
                    $query->orderBy('created_at', 'desc');
                    break;
                default:
                    $query->inRandomOrder();
            }
        } else {
            // デフォルトはランダム順
            $query->inRandomOrder();
        }

        $products = $query->with('category')->paginate(20);
        $categories = Category::all();

        return response()->json([
            'products' => $products,
            'categories' => $categories,
        ]);
    }

    /**
     * 商品の詳細を取得 (API)
     */
    public function show(Product $product)
    {
        $relatedProducts = Product::with('category')
            ->where('category_id', $product->category_id)
            ->where('id', '!=', $product->id)
            ->take(4)
            ->get();

        $reviews = $product->reviews()->with('user')->get();

        return response()->json([
            'product' => $product,
            'relatedProducts' => $relatedProducts,
            'reviews' => $reviews,
        ]);
    }
}
