<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'product_id', 'rating', 'comment'];

    /**
     * レーティングの最小値と最大値
     */
    const MIN_RATING = 1;
    const MAX_RATING = 5;

    /**
     * このレビューを投稿したユーザを取得
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * このレビューが関連する商品を取得
     */
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * レーティングのバリデーションルール
     */
    public static function ratingRules()
    {
        return ['required', 'integer', 'min:' . self::MIN_RATING, 'max:' . self::MAX_RATING];
    }

    /**
     * コメントのバリデーションルール
     */
    public static function commentRules()
    {
        return ['required', 'string', 'max:1000'];
    }

    // /**
    //  * レビューが編集可能かどうかを確認
    //  */
    // public function isEditable()
    // {
    //     // 例: レビューが投稿されてから24時間以内なら編集可能
    //     return $this->created_at->addHours(24)->isFuture();
    // }

    // /**
    //  * レビューが削除可能かどうかを確認
    //  */
    // public function isDeletable()
    // {
    //     // 例: レビューが投稿されてから48時間以内なら削除可能
    //     return $this->created_at->addHours(48)->isFuture();
    // }
}