<?php
namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;

class CartController extends Controller
{
    /**
     * カート内容の表示 (API)
     */
    public function apiIndex(Request $request)
    {
        // ユーザーが認証されていない場合でもカートの内容を取得
        $cartItems = session()->get('cart', []);
        $total = array_reduce($cartItems, function($sum, $item) {
            return $sum + $item['quantity'] * $item['price'];
        }, 0);

        return response()->json([
            'cartItems' => $cartItems,
            'total' => $total,
        ]);
    }

    /**
     * カートに商品を追加する (API)
     */
    public function apiAddToCart(Request $request)
    {
        $validatedData = $request->validate([
            'product_id' => 'required|integer|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        // カートに商品を追加（セッションに格納）
        $cart = session()->get('cart', []);
        $product = Product::find($validatedData['product_id']);

        // 商品がすでにカートに存在する場合は数量を更新
        if (isset($cart[$product->id])) {
            $cart[$product->id]['quantity'] += $validatedData['quantity'];
        } else {
            $cart[$product->id] = [
                'name' => $product->name,
                'price' => $product->price,
                'quantity' => $validatedData['quantity'],
                'image' => $product->image_path,
            ];
        }

        // セッションにカートを保存
        session()->put('cart', $cart);

        return response()->json(['message' => 'カートに商品が追加されました。']);
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

        $cart = session()->get('cart', []);

        foreach ($validatedData['quantities'] as $productId => $quantity) {
            if (isset($cart[$productId])) {
                $cart[$productId]['quantity'] = $quantity;
            }
        }

        // セッションにカートを更新して保存
        session()->put('cart', $cart);

        return response()->json(['message' => 'カートが更新されました。']);
    }

    /**
     * カートから商品を削除する (API)
     */
    public function apiDestroy(Request $request)
    {
        $validatedData = $request->validate([
            'product_id' => 'required|integer',
        ]);

        $cart = session()->get('cart', []);

        // 指定された商品をカートから削除
        if (isset($cart[$validatedData['product_id']])) {
            unset($cart[$validatedData['product_id']]);
        }

        // セッションにカートを保存
        session()->put('cart', $cart);

        return response()->json(['message' => '商品がカートから削除されました。']);
    }
}
