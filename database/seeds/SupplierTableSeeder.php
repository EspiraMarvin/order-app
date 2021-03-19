<?php

use App\Supplier\Supplier;
use Illuminate\Database\Seeder;

class SupplierTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $supplier = Supplier::create([
            'name' => 'John Doe'
        ]);

        $supplier->products()->attach(1);

        $supplier = Supplier::create([
            'name' => 'Jane Doe'
        ]);

        $supplier->products()->attach(1);

        $supplier = Supplier::create([
            'name' => 'Billy Kimber'
        ]);

        $supplier->products()->attach(1);
    }
}
