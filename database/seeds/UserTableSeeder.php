<?php

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = User::create([
            'name' => 'Admin Marvin',
            'email' => 'espiramarvin@gmail.com',
            'password' => Hash::make('123secret'),
            'phone' => '254701437909',
            'id_no' => '123644899'
        ]);

        $user->roles()->attach(1);

        $user = User::create([
            'name' => 'Yusuf Mungai',
            'email' => 'yusuf.mungai@gmail.com',
            'password' => Hash::make('123secret'),
            'phone' => '254722617066',
            'id_no' => '78267288'
        ]);

        $user->roles()->attach(1);
    }
}
