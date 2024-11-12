@extends('layouts.admin')

@section('content')
<div class="container">
    <h1>管理者ダッシュボード</h1>
    <div class="row">
        <div class="col-md-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">総注文数</h5>
                    <p class="card-text">{{ $totalOrders }}</p>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">総ユーザー数</h5>
                    <p class="card-text">{{ $totalUsers }}</p>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">総商品数</h5>
                    <p class="card-text">{{ $totalProducts }}</p>
                </div>
            </div>
        </div>
    </div>
    <h2 class="mt-4">最近の注文</h2>
    <table class="table">
        <thead>
            <tr>
                <th>注文ID</th>
                <th>ユーザー名</th>
                <th>合計金額</th>
                <th>ステータス</th>
                <th>注文日</th>
            </tr>
        </thead>
        <tbody>
            @foreach($recentOrders as $order)
            <tr>
                <td>{{ $order->id }}</td>
                <td>{{ $order->user->name }}</td>
                <td>¥{{ number_format($order->total_amount) }}</td>
                <td>{{ $order->status }}</td>
                <td>{{ $order->created_at->format('Y-m-d H:i') }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
</div>
@endsection