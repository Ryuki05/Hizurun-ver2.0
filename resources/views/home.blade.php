@extends('layouts.app')

@section('title', 'ホーム')

@section('content')
    <h1>ようこそ、{{ config('app.name') }}へ</h1>

    <section>
        <h2>人気商品</h2>
        <div>
            @forelse($popularProducts as $product)
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
                <p>現在、人気商品はありません。</p>
            @endforelse
        </div>
    </section>

    <section>
        <h2>カテゴリー</h2>
        <div>
            @forelse($categories as $category)
                <div>
                    <div>
                        <div>
                            <h3>{{ e($category->name) }}</h3>
                            <a href="{{ route('products.index', ['category' => $category->id]) }}">商品を見る</a>
                        </div>
                    </div>
                </div>
            @empty
                <p>カテゴリーがありません。</p>
            @endforelse
        </div>
    </section>

    <section>
        <h2>おすすめ商品</h2>
        <div>
            @forelse($recommendedProducts as $product)
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
                <p>現在、おすすめ商品はありません。</p>
            @endforelse
        </div>
    </section>
@endsection