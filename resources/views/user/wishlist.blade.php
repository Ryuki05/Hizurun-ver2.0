@extends('layouts.app')

@section('title', 'ウィッシュリスト')

@section('content')
<div>
    <h1>ウィッシュリスト</h1>

    @if($wishlistItems->isNotEmpty())
        <div>
            @foreach($wishlistItems as $item)
                <div>
                    <div>
                        <img src="{{ asset('storage/' . $item->image_path) }}" alt="{{ e($item->name) }}">
                        <div>
                            <h5>{{ e($item->name) }}</h5>
                            <p>価格: ¥{{ number_format($item->price) }}</p>
                            <div>
                                <a href="{{ route('products.show', $item) }}">詳細を見る</a>
                                <form action="{{ route('cart.store') }}" method="POST">
                                    @csrf
                                    <input type="hidden" name="product_id" value="{{ $item->id }}">
                                    <input type="hidden" name="quantity" value="1">
                                    <button type="submit">カートに追加</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            @endforeach
        </div>
    @else
        <div>
            ウィッシュリストは空です。<a href="{{ route('products.index') }}">商品一覧</a>から商品を追加してください。
        </div>
    @endif
</div>
@endsection