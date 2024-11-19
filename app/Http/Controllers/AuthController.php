<?php
// app/Http/Controllers/AuthController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;  // User モデルをインポート
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function signup(Request $request)
    {
        // バリデーション
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed', // confirmedを追加
        ]);

        // ユーザーの作成
        $user = User::create([
            'name' => $request['name'],
            'email' => $request['email'],
            'password' => Hash::make($request['password']),  // パスワードをハッシュ化して保存
        ]);

        return response()->json([
            'message' => 'User created successfully.',
            'user' => $user,
        ]);
    }

    public function login(Request $request)
{
    // 入力バリデーション
    $request->validate([
        'name' => 'required|string|max:255',
        'password' => 'required|string|min:8|confirmed', // confirmedを追加
    ]);

    if ($request->fails()) {
        return response()->json(['message' => 'Validation failed', 'errors' => $request->errors()], 400);
    }

    // ユーザーを取得
    $user = User::where('name', $request->name)->first();

    if (!$user || !Hash::check($request->password, $user->password)) {
        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    // 認証成功時にトークンを発行
    $token = $user->createToken('YourAppName')->plainTextToken;

    return response()->json(['message' => 'Login successful', 'token' => $token], 200);
}
}
