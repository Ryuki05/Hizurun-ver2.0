<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;  // User モデルをインポート
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * サインアップ処理
     */
    public function signup(Request $request)
    {
        try {
            // バリデーション
            $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:users,email',
                'password' => 'required|string|min:8', // confirmedを削除
            ]);

            // ユーザー作成
            $user = User::create([
                'name' => $request->input('name'),
                'email' => $request->input('email'),
                'password' => Hash::make($request->input('password')),
            ]);

            return response()->json([
                'message' => 'User created successfully.',
                'user' => $user,
            ], 201); // HTTP 201 Created

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => $e->errors(),
            ], 422); // HTTP 422 Unprocessable Entity

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred',
                'error' => $e->getMessage(),
            ], 500); // HTTP 500 Internal Server Error
        }
    }

    /**
     * ログイン処理
     */
    public function login(Request $request)
    {
        // バリデーション
        $request->validate([
            'name' => 'required|string|max:255',
            'password' => 'required|string|min:8',
        ]);

        // ユーザー取得
        $user = User::where('email', $request->input('email'))->first();

        if (!$user || !Hash::check($request->input('password'), $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401); // HTTP 401 Unauthorized
        }

        // トークン発行
        $token = $user->createToken('Hizurun')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'token' => $token,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ]
        ], 200); // HTTP 200 OK
    }
}
