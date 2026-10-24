<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\GalleryMedia;
use App\Models\Invitation;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class GalleryController extends Controller
{
    public function index(): JsonResponse
    {
        $invitation = Invitation::firstOrFail();
        $gallery = $invitation->gallery()->orderBy('order_index')->get();

        return response()->json([
            'success' => true,
            'data' => $gallery,
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $invitation = Invitation::firstOrFail();

        $validated = $request->validate([
            'title' => ['nullable', 'string', 'max:150'],
            'caption' => ['nullable', 'string', 'max:255'],
            'media_type' => ['required', 'in:image,video'],
            'url' => ['nullable', 'string', 'max:500'],
            'thumbnail_url' => ['nullable', 'string', 'max:500'],
            'category' => ['required', 'string', 'max:50'],
            'order_index' => ['nullable', 'integer'],
            'is_featured' => ['nullable', 'boolean'],
            'file' => ['nullable', 'file', 'mimes:jpg,jpeg,png,webp,mp4', 'max:20480'], // max 20MB
        ]);

        if ($request->hasFile('file')) {
            $path = $request->file('file')->store('gallery', 'public');
            $validated['url'] = Storage::url($path);
            $validated['thumbnail_url'] = Storage::url($path);
        }

        if (empty($validated['url'])) {
            return response()->json([
                'success' => false,
                'message' => 'Please provide an image file or an external URL.',
            ], 422);
        }

        $media = $invitation->gallery()->create([
            'title' => $validated['title'] ?? 'Celestial Glimpse',
            'caption' => $validated['caption'] ?? '',
            'media_type' => $validated['media_type'] ?? 'image',
            'url' => $validated['url'],
            'thumbnail_url' => $validated['thumbnail_url'] ?? $validated['url'],
            'category' => $validated['category'] ?? 'all',
            'order_index' => $validated['order_index'] ?? 0,
            'is_featured' => $validated['is_featured'] ?? false,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Media item added to gallery.',
            'data' => $media,
        ], 201);
    }

    public function destroy(int $id): JsonResponse
    {
        $invitation = Invitation::firstOrFail();
        $media = $invitation->gallery()->findOrFail($id);
        $media->delete();

        return response()->json([
            'success' => true,
            'message' => 'Media item deleted.',
        ]);
    }
}
