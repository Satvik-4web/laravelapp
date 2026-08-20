<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $roles = ['Admin', 'Principal', 'HOD', 'Faculty', 'Student'];

        foreach ($roles as $role) {
            $email = strtolower($role) . '@example.com';
            
            // Check if user already exists
            if (!User::where('email', $email)->exists()) {
                User::create([
                    'name' => $role . ' User',
                    'email' => $email,
                    'password' => \Illuminate\Support\Facades\Hash::make('password'),
                    'role' => $role,
                ]);
            }
        }
    }
}
