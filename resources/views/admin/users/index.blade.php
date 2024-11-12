@extends('layouts.admin')

@section('content')
<div class="container">
    <h1>ユーザー管理</h1>
    <table class="table">
        <thead>
            <tr>
                <th>ID</th>
                <th>名前</th>
                <th>メールアドレス</th>
                <th>登録日</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
            @foreach($users as $user)
            <tr>
                <td>{{ $user->id }}</td>
                <td>{{ $user->name }}</td>
                <td>{{ $user->email }}</td>
                <td>{{ $user->created_at->format('Y-m-d H:i') }}</td>
                <td>
                    <a href="{{ route('admin.users.show', $user) }}" class="btn btn-sm btn-primary">詳細</a>
                    <a href="{{ route('admin.users.edit', $user) }}" class="btn btn-sm btn-secondary">編集</a>
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
    {{ $users->links() }}
</div>
@endsection