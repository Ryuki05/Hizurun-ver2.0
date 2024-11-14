<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class ProductsTableSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create('ja_JP');
        $categories = Category::all();

        $productPrefixes = [
            '高性能', '快適', '軽量', 'スマート', 'エコ', '多機能',
            '精密', '安全', 'プロ仕様', '人気', '最新', '限定',
            '高品質', 'クラシック', 'レトロ', 'スタンダード',
            'モダン', '革新', '未来型', '持続可能', '特注',
            '革新的', '電動', 'エレガント', '高級', 'ユニーク',
            'ポータブル', '環境対応', '衛生的', '超軽量', '便利',
            '防水', '防塵', 'おしゃれ', '手軽', '本格派',
            '日本製', '和風', '伝統の', '歴史的', '限定版', '文化遺産',
            '桜', '令和', '雅な', '御所風', '名家の', '古典風', '武士の', '侍魂', '家宝級'
        ];

        $productSuffixes = [
            'デバイス', 'アイテム', 'ガジェット', 'ツール', 'セット',
            'キット', 'コレクション', 'パッケージ', 'シリーズ',
            'コネクタ', 'アクセサリー', 'バッテリー', 'スタンド',
            'バッグ', 'ケース', '充電器', 'ストラップ', 'ヘッドセット',
            'コンバーター', 'オプション', 'モジュール', 'カスタムパーツ',
            'インシュレーター', 'ドローン', 'ロボット', 'ビジュアルツール',
            'サポートツール', 'クリーンツール', 'システム', 'ハーネス',
            'ディスプレイ', 'カメラ', 'スピーカー', 'ランプ', 'クッション',
            '屏風セット', '巻物', '古代図案', '手ぬぐい', '湯のみ',
            '甲冑モデル', '扇子', '御守り', '奉納品', '神棚', '掛け軸'
        ];


        for ($i = 0; $i < 500; $i++) {
            $category = $categories->random();
            $name = $faker->randomElement($productPrefixes) . $category->name . $faker->randomElement($productSuffixes);

            Product::create([
                'name' => $name,
                'description' => $faker->paragraph,
                'price' => $faker->numberBetween(100, 100000),
                'stock' => $faker->numberBetween(1, 100),
                'category_id' => $category->id,
                'image_path' => $faker->imageUrl(640, 480, 'products', true),
                'created_at' => $faker->dateTimeBetween('-1 year', 'now'),
                'updated_at' => $faker->dateTimeBetween('-1 year', 'now'),
            ]);
        }
    }
}
