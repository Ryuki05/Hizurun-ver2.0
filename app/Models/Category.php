<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'parent_id'];

    /**
     * このカテゴリーに属する商品を取得
     */
    public function products()
    {
        return $this->hasMany(Product::class);
    }

    /**
     * このカテゴリーの親カテゴリーを取得
     */
    public function parent()
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }

    /**
     * このカテゴリーの子カテゴリーを取得
     */
    public function children()
    {
        return $this->hasMany(Category::class, 'parent_id');
    }

    /**
     * このカテゴリーが親カテゴリーかどうかを判定
     */
    public function isParent()
    {
        return $this->parent_id === null;
    }

    /**
     * このカテゴリーの全ての子孫カテゴリーを取得
     */
    public function descendants()
    {
        return $this->children()->with('descendants');
    }
}