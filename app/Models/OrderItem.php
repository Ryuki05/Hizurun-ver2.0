<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    use HasFactory;

    protected $fillable = ['order_id', 'product_id', 'quantity', 'price'];

    /**
     * この注文項目が属する注文を取得
     */
    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    /**
     * この注文項目に関連する商品を取得
     */
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * 注文項目の小計を計算
     */
    public function getSubtotalAttribute()
    {
        return $this->quantity * $this->price;
    }

    /**
     * 注文項目の在庫チェック
     */
    public function hasEnoughStock()
    {
        return $this->product->stock >= $this->quantity;
    }
}