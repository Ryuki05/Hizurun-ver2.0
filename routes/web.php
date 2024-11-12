<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ReviewController;

// 管理者用のコントローラー
// use App\Http\Controllers\Admin\AdminController;
// use App\Http\Controllers\Admin\AdminProductController;
// use App\Http\Controllers\Admin\AdminOrderController;
// use App\Http\Controllers\Admin\AdminUserController;

Auth::routes();

// 誰でもアクセスできるルート
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::resource('products', ProductController::class)->only(['index', 'show']);

// 認証が必要なルート
Route::middleware(['auth'])->group(function () {
    // カート関連
    Route::resource('cart', CartController::class)->except(['create', 'edit', 'show']);

    // 注文関連
    Route::resource('orders', OrderController::class)->only(['index', 'create', 'store']);

    // ユーザーアカウント関連
    Route::get('/account', [UserController::class, 'show'])->name('user.account');
    Route::patch('/account', [UserController::class, 'update'])->name('user.update');
    Route::get('/wishlist', [UserController::class, 'wishlist'])->name('user.wishlist');
    Route::post('/wishlist', [UserController::class, 'addToWishlist'])->name('user.wishlist.add');

    // レビュー関連
    Route::post('/products/{product}/reviews', [ReviewController::class, 'store'])->name('reviews.store');
});


// 管理者関連（認証、管理者権限チェック有）
// Route::prefix('admin')->name('admin.')->middleware(['auth', 'admin'])->group(function () {
//     // ダッシュボード
//     Route::get('/', [AdminDashboardController::class, 'index'])->name('dashboard');

//     // 商品管理
//     Route::resource('products', AdminProductController::class);
//     Route::post('products/{product}/update-stock', [AdminProductController::class, 'updateStock'])->name('products.update-stock');

//     // カテゴリ管理
//     Route::resource('categories', AdminCategoryController::class);

//     // 注文管理
//     Route::resource('orders', AdminOrderController::class);
//     Route::patch('orders/{order}/status', [AdminOrderController::class, 'updateStatus'])->name('orders.update-status');

//     // ユーザー管理
//     Route::resource('users', AdminUserController::class);
//     Route::patch('users/{user}/toggle-status', [AdminUserController::class, 'toggleStatus'])->name('users.toggle-status');

//     // レビュー管理
//     Route::resource('reviews', AdminReviewController::class);
//     Route::patch('reviews/{review}/approve', [AdminReviewController::class, 'approve'])->name('reviews.approve');

//     // 設定
//     Route::get('settings', [AdminSettingController::class, 'index'])->name('settings.index');
//     Route::patch('settings', [AdminSettingController::class, 'update'])->name('settings.update');
// });