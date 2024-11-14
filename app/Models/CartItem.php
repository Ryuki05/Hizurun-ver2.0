<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo; // 追加
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasMany;
class CartItem extends Model
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'product_id',
        'quantity',
        'user_id',
    ];

    /**
     * このカートアイテムが属するユーザーを取得
     *
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * このカートアイテムに関する商品を取得
     *
     * @return BelongsTo
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * カートアイテムの小計を計算
     *
     * @return float
     */
    public function getSubtotalAttribute(): float
    {
        return $this->quantity * $this->product->price;
    }

    /**
     * カートアイテムの在庫チェック
     *
     * @return bool
     */
    public function hasEnoughStock(): bool
    {
        return $this->product->stock >= $this->quantity;
    }

    /**
     * ユーザーが持つカートアイテムを取得
     *
     * @return HasMany
     */
    public function cartItems(): HasMany
    {
        return $this->hasMany(CartItem::class);
    }
}
