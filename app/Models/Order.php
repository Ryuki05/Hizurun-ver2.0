<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'total_amount', 'status'];

    /**
     * この注文を行ったユーザーを取得
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * この注文に含まれる注文項目を取得
     */
    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }

    /**
     * 注文ステータスの定数
     */
    const STATUS_PENDING = 'pending';
    const STATUS_PROCESSING = 'processing';
    const STATUS_COMPLETED = 'completed';
    const STATUS_CANCELLED = 'cancelled';

    /**
     * 利用可能な注文ステータスの配列
     */
    public static function getAvailableStatuses()
    {
        return [
            self::STATUS_PENDING,
            self::STATUS_PROCESSING,
            self::STATUS_COMPLETED,
            self::STATUS_CANCELLED
        ];
    }

    /**
     * 注文の合計金額を計算
     */
    public function calculateTotalAmount()
    {
        return $this->orderItems->sum(function ($item) {
            return $item->quantity * $item->price;
        });
    }

    /**
     * 注文が特定のステータスかどうかをチェック
     */
    public function isStatus($status)
    {
        return $this->status === $status;
    }
}