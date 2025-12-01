<?php

namespace App\Services;

use App\Status;

class AiCommentService
{
    public static function createComment($profileId, $statusId, $commentText)
    {
        $originalStatus = Status::find($statusId);
        
        if (!$originalStatus) {
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
        $comment->save();

        return $comment;
    }
}
