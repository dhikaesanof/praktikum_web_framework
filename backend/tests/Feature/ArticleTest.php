<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Article;
use Laravel\Sanctum\Sanctum;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ArticleTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_can_view_articles()
    {
        Article::factory()->create();

        $response = $this->getJson('/api/articles');

        $response->assertStatus(200);
    }

    public function test_guest_cannot_create_article()
    {
        $response = $this->postJson('/api/articles', [
            'title' => 'Test',
            'content' => 'Test Content'
        ]);

        $response->assertStatus(401);
    }

    public function test_authenticated_user_can_create_article()
    {
        $user = User::factory()->create();

        Sanctum::actingAs($user);

        $response = $this->postJson('/api/articles', [
            'title' => 'Artikel Test',
            'content' => 'Isi Artikel'
        ]);

        $response->assertStatus(201);
    }

    public function test_authenticated_user_can_update_article()
    {
        $user = User::factory()->create();

        Sanctum::actingAs($user);

        $article = Article::factory()->create();

        $response = $this->putJson(
            "/api/articles/{$article->id}",
            [
                'title' => 'Judul Baru',
                'content' => 'Konten Baru'
            ]
        );

        $response->assertStatus(200);
    }

    public function test_authenticated_user_can_delete_article()
    {
        $user = User::factory()->create();

        Sanctum::actingAs($user);

        $article = Article::factory()->create();

        $response = $this->deleteJson(
            "/api/articles/{$article->id}"
        );

        $response->assertStatus(200);
    }
}