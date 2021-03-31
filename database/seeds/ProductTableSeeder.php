<?php

use App\Models\Product;
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

        Product::create([
            'name' => 'Pace Sol',
            'description' => 'This is a headset by Sauti Sol',
            'quantity' => '4',
        ]);

        Product::create([
            'name' => 'Logitech Mouse',
            'description' => 'This is a computer mouse by logitech',
            'quantity' => '1',
        ]);


         Product::create([
            'name' => 'Hp Monitor 21 Inch',
            'description' => 'This is a 21 Inch monitor by HP',
            'quantity' => '1',
        ]);

        Product::create([
            'name' => 'Standing Desk 1metre',
            'description' => 'For Developers',
            'quantity' => '1',
        ]);


        Product::create([
            'name' => 'Office Chair Black',
            'description' => 'For Developers',
            'quantity' => '1',
        ]);


        Product::create([
            'name' => 'Amazon FireTv',
            'description' => 'For SmartTv Home',
            'quantity' => '3',
        ]);


        Product::create([
            'name' => 'Samsung Galaxy A71 Matte',
            'description' => 'High End Smartphone',
            'quantity' => '2',
        ]);

        Product::create([
            'name' => 'USB Type C',
            'description' => 'Phone Accessory',
            'quantity' => '6',
        ]);

    }

}
