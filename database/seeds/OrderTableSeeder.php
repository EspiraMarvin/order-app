<?php

use App\Order\Order;
use Illuminate\Database\Seeder;

class OrderTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $order = Order::create([
            'order_no' => '1'
        ]);

        $order->products()->attach(1);

        $order = Order::create([
            'order_no' => '2'
        ]);

        $order->products()->attach(1);

        $order = Order::create([
            'order_no' => '3'
        ]);

        $order->products()->attach(1);
    }
}
