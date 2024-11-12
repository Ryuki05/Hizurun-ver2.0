@extends('layouts.app')

@section('title', 'チェックアウト')

@section('content')
<div>
    <h1>チェックアウト</h1>

    <form action="{{ route('orders.store') }}" method="POST">
        @csrf
        <div>
            <div>
                <h2>配送情報</h2>
                <div>
                    <label for="name">氏名</label>
                    <input type="text" id="name" name="name" required value="{{ auth()->user()->name }}">
                </div>
                <div>
                    <label for="email">メールアドレス</label>
                    <input type="email" id="email" name="email" required value="{{ auth()->user()->email }}">
                </div>
                <div>
                    <label for="address">住所</label>
                    <input type="text" id="address" name="address" required>
                </div>
                <div>
                    <label for="phone">電話番号</label>
                    <input type="tel" id="phone" name="phone" required>
                </div>
    
                <h2>支払い方法</h2>
                <div>
                    <select name="payment_method" required>
                        <option value="">選択してください</option>
                        <option value="credit_card">クレジットカード</option>
                        <option value="bank_transfer">銀行振込</option>
                        <option value="convenience_store">コンビニ決済</option>
                    </select>
                </div>
            </div>
    
            <div>
                <h2>注文内容</h2>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>商品名</th>
                                <th>数量</th>
                                <th>価格</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach($cartItems as $item)
                                <tr>
                                    <td>{{ e($item->product->name) }}</td>
                                    <td>{{ $item->quantity }}</td>
                                    <td>¥{{ number_format($item->product->price * $item->quantity) }}</td>
                                </tr>
                            @endforeach
                        </tbody>
                        <tfoot>
                            <tr>
                                <th colspan="2">合計</th>
                                <td>¥{{ number_format($total) }}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    
        <div>
            <button type="submit">注文を確定する</button>
        </div>
    </form>
</div>
@endsection