<?php

use App\Supplier\Supplier;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SupplierTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('suppliers')->truncate();

        $supplier = Supplier::create([
            'name' => 'John Doe'
        ]);

        $supplier->products()->attach(1);

        $supplier = Supplier::create([
            'name' => 'Jane Doe'
        ]);

        $supplier->products()->attach(2);

        $supplier = Supplier::create([
            'name' => 'Billy Kimber'
        ]);
        $supplier->products()->attach(3);


        $supplier = Supplier::create([
            'name' => 'Thomas Shelby'
        ]);
        $supplier->products()->attach(4);


        $supplier = Supplier::create([
            'name' => 'Paul Pogba'
        ]);
        $supplier->products()->attach(5);
    }
}
