@extends('layouts.admin')

@section('content')
<div class="container">
    <h1>注文管理</h1>
    <table class="table">
        <thead>
            <tr>
                <th>注文ID</th>
                <th>ユーザー名</th>
                <th>合計金額</th>
                <th>ステータス</th>
                <th>注文日</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
            @foreach($orders as $order)
            <tr>
                <td>{{ $order->id }}</td>
                <td>{{ $order->user->name }}</td>
                <td>¥{{ number_format($order->total_amount) }}</td>
                <td>{{ $order->status }}</td>
                <td>{{ $order->created_at->format('Y-m-d H:i') }}</td>
                <td>
                    <a href="{{ route('admin.orders.show', $order) }}" class="btn btn-sm btn-primary">詳細</a>
                    <a href="{{ route('admin.orders.edit', $order) }}" class="btn btn-sm btn-secondary">ステータス変更</a>
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
    {{ $orders->links() }}
</div>
@endsection