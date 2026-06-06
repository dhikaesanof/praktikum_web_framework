<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_register()
    {
        $response = $this->postJson('/api/register', [
            'name' => 'Dhika',
            'email' => 'dhika@test.com',
            'password' => '12345678'
        ]);

        $response->assertStatus(201);
    }

    public function test_user_can_login()
    {
        User::factory()->create([
            'email' => 'dhika@test.com',
            'password' => bcrypt('12345678')
        ]);

        $response = $this->postJson('/api/login', [
            'email' => 'dhika@test.com',
            'password' => '12345678'
        ]);

        $response->assertStatus(200);
    }
}