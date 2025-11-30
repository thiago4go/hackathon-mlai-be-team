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
            return;
        }

        try {
            $media = $status->media()->first();
            
            Http::post($webhookUrl, [
                'caption' => $status->caption,
                'image_url' => $media ? $media->url() : null,
                'user_id' => $status->profile->user_id ?? $status->profile_id,
                'status_id' => $status->id,
                'username' => $status->profile->username ?? 'unknown'
            ]);
        } catch (\Exception $e) {
            Log::error('N8n webhook failed: ' . $e->getMessage());
        }
    }
}
