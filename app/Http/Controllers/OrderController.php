<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\CartItem;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * 注文一覧を取得 (API)
     */
    public function index()
    {
        $orders = Order::latest()->get();
        return response()->json($orders);
    }

    /**
     * 注文を作成するためにカートのアイテムと合計金額を取得
     */
    public function create()
    {
        // 仮にユーザーID 1 としてカートアイテムを取得 (認証を外したため)
        $cartItems = CartItem::with('product')->where('user_id', 1)->get();

        // 合計金額を計算
        $total = $cartItems->sum(function ($item) {
            return $item->quantity * $item->product->price;
        });

        return response()->json([
            'cartItems' => $cartItems,
            'total' => $total,
        ]);
    }

    /**
     * 注文を保存する (API)
     */
    public function store(Request $request)
    {
        // 必要なバリデーション
        $request->validate([
            'total_amount' => 'required|numeric|min:0',
        ]);

        // 新しい注文を作成
        $order = Order::create([
            'user_id' => 1,  // 仮にユーザーID 1 として注文を作成
            'total_amount' => $request->total_amount,
            'status' => 'pending', // 注文の状態を「保留」に設定
        ]);

        // カートのアイテムを注文アイテムとして保存
        foreach ($request->cartItems as $item) {
            $order->orderItems()->create([
                'product_id' => $item['product']['id'],  // 商品ID
                'quantity' => $item['quantity'],         // 数量
                'price' => $item['product']['price'],    // 価格
            ]);
        }

        // カートアイテムを削除
        CartItem::where('user_id', 1)->delete();  // 仮にユーザーID 1 としてカートアイテムを削除

        return response()->json(['message' => '注文が完了しました。', 'order' => $order]);
    }
}
