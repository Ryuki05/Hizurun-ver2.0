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

        $productPrefixes = ['高性能', '快適', '軽量', 'スマート', 'エコ', '多機能'];
        $productSuffixes = ['デバイス', 'アイテム', 'ガジェット', 'ツール', 'セット', 'キット'];

        for ($i = 0; $i < 200; $i++) {
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