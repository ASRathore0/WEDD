<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Invitation;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class InvitationController extends Controller
{
    public function show(): JsonResponse
    {
        $invitation = Invitation::first();

        if (!$invitation) {
            return response()->json([
                'success' => false,
                'message' => 'Invitation not found.',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $invitation,
        ]);
    }

    public function update(Request $request): JsonResponse
    {
        $invitation = Invitation::firstOrFail();

        // If theme_settings is passed as JSON string in multipart form-data, decode it
        if ($request->has('theme_settings') && is_string($request->input('theme_settings'))) {
            $decoded = json_decode($request->input('theme_settings'), true);
            if (is_array($decoded)) {
                $request->merge(['theme_settings' => $decoded]);
            }
        }

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'partner_one' => ['required', 'string', 'max:100'],
            'partner_two' => ['required', 'string', 'max:100'],
            'wedding_date' => ['required', 'date'],
            'wedding_timezone' => ['required', 'string', 'max:50'],
            'venue_city' => ['required', 'string', 'max:150'],
            'tagline' => ['nullable', 'string', 'max:255'],
            'hero_image_url' => ['nullable', 'string', 'max:500'],
            'celestial_quote' => ['nullable', 'string'],
            'audio_title' => ['nullable', 'string', 'max:150'],
            'audio_url' => ['nullable', 'string', 'max:500'],
            'is_published' => ['required', 'boolean'],
            'theme_settings' => ['nullable', 'array'],
            'hero_image_file' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:15360'], // max 15MB
            'ganesh_image_file' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:10240'], // max 10MB
        ]);

        if ($request->hasFile('hero_image_file')) {
            $path = $request->file('hero_image_file')->store('hero', 'public');
            $validated['hero_image_url'] = Storage::url($path);
        }

        if ($request->hasFile('ganesh_image_file')) {
            $path = $request->file('ganesh_image_file')->store('hero', 'public');
            $currentTheme = $validated['theme_settings'] ?? ($invitation->theme_settings ?? []);
            $currentTheme['ganesh_image_url'] = Storage::url($path);
            $validated['theme_settings'] = $currentTheme;
        }

        $invitation->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Invitation settings and hero image updated successfully.',
            'data' => $invitation,
        ]);
    }
}
