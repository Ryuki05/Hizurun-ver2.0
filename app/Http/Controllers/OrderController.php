<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * 注文一覧を取得 (API)
     */
    public function index()
    {
        $orders = auth()->user()->orders()->latest()->get();
        return response()->json($orders);
    }

    /**
     * 注文作成ページの表示 (API)
     */
    public function create()
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
     * 新しい注文の保存 (API)
     */
    public function store(Request $request)
    {
        $request->validate([
            'total_amount' => 'required|numeric|min:0',
        ]);

        $order = Order::create([
            'user_id' => auth()->id(),
            'total_amount' => $request->total_amount,
            'status' => 'pending'
        ]);

        foreach (auth()->user()->cartItems as $item) {
            $order->orderItems()->create([
                'product_id' => $item->product_id,
                'quantity' => $item->quantity,
                'price' => $item->product->price
            ]);
        }

        // カートアイテムを削除
        auth()->user()->cartItems()->delete();

        return response()->json(['message' => '注文が完了しました。', 'order' => $order]);
    }
}
