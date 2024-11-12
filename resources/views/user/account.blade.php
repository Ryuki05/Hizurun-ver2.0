@extends('layouts.app')

@section('title', 'アカウント')

@section('content')
<div>
    <h1>アカウント情報</h1>

    <div>
        <div>
            <section>
                <div>
                    <h2>個人情報</h2>
                </div>
                <div>
                    <form action="{{ route('user.update') }}" method="POST">
                        @csrf
                        @method('PATCH')
                        <div>
                            <label for="name">名前</label>
                            <input type="text" id="name" name="name" value="{{ old('name', $user->name) }}" required>
                        </div>
                        <div>
                            <label for="email">メールアドレス</label>
                            <input type="email" id="email" name="email" value="{{ old('email', $user->email) }}" required>
                        </div>
                        <button type="submit">更新</button>
                    </form>
                </div>
            </section>
        </div>

        <div>
            <section>
                <div>
                    <h2>注文履歴</h2>
                </div>
                <div>
                    @forelse($orders as $order)
                        <div>
                            <h5>注文番号: {{ $order->id }}</h5>
                            <p>合計: ¥{{ number_format($order->total_amount) }}</p>
                            <p>状態: {{ $order->status }}</p>
                            <a href="{{ route('orders.show', $order) }}">詳細を見る</a>
                        </div>
                    @empty
                        <p>注文履歴がありません。</p>
                    @endforelse
                </div>
            </section>
        </div>
    </div>

    <section>
        <div>
            <h2>ウィッシュリスト</h2>
        </div>
        <div>
            <div>
                @forelse($wishlist as $product)
                    <div>
                        <div>
                            <img src="{{ asset('storage/' . $product->image_path) }}" alt="{{ e($product->name) }}">
                            <div>
                                <h5>{{ e($product->name) }}</h5>
                                <p>価格: ¥{{ number_format($product->price) }}</p>
                                <a href="{{ route('products.show', $product) }}">詳細を見る</a>
                            </div>
                        </div>
                    </div>
                @empty
                    <div>
                        <p>ウィッシュリストは空です。</p>
                    </div>
                @endforelse
            </div>
        </div>
    </section>
</div>
@endsection