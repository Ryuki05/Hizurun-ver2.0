<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * ユーザーアカウント情報をJSONで返す
     */
    public function show()
    {
        $user = Auth::user();
        $orders = $user->orders()->latest()->take(5)->get();
        $wishlistItems = $user->wishlist()->get();

        return response()->json([
            'user' => $user,
            'orders' => $orders,
            'wishlistItems' => $wishlistItems,
        ]);
    }

    /**
     * ユーザプロフィールの更新
     */
    public function update(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            // 他の必要なバリデーションルールを追加
        ]);

        $user->update($validated);

        return response()->json([
            'message' => 'プロフィールが更新されました。',
            'user' => $user,
        ]);
    }

    /**
     * ウィッシュリストの取得
     */
    public function wishlist()
    {
        $wishlistItems = Auth::user()->wishlist()->get();

        return response()->json($wishlistItems);
    }

    /**
     * ウィッシュリストに商品を追加
     */
    public function addToWishlist(Request $request)
    {
        $product = Product::findOrFail($request->product_id);
        auth()->user()->wishlist()->attach($product->id);

        return response()->json([
            'message' => '商品がウィッシュリストに追加されました。',
            'product' => $product,
        ]);
    }
}
