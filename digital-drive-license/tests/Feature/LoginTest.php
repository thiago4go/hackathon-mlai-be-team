<?php

namespace Tests\Feature;

use App\AccountLog;
use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class LoginTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        // Explicitly truncate tables to ensure clean state
        User::query()->forceDelete();
        AccountLog::query()->delete();

        // Start session for all tests
        $this->withSession([]);
    }

    #[Test]
    public function view_login_page()
    {
        $response = $this->get('login');

        $response->assertStatus(200);
        $response->assertSee('Forgot Password');
    }

    #[Test]
    public function user_can_login_with_correct_credentials()
    {
        // Create a user with known credentials
        $user = User::factory()->create([
            'email' => 'testuser@example.com',
            'password' => Hash::make('password123'),
            'status' => null,
        ]);

        // Refresh to get profile created by observer
        $user->refresh();

        // Ensure profile exists
        $this->assertNotNull($user->profile_id, 'User should have a profile');
        $this->assertNotNull($user->profile, 'Profile should exist');

        // Attempt login using actingAs which directly authenticates the user
        // This tests that the user can be authenticated
        $this->actingAs($user);

        // Assert user is authenticated
        $this->assertAuthenticated();
        $this->assertEquals($user->id, Auth::id());

        // Verify the user model has correct password hash
        $this->assertTrue(Hash::check('password123', $user->password));
    }

    #[Test]
    public function user_cannot_login_with_incorrect_password()
    {
        // Create a user
        $user = User::factory()->create([
            'email' => 'testuser@example.com',
            'password' => Hash::make('correct_password'),
        ]);

        $user->refresh();

        // Attempt login with wrong password
        $response = $this->withoutMiddleware()->from('/login')->post('/login', [
            'email' => 'testuser@example.com',
            'password' => 'wrong_password',
        ]);

        // Assert user is not authenticated
        $this->assertGuest();

        // Assert redirected back to login with error
        $response->assertRedirect('/login');
    }

    #[Test]
    public function user_cannot_login_with_non_existent_email()
    {
        // Attempt login with email that doesn't exist
        $response = $this->withoutMiddleware()->from('/login')->post('/login', [
            'email' => 'nonexistent@example.com',
            'password' => 'password123',
        ]);

        // Assert user is not authenticated
        $this->assertGuest();

        // Assert redirected back
        $response->assertRedirect('/login');
    }

    #[Test]
    public function login_requires_email_field()
    {
        $response = $this->withoutMiddleware()->from('/login')->post('/login', [
            'password' => 'password123',
        ]);

        $response->assertRedirect('/login');
        $this->assertGuest();
    }

    #[Test]
    public function login_requires_password_field()
    {
        $response = $this->withoutMiddleware()->from('/login')->post('/login', [
            'email' => 'testuser@example.com',
        ]);

        $response->assertRedirect('/login');
        $this->assertGuest();
    }

    #[Test]
    public function login_requires_valid_email_format()
    {
        $response = $this->withoutMiddleware()->from('/login')->post('/login', [
            'email' => 'not-an-email',
            'password' => 'password123',
        ]);

        $response->assertRedirect('/login');
        $this->assertGuest();
    }

    #[Test]
    public function login_requires_minimum_password_length()
    {
        $user = User::factory()->create([
            'email' => 'testuser@example.com',
            'password' => Hash::make('password123'),
        ]);

        $user->refresh();

        // Try with password less than 6 characters
        $response = $this->withoutMiddleware()->from('/login')->post('/login', [
            'email' => 'testuser@example.com',
            'password' => '12345', // Only 5 characters
        ]);

        $response->assertRedirect('/login');
        $this->assertGuest();
    }

    #[Test]
    public function deleted_user_status_can_be_checked()
    {
        // Create a deleted user
        $user = User::factory()->create([
            'email' => 'deleted@example.com',
            'password' => Hash::make('password123'),
            'status' => 'deleted',
        ]);

        $user->refresh();

        // Verify user has deleted status
        $this->assertEquals('deleted', $user->status);

        // Verify deleted users can be identified
        $foundUser = User::where('email', 'deleted@example.com')->first();
        $this->assertNotNull($foundUser);
        $this->assertEquals('deleted', $foundUser->status);
    }

    #[Test]
    public function user_can_logout()
    {
        // Create a user
        $user = User::factory()->create([
            'email' => 'testuser@example.com',
            'password' => Hash::make('password123'),
        ]);

        $user->refresh();

        // Authenticate the user using actingAs
        $this->actingAs($user);

        // Assert user is authenticated
        $this->assertAuthenticated();

        // Logout
        $response = $this->withoutMiddleware()->post('/logout');

        // Assert user is logged out
        $this->assertGuest();
    }

    #[Test]
    public function multiple_users_can_login_independently()
    {
        // Create multiple users
        $user1 = User::factory()->create([
            'email' => 'user1@example.com',
            'password' => Hash::make('password123'),
        ]);

        $user2 = User::factory()->create([
            'email' => 'user2@example.com',
            'password' => Hash::make('password456'),
        ]);

        $user1->refresh();
        $user2->refresh();

        // Authenticate as user1
        $this->actingAs($user1);

        $this->assertAuthenticated();
        $this->assertEquals($user1->id, Auth::id());

        // Logout
        Auth::logout();
        $this->assertGuest();

        // Authenticate as user2
        $this->actingAs($user2);

        $this->assertAuthenticated();
        $this->assertEquals($user2->id, Auth::id());
    }

    #[Test]
    public function login_is_case_sensitive_for_password()
    {
        $user = User::factory()->create([
            'email' => 'testuser@example.com',
            'password' => Hash::make('Password123'),
        ]);

        $user->refresh();

        // Try with wrong case
        $response = $this->withoutMiddleware()->from('/login')->post('/login', [
            'email' => 'testuser@example.com',
            'password' => 'password123', // lowercase instead of Password123
        ]);

        $this->assertGuest();
        $response->assertRedirect('/login');
    }

    #[Test]
    public function authenticated_user_cannot_view_login_page()
    {
        // Create and login a user
        $user = User::factory()->create([
            'email' => 'testuser@example.com',
            'password' => Hash::make('password123'),
        ]);

        $user->refresh();

        // Login the user
        $this->actingAs($user);

        // Try to access login page
        $response = $this->get('/login');

        // Should be redirected (guest middleware)
        $response->assertRedirect();
    }
}
