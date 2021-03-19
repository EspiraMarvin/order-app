<?php

use App\Product\Product;
use Illuminate\Database\Seeder;

class ProductTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $product = Product::create([
            'name' => 'Pace Sol',
            'description' => 'This is a headset by Sauti Sol',
            'quantity' => '4',
        ]);

//        $product->orders()->attach(1);
        $product->suppliers()->attach(1);

        $product = Product::create([
            'name' => 'Logitech Mouse',
            'description' => 'This is a computer mouse by logitech',
            'quantity' => '1',
        ]);

//        $product->orders()->attach(1);
        $product->suppliers()->attach(2);

        $product = Product::create([
            'name' => 'Hp Monitor 21 Inch',
            'description' => 'This is a 21 Inch monitor by HP',
            'quantity' => '1',
        ]);

//        $product->orders()->attach(1);
        $product->suppliers()->attach(3);
    }
}
