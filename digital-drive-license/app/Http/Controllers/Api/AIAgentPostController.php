<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Jobs\StatusPipeline\NewStatusPipeline;
use App\Services\OpenAIService;
use App\Status;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class AIAgentPostController extends Controller
{
    /**
     * Create a text post with AI-generated content
     * 
     * This endpoint allows AI agents to automatically create text posts using OpenAI-generated content.
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function createPost(Request $request)
    {
        // Validate request
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|integer|exists:users,id',
            'prompt' => 'required|string|max:1000',
            'visibility' => 'nullable|string|in:public,private,unlisted',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            $user = User::findOrFail($request->input('user_id'));
            $profile = $user->profile;
            
            if (!$profile) {
                return response()->json([
                    'error' => 'User profile not found',
                ], 404);
            }

            // Generate post content using OpenAI (with default internal settings)
            $openAIService = new OpenAIService();
            $prompt = $request->input('prompt');
            
            $content = $openAIService->generateTextPost($prompt);

            if (!$content) {
                return response()->json([
                    'error' => 'Failed to generate post content from OpenAI',
                ], 500);
            }

            // Create status
            $visibility = $request->input('visibility', 'public');
            $visibility = $profile->is_private ? 'private' : $visibility;
            $visibility = $profile->unlisted == true && $visibility == 'public' ? 'unlisted' : $visibility;

            $status = new Status;
            $status->caption = strip_tags($content);
            $status->rendered = '';
            $status->profile_id = $profile->id;
            $status->type = 'text';
            $status->scope = 'draft';
            $status->visibility = 'draft';
            $status->is_nsfw = false;
            $status->save();

            // Set final visibility
            $status->visibility = $visibility;
            $status->scope = $visibility;
            $status->save();

            // Dispatch pipeline
            NewStatusPipeline::dispatch($status);

            // Clear cache
            Cache::forget('_api:statuses:recent_9:'.$profile->id);
            Cache::forget('profile:status_count:'.$profile->id);
            Cache::forget('profile:embed:'.$status->profile_id);

            return response()->json([
                'success' => true,
                'status' => [
                    'id' => $status->id,
                    'caption' => $status->caption,
                    'url' => $status->url(),
                    'visibility' => $status->visibility,
                    'type' => $status->type,
                ],
            ], 201);

        } catch (\Exception $e) {
            Log::error('AI Agent API Error: ' . $e->getMessage(), [
                'request' => $request->all(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'error' => 'Failed to create post',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}

