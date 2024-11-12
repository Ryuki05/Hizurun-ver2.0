@extends('layouts.admin')

@section('content')
<div class="container">
    <h1>商品管理</h1>
    <a href="{{ route('admin.products.create') }}" class="btn btn-primary mb-3">新規商品追加</a>
    <table class="table">
        <thead>
            <tr>
                <th>ID</th>
                <th>商品名</th>
                <th>価格</th>
                <th>在庫</th>
                <th>カテゴリー</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
            @foreach($products as $product)
            <tr>
                <td>{{ $product->id }}</td>
                <td>{{ $product->name }}</td>
                <td>¥{{ number_format($product->price) }}</td>
                <td>{{ $product->stock }}</td>
                <td>{{ $product->category->name }}</td>
                <td>
                    <a href="{{ route('admin.products.edit',