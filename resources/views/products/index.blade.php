@extends('layouts.app')

@section('title', '商品一覧')

@section('content')
    <h1>商品一覧</h1>

    <form action="{{ route('products.index') }}" method="GET">
        <div>
            <div>
                <input type="text" name="search" value="{{ request('search') }}" placeholder="商品を検索">
            </div>
            <div>
                <select name="category">
                    <option value="">全カテゴリー</option>
                    @foreach($categories as $category)
                        <option value="{{ $category->id }}" {{ request('category') == $category->id ? 'selected' : '' }}>
                            {{ e($category->name) }}
                        </option>
                    @endforeach
                </select>
            </div>
            <div>
                <select name="sort">
                    <option value="">並び替え</option>
                    <option value="price_asc" {{ request('sort') == 'price_asc' ? 'selected' : '' }}>価格: 安い順</option>
                    <option value="price_desc" {{ request('sort') == 'price_desc' ? 'selected' : '' }}>価格: 高い順</option>
                    <option value="newest" {{ request('sort') == 'newest' ? 'selected' : '' }}>新着順</option>
                </select>
            </div>
            <div>
                <button type="submit">検索</button>
            </div>
        </div>
    </form>

    <div>
        @forelse($products as $product)
            <div>
                <div>
                    <img src="{{ asset('storage/' . $product->image_path) }}" alt="{{ e($product->name) }}">
                    <div>
                        <h3>{{ e($product->name) }}</h3>
                        <p>価格: ¥{{ number_format($product->price) }}</p>
                        <a href="{{ route('products.show', $product) }}">詳細を見る</a>
                    </div>
                </div>
            </div>
        @empty
            <div>
                <p>商品が見つかりませんでした。</p>
            </div>
        @endforelse
    </div>

    <div>
        {{ $products->links() }}
    </div>
@endsection