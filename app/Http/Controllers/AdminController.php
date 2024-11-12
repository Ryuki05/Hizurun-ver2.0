<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    /**
     * 管理者ダッシュボードの表示 (API)
     */
    public function dashboard()
    {
        // 総注文数を取得
        $totalOrders = Order::count();

        // 総ユーザー数を取得
        $totalUsers = User::count();

        // 総商品数を取得
        $totalProducts = Product::count();

        // 最新の５件の注文を、関連ユーザ情報と共に取得
        $recentOrders = Order::with('user')->latest()->take(5)->get();

        // JSONレスポンスを返す
        return response()->json([
            'totalOrders' => $totalOrders,
            'totalUsers' => $totalUsers,
            'totalProducts' => $totalProducts,
            'recentOrders' => $recentOrders,
        ]);
    }

    /**
     * 商品一覧を取得 (API)
     */
    public function products()
    {
        // 商品を１ページあたり２０個ずつ取得
        $products = Product::paginate(20);

        // JSONレスポンスを返す
        return response()->json($products);
    }

    /**
     * 注文一覧を取得 (API)
     */
    public function orders()
    {
        // 注文を関連するユーザ情報と共に、１ページあたり２０件ずつ取得
        $orders = Order::with('user')->paginate(20);

        // JSONレスポンスを返す
        return response()->json($orders);
    }

    /**
     * ユーザ一覧を取得 (API)
     */
    public function users()
    {
        // ユーザを１ページあたり２０件ずつ取得
        $users = User::paginate(20);

        // JSONレスポンスを返す
        return response()->json($users);
    }
}
