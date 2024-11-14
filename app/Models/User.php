<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use App\Models\CartItem;  // CartItemモデルをインポート

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    /**
     * ユーザーの注文を取得
     */
    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    /**
     * ユーザーのカートアイテムを取得
     */
    public function cartItems(): HasMany
    {
        return $this->hasMany(CartItem::class);  // CartItemとの関係を定義
    }

    /**
     * ユーザーのレビューを取得
     */
    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }

    /**
     * ユーザーのウィッシュリストを取得
     */
    public function wishlist(): BelongsToMany
    {
        return $this->belongsToMany(Product::class, 'wishlist')->withTimestamps();
    }

    /**
     * ユーザーが管理者かどうかを確認
     */
    public function isAdmin(): bool
    {
        return $this->is_admin;
    }

    /**
     * ユーザーの最新の注文を取得
     */
    public function latestOrder()
    {
        return $this->orders()->latest()->first();
    }

    /**
     * ユーザーのカートの合計金額を計算
     */
    public function cartTotal()
    {
        return $this->cartItems->sum(function ($item) {
            return $item->quantity * $item->product->price;
        });
    }

    /**
     * 商品をウィッシュリストに追加または削除
     */
    public function toggleWishlist(Product $product)
    {
        return $this->wishlist()->toggle($product);
    }
}
