@extends('layouts.app')

@section('title', e($product->name))

@section('content')
    <div>
        <div>
            <div>
                <img src="{{ asset('storage/' . $product->image_path) }}" alt="{{ e($product->name) }}">
            </div>
            <div>
                <h1>{{ e($product->name) }}</h1>
                <p>価格: ¥{{ number_format($product->price) }}</p>
                <p>{{ e($product->description) }}</p>
                @auth
                    <form action="{{ route('cart.store') }}" method="POST">
                        @csrf
                        <input type="hidden" name="product_id" value="{{ $product->id }}">
                        <div>
                            <input type="number" name="quantity" value="1" min="1" max="{{ $product->stock }}">
                            <button type="submit">カートに追加</button>
                        </div>
                    </form>
                    <form action="{{ route('user.wishlist.add') }}" method="POST">
                        @csrf
                        <input type="hidden" name="product_id" value="{{ $product->id }}">
                        <button type="submit">ウィッシュリストに追加</button>
                    </form>
                @else
                    <p>カートに追加するには<a href="{{ route('login') }}">ログイン</a>してください。</p>
                @endauth
            </div>
        </div>

        <section>
            <h2>レビュー</h2>
            @forelse($reviews as $review)
                <div>
                    <div>
                        <h5>評価: {{ $review->rating }}/5</h5>
                        <p>{{ e($review->comment) }}</p>
                        <p>投稿者: {{ e($review->user->name) }}</p>
                    </div>
                </div>
            @empty
                <p>まだレビューがありません。</p>
            @endforelse
            
            @auth
                <form action="{{ route('reviews.store', $product) }}" method="POST">
                    @csrf
                    <div>
                        <label for="rating">評価</label>
                        <select name="rating" id="rating" required>
                            <option value="">選択してください</option>
                            @for($i = 1; $i <= 5; $i++)
                                <option value="{{ $i }}">{{ $i }}</option>
                            @endfor
                        </select>
                    </div>
                    <div>
                        <label for="comment">コメント</label>
                        <textarea name="comment" id="comment" required></textarea>
                    </div>
                    <button type="submit">レビューを投稿</button>
                </form>
            @endauth
        </section>

        <section>
            <h2>関連商品</h2>
            <div>
                @forelse($relatedProducts as $relatedProduct)
                    <div>
                        <div>
                            <img src="{{ asset('storage/' . $relatedProduct->image_path) }}" alt="{{ e($relatedProduct->name) }}">
                            <div>
                                <h5>{{ e($relatedProduct->name) }}</h5>
                                <p>価格: ¥{{ number_format($relatedProduct->price) }}</p>
                                <a href="{{ route('products.show', $relatedProduct) }}">詳細を見る</a>
                            </div>
                        </div>
                    </div>
                @empty
                    <p>関連商品がありません。</p>
                @endforelse
            </div>
        </section>
    </div>
@endsection