<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Services\AiCommentService;

Route::post('/ai/comment', function (Request $request) {
    $validated = $request->validate([
        'profile_id' => 'required|integer',
        'status_id' => 'required|integer',
        'comment' => 'required|string'
    ]);

    $comment = AiCommentService::createComment(
        $validated['profile_id'],
        $validated['status_id'],
        $validated['comment']
    );

    if ($comment) {
        return response()->json(['success' => true, 'comment_id' => $comment->id]);
    }

    return response()->json(['success' => false], 400);
});
