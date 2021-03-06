<?php

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;


class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->truncate();
        DB::table('role_user')->truncate();
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

        $user->roles()->attach(2);

        $user = User::create([
            'name' => 'Jane Doe',
            'email' => 'janedoe@gmail.com',
            'password' => Hash::make('123secret'),
        ]);

        $user->roles()->attach(2);

        $user = User::create([
            'name' => 'Billy Kimber',
            'email' => 'billykimber@gmail.com',
            'password' => Hash::make('123secret'),
        ]);

        $user->roles()->attach(2);

        $user = User::create([
            'name' => 'Thomas Shelby',
            'email' => 'thomasshelby@gmail.com',
            'password' => Hash::make('123secret'),
        ]);

        $user->roles()->attach(2);


        $user = User::create([
            'name' => 'Polly Gray',
            'email' => 'pollygray@gmail.com',
            'password' => Hash::make('123secret'),
        ]);

        $user->roles()->attach(2);

        $user = User::create([
            'name' => 'Lizzie Stalk',
            'email' => 'lizziestalk@gmail.com',
            'password' => Hash::make('123secret'),
        ]);

        $user->roles()->attach(2);

        $user = User::create([
            'name' => 'Paul Pogba',
            'email' => 'paulpogba@gmail.com',
            'password' => Hash::make('123secret'),
        ]);

        $user->roles()->attach(2);

    }
}
