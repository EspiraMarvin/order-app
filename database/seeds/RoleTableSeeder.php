<?php

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Role::create([
            'name' => 'admin',
            'display_name' => 'Administrator'
        ]);

        Role::create([
            'name' => 'normal',
            'display_name' => 'Normal User'
        ]);
    }
}
