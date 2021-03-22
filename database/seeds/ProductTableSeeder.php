<?php

use App\Product\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('products')->truncate();
        DB::table('product_supplier')->truncate();

        $product = Product::create([
            'name' => 'Pace Sol',
            'description' => 'This is a headset by Sauti Sol',
            'quantity' => '4',
        ]);

        $product->suppliers()->attach(1);

        $product = Product::create([
            'name' => 'Logitech Mouse',
            'description' => 'This is a computer mouse by logitech',
            'quantity' => '1',
        ]);

        $product->suppliers()->attach(2);

        $product = Product::create([
            'name' => 'Hp Monitor 21 Inch',
            'description' => 'This is a 21 Inch monitor by HP',
            'quantity' => '1',
        ]);

        $product->suppliers()->attach(3);

        $product = Product::create([
            'name' => 'Standing Desk 1metre',
            'description' => 'For Developers',
            'quantity' => '1',
        ]);

        $product->suppliers()->attach(4);

        $product = Product::create([
            'name' => 'Office Chair Black',
            'description' => 'For Developers',
            'quantity' => '1',
        ]);

        $product->suppliers()->attach(5);
    }
}
