<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use App\Models\User;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'price',
        'stock',
        'category_id',
        'image_path',
    ];

    protected $appends = ['average_rating'];

    /**
     * 商品が属するカテゴリーを取得
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * 商品に関連する注文項目を取得
     */
    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }

    /**
     * 商品に関するカートアイテムを取得
     */
    public function cartItems()
    {
        return $this->hasMany(CartItem::class);
    }

    /**
     * 商品に関連するレビューを取得
     */
    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    /**
     * 商品の平均評価を取得
     */
    public function getAverageRatingAttribute()
    {
        return $this->reviews()->avg('rating') ?? 0;
    }

    /**
     * 商品がウィッシュリストに追加されているユーザーを取得
     */
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'wishlist');
    }

    /**
     * 在庫があるかどうかを確認
     */
    public function inStock()
    {
        return $this->stock > 0;
    }

    /**
     * 関連商品を取得（同じカテゴリーの商品）
     */
    public function relatedProducts($limit = 4)
    {
        return $this->where('category_id', $this->category_id)
                    ->where('id', '!=', $this->id)
                    ->inRandomOrder()
                    ->limit($limit)
                    ->get();
    }

    /**
     * 商品の在庫を減らす
     */
    public function decreaseStock($quantity)
    {
        if ($this->stock >= $quantity) {
            $this->decrement('stock', $quantity);
            return true;
        }
        return false;
    }

    /**
     * 商品の在庫を増やす
     */
    public function increaseStock($quantity)
    {
        $this->increment('stock', $quantity);
    }

    /**
     * 商品が特定のユーザーのウィッシュリストに含まれているかチェック
     */
    public function isWishlistedBy(User $user)
    {
        return $this->users()->where('user_id', $user->id)->exists();
    }
}