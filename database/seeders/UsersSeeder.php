<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Foundation\Testing\WithFaker;

use app\Models\User;

class UsersSeeder extends Seeder
{
    
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //$users = factory(User::class, 5)->create();
        
        $password = Hash::make('himitu');
        $data = [];
        for ($i = 1; $i <= 10; $i++) {
            $data[] = [
                'id' => $i,
                'name' => 'user' . $i,
                'email' => 'user' . $i . '@gmail.com',
                'password' => $password,
            ];
        }
        DB::table('users')->insert($data);
    }
}
