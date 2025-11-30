<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Cache;

class OpenAIService
{
    protected $apiKey;
    protected $baseUrl = 'https://api.openai.com/v1';
    protected $model = 'gpt-4o';

    public function __construct()
    {
        $this->apiKey = config('services.openai.api_key', env('OPENAI_API_KEY'));
        
        if (!$this->apiKey) {
            Log::warning('OpenAI API key not configured');
        }
    }

    /**
     * Generate a text post using OpenAI
     * 
     * @param string $prompt The prompt for generating the post content
     * @return string|null The generated post content or null on failure
     */
    public function generateTextPost(string $prompt): ?string
    {
        if (!$this->apiKey) {
            Log::error('OpenAI API key not configured');
            return null;
        }

        // Default settings (internal only, not exposed via API)
        $maxTokens = 200;
        $temperature = 0.7;

        // Use cache to avoid repeated API calls for the same prompt
        $cacheKey = 'openai:textpost:' . md5($prompt);
        
        return Cache::remember($cacheKey, 1800, function () use ($prompt, $maxTokens, $temperature) {
            return $this->callOpenAIText($prompt, $maxTokens, $temperature);
        });
    }

    /**
     * Make the actual API call to OpenAI for text generation
     * 
     * @param string $prompt
     * @param int $maxTokens
     * @param float $temperature
     * @return string|null
     */
    protected function callOpenAIText(string $prompt, int $maxTokens, float $temperature): ?string
    {
        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $this->apiKey,
                'Content-Type' => 'application/json',
            ])->timeout(30)->post($this->baseUrl . '/chat/completions', [
                'model' => $this->model,
                'messages' => [
                    [
                        'role' => 'system',
                        'content' => 'You are a creative social media content generator. Generate engaging, appropriate, and authentic social media posts based on the user\'s prompt. Keep responses concise and natural.',
                    ],
                    [
                        'role' => 'user',
                        'content' => $prompt,
                    ],
                ],
                'max_tokens' => $maxTokens,
                'temperature' => $temperature,
            ]);

            if ($response->successful()) {
                $data = $response->json();
                
                if (isset($data['choices'][0]['message']['content'])) {
                    $content = trim($data['choices'][0]['message']['content']);
                    
                    // Remove quotes if the content is wrapped in them
                    $content = trim($content, '"\'');
                    
                    // Ensure it's not too long (safety check)
                    $maxLength = config('pixelfed.max_caption_length', 500);
                    if (strlen($content) > $maxLength) {
                        $content = substr($content, 0, $maxLength - 3) . '...';
                    }
                    
                    return $content;
                }
            }

            Log::error('OpenAI API error', [
                'status' => $response->status(),
                'body' => $response->body(),
            ]);

            return null;

        } catch (\Exception $e) {
            Log::error('OpenAI API exception: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString(),
            ]);

            return null;
        }
    }
}

