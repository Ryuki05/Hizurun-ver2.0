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
    public function show(Request $request)
    {
        try {
            $user = Auth::user();
            if (!$user) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }

            return response()->json([
                'user' => $user,
                'orders' => $user->orders,
                'wishlist' => $user->wishlist
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Server Error'], 500);
        }
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
        ]);

        User::where('id', $user->id)->update($validated);
        $updatedUser = User::find($user->id);

        return response()->json([
            'message' => 'プロフィールが更新されました。',
            'user' => $updatedUser,
        ]);
    }

    /**
     * ウィッシュリストの取得
     */
    // public function wishlist()
    // {
    //     $wishlistItems = Auth::user()->wishlist()
    //         ->with('category')
    //         ->get();

    //     return response()->json([
    //         'status' => 'success',
    //         'wishlist' => $wishlistItems
    //     ]);
    // }

    /**
     * ウィッシュリストに商品を追加
     */
    // public function addToWishlist(Request $request)
    // {
    //     $product = Product::findOrFail($request->product_id);
    //     Auth::user()->wishlist()->attach($product->id);

    //     return response()->json([
    //         'message' => '商品がウィッシュリストに追加されました。',
    //         'product' => $product,
    //     ]);
    // }
}
