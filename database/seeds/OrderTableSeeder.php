<?php

use App\Order\Order;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OrderTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        DB::table('orders')->truncate();
        DB::table('order_details')->truncate();

        $order = Order::create([
            'order_no' => '1',
        ]);

        $order->products()->attach(1);

        $order = Order::create([
            'order_no' => '2',
        ]);

        $order->products()->attach(2);

        $order = Order::create([
            'order_no' => '3',
        ]);

        $order->products()->attach(3);
    }
}
