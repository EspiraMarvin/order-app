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
            'name' => 'Espira Marvin',
            'email' => 'espiramarvin@gmail.com',
            'password' => Hash::make('123secret'),
        ]);

        $user->roles()->attach(1);

        $user = User::create([
            'name' => 'John Doe',
            'email' => 'johndoe@gmail.com',
            'password' => Hash::make('123secret'),
        ]);

        $user->roles()->attach(1);

        $user = User::create([
            'name' => 'Jane Doe',
            'email' => 'janedoe@gmail.com',
            'password' => Hash::make('123secret'),
        ]);

        $user->roles()->attach(1);
    }
}
