<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class N8nWebhookService
{
    public static function notifyNewPost($status)
    {
        $webhookUrl = env('N8N_WEBHOOK_URL');
        
        if (!$webhookUrl) {
            Log::info('N8n webhook URL not configured, skipping notification');
            return;
        }

        try {
            $media = $status->media()->first();
            
            $response = Http::post($webhookUrl, [
                'caption' => $status->caption,
                'image_url' => $media ? $media->url() : null,
                'user_id' => $status->profile->user_id ?? $status->profile_id,
                'status_id' => $status->id,
                'username' => $status->profile->username ?? 'unknown'
            ]);
            
            if (!$response->successful()) {
                Log::warning('N8n webhook returned non-success status', [
                    'status' => $response->status(),
                    'body' => $response->body(),
                    'status_id' => $status->id
                ]);
            }
        } catch (\Exception $e) {
            Log::error('N8n webhook failed', [
                'error' => $e->getMessage(),
                'status_id' => $status->id,
                'webhook_url' => $webhookUrl
            ]);
        }
    }
}
