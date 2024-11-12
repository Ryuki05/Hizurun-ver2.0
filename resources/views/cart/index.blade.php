@extends('layouts.app')

@section('title', 'カート')

@section('content')
<div>
    <h1>カート</h1>
    @if($cartItems->count() > 0)
    <form action="{{ route('cart.update', ['cart' => 'bulk']) }}" method="POST">
        @csrf
        @method('PATCH')
        <table>
            <thead>
                <tr>
                    <th>商品</th>
                    <th>価格</th>
                    <th>数量</th>
                    <th>小計</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                @foreach($cartItems as $item)
                    <tr>
                        <td>
                            <img src="{{ asset('storage/' . $item->product->image_path) }}" alt="{{ e($item->product->name) }}">
                            {{ e($item->product->name) }}
                        </td>
                        <td>¥{{ number_format($item->product->price) }}</td>
                        <td>
                            <input type="number" name="quantities[{{ $item->id }}]" value="{{ $item->quantity }}" min="1" max="{{ $item->product->stock }}">
                        </td>
                        <td>¥{{ number_format($item->product->price * $item->quantity) }}</td>
                        <td>
                            <button type="submit" name="remove" value="{{ $item->id }}">削除</button>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
        <div>
            <table>
                <button type="submit">カートを更新</button>
                <tr>
                    <th>合計</th>
                    <td>¥{{ number_format($total) }}</td>
                </tr>
            </table>
            <a href="{{ route('orders.create') }}">チェックアウトへ進む</a>
        </div>
    </form>
    @else
    <div>
        カートは空です。<a href="{{ route('products.index') }}">商品一覧</a>から商品を追加してください。
    </div>
    @endif
</div>
@endsection@extends('layouts.app')

@section('title', 'カート')

@section('content')
<div>
    <h1>カート</h1>
    @if($cartItems->count() > 0)
    <form action="{{ route('cart.update', ['cart' => 'placeholder']) }}" method="POST">
        @csrf
        @method('PATCH')
        <table>
            <thead>
                <tr>
                    <th>商品</th>
                    <th>価格</th>
                    <th>数量</th>
                    <th>小計</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                @foreach($cartItems as $item)
                    <tr>
                        <td>
                            <img src="{{ asset('storage/' . $item->product->image_path) }}" alt="{{ e($item->product->name) }}">
                            {{ e($item->product->name) }}
                        </td>
                        <td>¥{{ number_format($item->product->price) }}</td>
                        <td>
                            <input type="number" name="quantities[{{ $item->id }}]" value="{{ $item->quantity }}" min="1" max="{{ $item->product->stock }}">
                        </td>
                        <td>¥{{ number_format($item->product->price * $item->quantity) }}</td>
                        <td>
                            <button type="submit" name="remove" value="{{ $item->id }}">削除</button>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
        <div>
            <table>
                <tr>
                    <th>合計</th>
                    <td>¥{{ number_format($total) }}</td>
                </tr>
            </table>
            <button type="submit">カートを更新</button>
            <a href="{{ route('orders.create') }}">チェックアウトへ進む</a>
        </div>
    </form>
    @else
    <div>
        カートは空です。<a href="{{ route('products.index') }}">商品一覧</a>から商品を追加してください。
    </div>
    @endif
</div>
@endsection