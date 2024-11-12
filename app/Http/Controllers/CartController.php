<?php
namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CartController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * カート内容の表示 (API)
     */
    public function apiIndex()
    {
        $cartItems = auth()->user()->cartItems()->with('product')->get();
        $total = $cartItems->sum(function($item) {
            return $item->quantity * $item->product->price;
        });

        return response()->json([
            'cartItems' => $cartItems,
            'total' => $total,
        ]);
    }


    /**
     * カートの更新 (API)
     */
    public function apiUpdate(Request $request)
    {
        $validatedData = $request->validate([
            'quantities' => 'required|array',
            'quantities.*' => 'required|integer|min:1',
        ]);

        foreach ($validatedData['quantities'] as $cartItemId => $quantity) {
            $cartItem = auth()->user()->CartItems()->findOrFail($cartItemId);
            $cartItem->update(['quantity' => $quantity]);
        }

        return response()->json(['message' => 'カートが更新されました。']);
    }

    /**
     * カートから商品を削除する (API)
     */
    public function apiDestroy(CartItem $cartItem)
    {
        $cartItem->delete();

        return response()->json(['message' => '商品がカートから削除されました。']);
    }
}
