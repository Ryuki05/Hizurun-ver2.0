<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;

// 誰でもアクセスできるAPIルート
Route::get('/home', [HomeController::class, 'index'])->name('api.home');

// 認証関連のルート
Route::post('/csrf-token', function () {
    return response()->json(['csrfToken' => csrf_token()]);
});

Route::post('/sign-up', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

// 認証が必要なルート
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user/account', [UserController::class, 'show']);
    Route::patch('/user/account', [UserController::class, 'update']);


});
Route::get('/user/wishlist', [UserController::class, 'wishlist'])->name('api.user.wishlist');
    Route::post('/user/wishlist', [UserController::class, 'addToWishlist'])->name('api.user.wishlist.add');

    // カート関連
    Route::get('/cart', [CartController::class, 'apiIndex']);
    Route::post('/cart', [CartController::class, 'apiAddToCart']);
    Route::post('/cart/update', [CartController::class, 'apiUpdate']);
    Route::delete('/cart', [CartController::class, 'apiDestroy']);

// レビュー関連
Route::post('/products/{product}/reviews', [ReviewController::class, 'store'])
->name('api.reviews.store');

// admin
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/dashboard', [AdminController::class, 'dashboard']);
    Route::get('/admin/products', [AdminController::class, 'products']);
    Route::get('/admin/orders', [AdminController::class, 'orders']);
    Route::get('/admin/users', [AdminController::class, 'users']);
});

// Order
Route::get('/orders', [OrderController::class, 'index']);
Route::get('/orders/create', [OrderController::class, 'create']);
Route::post('/orders', [OrderController::class, 'store']);

// product
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{product}', [ProductController::class, 'show']);

// ユーザー情報の取得
Route::middleware('auth:sanctum')->post('/user', function (Request $request) {
    return $request->user();
});
