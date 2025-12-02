<?php

namespace App\Services;

use App\Status;
use App\Profile;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Log;

class AiCommentService
{
    public static function createComment($profileId, $statusId, $commentText)
    {
        // Validate that the profile exists
        $profile = Profile::find($profileId);
        if (!$profile) {
            Log::warning('AiCommentService: Profile not found', ['profile_id' => $profileId]);
            return null;
        }
        
        $originalStatus = Status::find($statusId);
        
        if (!$originalStatus) {
            Log::warning('AiCommentService: Original status not found', ['status_id' => $statusId]);
            return null;
        }

        $comment = new Status();
        $comment->profile_id = $profileId;
        $comment->caption = $commentText;
        $comment->rendered = $commentText;
        $comment->scope = 'public';
        $comment->visibility = 'public';
        $comment->in_reply_to_id = $statusId;
        $comment->in_reply_to_profile_id = $originalStatus->profile_id;
        $comment->type = 'reply';
        $comment->local = true;
        
        try {
            $comment->save();
        } catch (QueryException $e) {
            Log::error('AiCommentService: Database error when saving comment', [
                'error' => $e->getMessage(),
                'profile_id' => $profileId,
                'status_id' => $statusId
            ]);
            return null;
        }

        return $comment;
    }
}
