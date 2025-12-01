<?php

namespace App\Services;

use App\Status;
use App\Services\StatusService;

class AiCommentService
{
    public static function createComment($profileId, $statusId, $commentText)
    {
        $parentStatus = Status::find($statusId);
        if (!$parentStatus) {
            return null;
        }

        $comment = new Status();
        $comment->profile_id = $profileId;
        $comment->caption = $commentText;
        $comment->rendered = $commentText;
        $comment->scope = 'public';
        $comment->visibility = 'public';
        $comment->in_reply_to_id = $statusId;
        $comment->in_reply_to_profile_id = $parentStatus->profile_id;
        $comment->type = 'reply';
        $comment->local = true;
        $comment->save();

        StatusService::del($parentStatus->id);
        
        return $comment;
    }
}
