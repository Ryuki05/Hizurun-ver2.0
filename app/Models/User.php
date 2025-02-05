<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Product;
use App\Models\CartItem;
use App\Models\Order;
use App\Models\Review;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
   *  一括割り当て可能な属性
   *
   * @var array<int, string>
   */
    protected $fillable = [
        'name',
        'email',
        'password',
        'remember_token',
        'cart_session',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'cart_session' => 'array',
        'is_admin' => 'boolean',
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
        return $this->belongsToMany(Product::class, 'wishlists', 'user_id', 'product_id')
                    ->withTimestamps();
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

    /**
     * ユーザーのセッション情報を更新
     */
    public function updateCartSession(array $cartData): void
    {
        $this->cart_session = $cartData;
        $this->save();
    }

    /**
     * ユーザーのセッション情報を取得
     */
    public function getCartSession(): ?array
    {
        return $this->cart_session;
    }
}
