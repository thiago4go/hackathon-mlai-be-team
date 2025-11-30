<?php

namespace Tests\Feature;

use App\Profile;
use App\Status;
use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class PostReplyTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        // Explicitly truncate tables to ensure clean state
        User::query()->forceDelete();
        Profile::query()->forceDelete();
        Status::query()->forceDelete();
    }

    #[Test]
    public function user_can_reply_to_a_post()
    {
        // Create a user and their post
        $user = User::factory()->create();
        $user->refresh();
        $profile = $user->profile;

        $parentPost = Status::factory()->create([
            'profile_id' => $profile->id,
            'caption' => 'This is the original post',
        ]);

        // Create a reply to the post
        $reply = Status::factory()->reply($parentPost)->create([
            'profile_id' => $profile->id,
            'caption' => 'This is a reply',
        ]);

        // Assert reply was created correctly
        $this->assertNotNull($reply->id);
        $this->assertEquals('reply', $reply->type);
        $this->assertEquals($parentPost->id, $reply->in_reply_to_id);
        $this->assertEquals($parentPost->profile_id, $reply->in_reply_to_profile_id);

        // Verify in database
        $this->assertDatabaseHas('statuses', [
            'id' => $reply->id,
            'in_reply_to_id' => $parentPost->id,
            'caption' => 'This is a reply',
        ]);
    }

    #[Test]
    public function different_user_can_reply_to_post()
    {
        // Create first user and their post
        $user1 = User::factory()->create(['username' => 'user1']);
        $user1->refresh();
        $profile1 = $user1->profile;

        $originalPost = Status::factory()->create([
            'profile_id' => $profile1->id,
            'caption' => 'Original post by user1',
        ]);

        // Create second user who replies
        $user2 = User::factory()->create(['username' => 'user2']);
        $user2->refresh();
        $profile2 = $user2->profile;

        $reply = Status::factory()->reply($originalPost)->create([
            'profile_id' => $profile2->id,
            'caption' => 'Reply from user2',
        ]);

        // Assert reply is from user2 but references user1's post
        $this->assertEquals($profile2->id, $reply->profile_id);
        $this->assertEquals($originalPost->id, $reply->in_reply_to_id);
        $this->assertEquals($profile1->id, $reply->in_reply_to_profile_id);

        // Verify both users have their posts
        $this->assertEquals(1, Status::where('profile_id', $profile1->id)->count());
        $this->assertEquals(1, Status::where('profile_id', $profile2->id)->count());
    }

    #[Test]
    public function post_can_have_multiple_replies()
    {
        // Create user and original post
        $user = User::factory()->create();
        $user->refresh();
        $profile = $user->profile;

        $originalPost = Status::factory()->create([
            'profile_id' => $profile->id,
            'caption' => 'Original post',
        ]);

        // Create 5 replies to the same post
        $replies = [];
        for ($i = 1; $i <= 5; $i++) {
            $replies[] = Status::factory()->reply($originalPost)->create([
                'profile_id' => $profile->id,
                'caption' => "Reply number {$i}",
            ]);
        }

        // Assert all 5 replies were created
        $this->assertCount(5, $replies);

        // Verify all replies reference the same parent post
        foreach ($replies as $reply) {
            $this->assertEquals($originalPost->id, $reply->in_reply_to_id);
            $this->assertEquals('reply', $reply->type);
        }

        // Verify count in database
        $replyCount = Status::where('in_reply_to_id', $originalPost->id)->count();
        $this->assertEquals(5, $replyCount);
    }

    #[Test]
    public function can_create_nested_replies()
    {
        // Create user
        $user = User::factory()->create();
        $user->refresh();
        $profile = $user->profile;

        // Create original post
        $originalPost = Status::factory()->create([
            'profile_id' => $profile->id,
            'caption' => 'Original post',
        ]);

        // Create first level reply
        $firstReply = Status::factory()->reply($originalPost)->create([
            'profile_id' => $profile->id,
            'caption' => 'First level reply',
        ]);

        // Create second level reply (reply to a reply)
        $secondReply = Status::factory()->reply($firstReply)->create([
            'profile_id' => $profile->id,
            'caption' => 'Second level reply',
        ]);

        // Create third level reply
        $thirdReply = Status::factory()->reply($secondReply)->create([
            'profile_id' => $profile->id,
            'caption' => 'Third level reply',
        ]);

        // Verify the chain
        $this->assertEquals($originalPost->id, $firstReply->in_reply_to_id);
        $this->assertEquals($firstReply->id, $secondReply->in_reply_to_id);
        $this->assertEquals($secondReply->id, $thirdReply->in_reply_to_id);

        // Verify all are reply type
        $this->assertEquals('reply', $firstReply->type);
        $this->assertEquals('reply', $secondReply->type);
        $this->assertEquals('reply', $thirdReply->type);

        // Verify total count (1 original + 3 replies)
        $this->assertEquals(4, Status::count());
    }

    #[Test]
    public function multiple_users_can_reply_to_same_post()
    {
        // Create original poster
        $originalUser = User::factory()->create(['username' => 'original']);
        $originalUser->refresh();
        $originalProfile = $originalUser->profile;

        $originalPost = Status::factory()->create([
            'profile_id' => $originalProfile->id,
            'caption' => 'Original post',
        ]);

        // Create 3 different users who each reply
        $replyingUsers = User::factory()->count(3)->create();
        $replies = [];

        foreach ($replyingUsers as $user) {
            $user->refresh();
            $replies[] = Status::factory()->reply($originalPost)->create([
                'profile_id' => $user->profile_id,
                'caption' => "Reply from {$user->username}",
            ]);
        }

        // Assert 3 replies were created
        $this->assertCount(3, $replies);

        // Verify all replies reference the original post
        foreach ($replies as $reply) {
            $this->assertEquals($originalPost->id, $reply->in_reply_to_id);
            $this->assertEquals($originalProfile->id, $reply->in_reply_to_profile_id);
        }

        // Verify each reply is from a different user
        $replyProfileIds = array_map(fn($r) => $r->profile_id, $replies);
        $this->assertCount(3, array_unique($replyProfileIds));
    }

    #[Test]
    public function reply_has_required_attributes()
    {
        // Create user and original post
        $user = User::factory()->create();
        $user->refresh();
        $profile = $user->profile;

        $parentPost = Status::factory()->create([
            'profile_id' => $profile->id,
            'caption' => 'Parent post',
        ]);

        // Create reply
        $reply = Status::factory()->reply($parentPost)->create([
            'profile_id' => $profile->id,
            'caption' => 'Reply post',
        ]);

        // Verify all required attributes
        $this->assertNotNull($reply->id);
        $this->assertNotNull($reply->profile_id);
        $this->assertNotNull($reply->caption);
        $this->assertNotNull($reply->rendered);
        $this->assertNotNull($reply->in_reply_to_id);
        $this->assertNotNull($reply->in_reply_to_profile_id);
        $this->assertNotNull($reply->type);
        $this->assertNotNull($reply->created_at);
        $this->assertNotNull($reply->updated_at);

        // Verify reply-specific attributes
        $this->assertEquals('reply', $reply->type);
        $this->assertEquals($parentPost->id, $reply->in_reply_to_id);
        $this->assertEquals($profile->id, $reply->in_reply_to_profile_id);
    }

    #[Test]
    public function can_reply_with_different_visibility()
    {
        // Create user and public post
        $user = User::factory()->create();
        $user->refresh();
        $profile = $user->profile;

        $publicPost = Status::factory()->create([
            'profile_id' => $profile->id,
            'caption' => 'Public post',
            'visibility' => 'public',
        ]);

        // Create private reply to public post
        $privateReply = Status::factory()->reply($publicPost)->private()->create([
            'profile_id' => $profile->id,
            'caption' => 'Private reply',
        ]);

        // Create unlisted reply to public post
        $unlistedReply = Status::factory()->reply($publicPost)->unlisted()->create([
            'profile_id' => $profile->id,
            'caption' => 'Unlisted reply',
        ]);

        // Verify visibility settings
        $this->assertEquals('public', $publicPost->visibility);
        $this->assertEquals('private', $privateReply->visibility);
        $this->assertEquals('unlisted', $unlistedReply->visibility);

        // Verify both are still replies to the same post
        $this->assertEquals($publicPost->id, $privateReply->in_reply_to_id);
        $this->assertEquals($publicPost->id, $unlistedReply->in_reply_to_id);
    }

    #[Test]
    public function reply_maintains_parent_reference()
    {
        // Create conversation thread
        $user = User::factory()->create();
        $user->refresh();
        $profile = $user->profile;

        $originalPost = Status::factory()->create([
            'profile_id' => $profile->id,
            'caption' => 'Start of conversation',
        ]);

        $reply1 = Status::factory()->reply($originalPost)->create([
            'profile_id' => $profile->id,
            'caption' => 'First reply',
        ]);

        $reply2 = Status::factory()->reply($originalPost)->create([
            'profile_id' => $profile->id,
            'caption' => 'Second reply',
        ]);

        // Reload posts from database
        $originalPost->refresh();
        $reply1->refresh();
        $reply2->refresh();

        // Verify references are maintained
        $this->assertNull($originalPost->in_reply_to_id);
        $this->assertEquals($originalPost->id, $reply1->in_reply_to_id);
        $this->assertEquals($originalPost->id, $reply2->in_reply_to_id);

        // Verify we can query replies
        $replies = Status::where('in_reply_to_id', $originalPost->id)->get();
        $this->assertCount(2, $replies);
        $this->assertTrue($replies->contains($reply1));
        $this->assertTrue($replies->contains($reply2));
    }

    #[Test]
    public function can_create_complex_conversation_thread()
    {
        // Create multiple users
        $user1 = User::factory()->create(['username' => 'alice']);
        $user2 = User::factory()->create(['username' => 'bob']);
        $user3 = User::factory()->create(['username' => 'charlie']);

        $user1->refresh();
        $user2->refresh();
        $user3->refresh();

        // Alice creates original post
        $originalPost = Status::factory()->create([
            'profile_id' => $user1->profile_id,
            'caption' => 'Alice: What do you think?',
        ]);

        // Bob replies to Alice
        $bobReply = Status::factory()->reply($originalPost)->create([
            'profile_id' => $user2->profile_id,
            'caption' => 'Bob: Great idea!',
        ]);

        // Charlie replies to Alice
        $charlieReply = Status::factory()->reply($originalPost)->create([
            'profile_id' => $user3->profile_id,
            'caption' => 'Charlie: I agree with Bob!',
        ]);

        // Alice replies to Bob
        $aliceReplyToBob = Status::factory()->reply($bobReply)->create([
            'profile_id' => $user1->profile_id,
            'caption' => 'Alice: Thanks Bob!',
        ]);

        // Verify conversation structure
        $this->assertEquals($originalPost->id, $bobReply->in_reply_to_id);
        $this->assertEquals($originalPost->id, $charlieReply->in_reply_to_id);
        $this->assertEquals($bobReply->id, $aliceReplyToBob->in_reply_to_id);

        // Verify direct replies to original post
        $directReplies = Status::where('in_reply_to_id', $originalPost->id)->count();
        $this->assertEquals(2, $directReplies);

        // Verify total conversation size (1 original + 3 replies)
        $this->assertEquals(4, Status::count());
    }
}
