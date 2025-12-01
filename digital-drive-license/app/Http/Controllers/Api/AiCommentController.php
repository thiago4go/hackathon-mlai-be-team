<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Status;
use Illuminate\Http\Request;

class AiCommentController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'profile_id' => 'required',
            'status_id' => 'required',
            'comment' => 'required|string'
        ]);

        $status = new Status();
        $status->profile_id = $validated['profile_id'];
        $status->caption = $validated['comment'];
        $status->rendered = $validated['comment'];
        $status->scope = 'public';
        $status->visibility = 'public';
        $status->in_reply_to_id = $validated['status_id'];
        $status->in_reply_to_profile_id = Status::find($validated['status_id'])->profile_id;
        $status->type = 'reply';
        $status->local = true;
        $status->save();

        return response()->json(['success' => true, 'comment_id' => $status->id]);
    }
}
