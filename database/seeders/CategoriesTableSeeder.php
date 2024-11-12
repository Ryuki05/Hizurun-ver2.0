<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategoriesTableSeeder extends Seeder
{
    public function run()
    {
        $categories = [
            '家電製品',
            'ファッション',
            '食品・飲料',
            '本・雑誌',
            'スポーツ用品',
            'ホーム・キッチン',
            'ビューティー・健康',
            'おもちゃ・ゲーム',
            'DIY・工具',
            'ペット用品'
        ];

        foreach ($categories as $category) {
            Category::create(['name' => $category]);
        }
    }
}