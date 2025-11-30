<?php

namespace Tests\Feature;

use App\Jobs\StatusPipeline\NewStatusPipeline;
use App\Profile;
use App\Services\OpenAIService;
use App\Status;
use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class AIAgentPostControllerTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Set OpenAI API key for testing
        config(['services.openai.api_key' => 'test-api-key']);
        
        // Clear cache before each test
        Cache::flush();
        
        // Explicitly truncate tables to ensure clean state
        User::query()->forceDelete();
        Profile::query()->forceDelete();
        Status::query()->forceDelete();
    }

    #[Test]
    public function can_create_post_with_ai_generated_content()
    {
        Bus::fake();

        // Create a user with profile
        $user = User::factory()->create();
        $user->refresh();
        $profile = $user->profile;

        // Mock OpenAI API response
        Http::fake([
            'api.openai.com/v1/chat/completions' => Http::response([
                'choices' => [
                    [
                        'message' => [
                            'content' => 'This is an AI-generated post about completing chores! 🎉'
                        ]
                    ]
                ]
            ], 200)
        ]);

        // Create an OAuth token for the user
        $token = $user->createToken('test-token')->accessToken;

        // Make API request
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
            'Accept' => 'application/json',
        ])->postJson('/api/ai_agent/create-post', [
            'user_id' => $user->id,
            'prompt' => 'Write a post about completing daily chores',
            'visibility' => 'public',
        ]);

        // Assert response
        $response->assertStatus(201)
            ->assertJsonStructure([
                'success',
                'status' => [
                    'id',
                    'caption',
                    'url',
                    'visibility',
                    'type',
                ],
            ])
            ->assertJson([
                'success' => true,
                'status' => [
                    'type' => 'text',
                    'visibility' => 'public',
                ],
            ]);

        // Assert post was created in database
        $this->assertDatabaseHas('statuses', [
            'profile_id' => $profile->id,
            'type' => 'text',
            'visibility' => 'public',
            'caption' => 'This is an AI-generated post about completing chores! 🎉',
        ]);

        // Assert pipeline was dispatched
        Bus::assertDispatched(NewStatusPipeline::class);
    }

    #[Test]
    public function validates_required_fields()
    {
        $user = User::factory()->create();
        $token = $user->createToken('test-token')->accessToken;

        // Test missing user_id
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
            'Accept' => 'application/json',
        ])->postJson('/api/ai_agent/create-post', [
            'prompt' => 'Test prompt',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['user_id']);

        // Test missing prompt
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
            'Accept' => 'application/json',
        ])->postJson('/api/ai_agent/create-post', [
            'user_id' => $user->id,
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['prompt']);
    }

    #[Test]
    public function validates_user_id_exists()
    {
        $user = User::factory()->create();
        $token = $user->createToken('test-token')->accessToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
            'Accept' => 'application/json',
        ])->postJson('/api/ai_agent/create-post', [
            'user_id' => 99999, // Non-existent user ID
            'prompt' => 'Test prompt',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['user_id']);
    }

    #[Test]
    public function validates_prompt_max_length()
    {
        $user = User::factory()->create();
        $token = $user->createToken('test-token')->accessToken;

        $longPrompt = str_repeat('a', 1001); // Exceeds max length of 1000

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
            'Accept' => 'application/json',
        ])->postJson('/api/ai_agent/create-post', [
            'user_id' => $user->id,
            'prompt' => $longPrompt,
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['prompt']);
    }

    #[Test]
    public function validates_visibility_options()
    {
        $user = User::factory()->create();
        $token = $user->createToken('test-token')->accessToken;

        Http::fake([
            'api.openai.com/v1/chat/completions' => Http::response([
                'choices' => [['message' => ['content' => 'Test content']]]
            ], 200)
        ]);

        // Test invalid visibility
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
            'Accept' => 'application/json',
        ])->postJson('/api/ai_agent/create-post', [
            'user_id' => $user->id,
            'prompt' => 'Test prompt',
            'visibility' => 'invalid',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['visibility']);
    }

    #[Test]
    public function returns_404_when_user_not_found()
    {
        $user = User::factory()->create();
        $token = $user->createToken('test-token')->accessToken;

        // Delete the user but keep the ID
        $userId = $user->id;
        $user->delete();

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
            'Accept' => 'application/json',
        ])->postJson('/api/ai_agent/create-post', [
            'user_id' => $userId,
            'prompt' => 'Test prompt',
        ]);

        $response->assertStatus(500); // findOrFail throws ModelNotFoundException which becomes 500
    }

    #[Test]
    public function returns_404_when_profile_not_found()
    {
        // Create a user without a profile (unlikely but testable)
        $user = User::factory()->create();
        $user->refresh();
        
        // Manually delete the profile
        if ($user->profile) {
            $user->profile->delete();
        }
        $user->profile_id = null;
        $user->save();

        $token = $user->createToken('test-token')->accessToken;

        Http::fake([
            'api.openai.com/v1/chat/completions' => Http::response([
                'choices' => [['message' => ['content' => 'Test content']]]
            ], 200)
        ]);

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
            'Accept' => 'application/json',
        ])->postJson('/api/ai_agent/create-post', [
            'user_id' => $user->id,
            'prompt' => 'Test prompt',
        ]);

        $response->assertStatus(404)
            ->assertJson([
                'error' => 'User profile not found',
            ]);
    }

    #[Test]
    public function handles_openai_service_failure()
    {
        $user = User::factory()->create();
        $user->refresh();
        $token = $user->createToken('test-token')->accessToken;

        // Mock OpenAI API failure
        Http::fake([
            'api.openai.com/v1/chat/completions' => Http::response([
                'error' => 'API key invalid'
            ], 401)
        ]);

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
            'Accept' => 'application/json',
        ])->postJson('/api/ai_agent/create-post', [
            'user_id' => $user->id,
            'prompt' => 'Test prompt',
        ]);

        $response->assertStatus(500)
            ->assertJson([
                'error' => 'Failed to generate post content from OpenAI',
            ]);

        // Assert no post was created
        $this->assertDatabaseMissing('statuses', [
            'profile_id' => $user->profile_id,
        ]);
    }

    #[Test]
    public function respects_profile_privacy_settings()
    {
        Bus::fake();

        // Create a user with private profile
        $user = User::factory()->create();
        $user->refresh();
        $profile = $user->profile;
        $profile->is_private = true;
        $profile->save();

        $token = $user->createToken('test-token')->accessToken;

        Http::fake([
            'api.openai.com/v1/chat/completions' => Http::response([
                'choices' => [['message' => ['content' => 'Private post content']]]
            ], 200)
        ]);

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
            'Accept' => 'application/json',
        ])->postJson('/api/ai_agent/create-post', [
            'user_id' => $user->id,
            'prompt' => 'Test prompt',
            'visibility' => 'public', // Request public but should be overridden
        ]);

        $response->assertStatus(201);

        // Assert post was created with private visibility
        $this->assertDatabaseHas('statuses', [
            'profile_id' => $profile->id,
            'visibility' => 'private',
        ]);
    }

    #[Test]
    public function respects_unlisted_profile_setting()
    {
        Bus::fake();

        // Create a user with unlisted profile
        $user = User::factory()->create();
        $user->refresh();
        $profile = $user->profile;
        $profile->unlisted = true;
        $profile->save();

        $token = $user->createToken('test-token')->accessToken;

        Http::fake([
            'api.openai.com/v1/chat/completions' => Http::response([
                'choices' => [['message' => ['content' => 'Unlisted post content']]]
            ], 200)
        ]);

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
            'Accept' => 'application/json',
        ])->postJson('/api/ai_agent/create-post', [
            'user_id' => $user->id,
            'prompt' => 'Test prompt',
            'visibility' => 'public', // Request public but should be overridden
        ]);

        $response->assertStatus(201);

        // Assert post was created with unlisted visibility
        $this->assertDatabaseHas('statuses', [
            'profile_id' => $profile->id,
            'visibility' => 'unlisted',
        ]);
    }

    #[Test]
    public function creates_text_type_post()
    {
        Bus::fake();

        $user = User::factory()->create();
        $user->refresh();
        $token = $user->createToken('test-token')->accessToken;

        Http::fake([
            'api.openai.com/v1/chat/completions' => Http::response([
                'choices' => [['message' => ['content' => 'Text post content']]]
            ], 200)
        ]);

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
            'Accept' => 'application/json',
        ])->postJson('/api/ai_agent/create-post', [
            'user_id' => $user->id,
            'prompt' => 'Test prompt',
        ]);

        $response->assertStatus(201);

        // Assert post type is text
        $this->assertDatabaseHas('statuses', [
            'profile_id' => $user->profile_id,
            'type' => 'text',
        ]);
    }

    #[Test]
    public function sanitizes_html_from_generated_content()
    {
        Bus::fake();

        $user = User::factory()->create();
        $user->refresh();
        $token = $user->createToken('test-token')->accessToken;

        // Mock OpenAI returning content with HTML
        Http::fake([
            'api.openai.com/v1/chat/completions' => Http::response([
                'choices' => [
                    [
                        'message' => [
                            'content' => '<script>alert("xss")</script>This is safe content'
                        ]
                    ]
                ]
            ], 200)
        ]);

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
            'Accept' => 'application/json',
        ])->postJson('/api/ai_agent/create-post', [
            'user_id' => $user->id,
            'prompt' => 'Test prompt',
        ]);

        $response->assertStatus(201);

        // Assert HTML was stripped
        $status = Status::where('profile_id', $user->profile_id)->first();
        $this->assertStringNotContainsString('<script>', $status->caption);
        $this->assertStringContainsString('This is safe content', $status->caption);
    }

    #[Test]
    public function requires_authentication()
    {
        $user = User::factory()->create();

        $response = $this->postJson('/api/ai_agent/create-post', [
            'user_id' => $user->id,
            'prompt' => 'Test prompt',
        ]);

        $response->assertStatus(401);
    }

    #[Test]
    public function uses_default_visibility_when_not_provided()
    {
        Bus::fake();

        $user = User::factory()->create();
        $user->refresh();
        $token = $user->createToken('test-token')->accessToken;

        Http::fake([
            'api.openai.com/v1/chat/completions' => Http::response([
                'choices' => [['message' => ['content' => 'Default visibility post']]]
            ], 200)
        ]);

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
            'Accept' => 'application/json',
        ])->postJson('/api/ai_agent/create-post', [
            'user_id' => $user->id,
            'prompt' => 'Test prompt',
            // visibility not provided
        ]);

        $response->assertStatus(201);

        // Assert default visibility (public) was used
        $this->assertDatabaseHas('statuses', [
            'profile_id' => $user->profile_id,
            'visibility' => 'public',
        ]);
    }
}

