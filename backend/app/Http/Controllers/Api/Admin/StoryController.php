<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Invitation;
use App\Models\StoryMilestone;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class StoryController extends Controller
{
    public function index(): JsonResponse
    {
        $invitation = Invitation::firstOrFail();
        $stories = $invitation->stories()->orderBy('order_index')->get();

        return response()->json([
            'success' => true,
            'data' => $stories,
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $invitation = Invitation::firstOrFail();

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:150'],
            'date_label' => ['required', 'string', 'max:80'],
            'subtitle' => ['nullable', 'string', 'max:150'],
            'description' => ['required', 'string'],
            'image_url' => ['nullable', 'string', 'max:500'],
            'quote' => ['nullable', 'string', 'max:500'],
            'order_index' => ['nullable', 'integer'],
        ]);

        $story = $invitation->stories()->create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Story milestone created.',
            'data' => $story,
        ], 201);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $invitation = Invitation::firstOrFail();
        $story = $invitation->stories()->findOrFail($id);

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:150'],
            'date_label' => ['required', 'string', 'max:80'],
            'subtitle' => ['nullable', 'string', 'max:150'],
            'description' => ['required', 'string'],
            'image_url' => ['nullable', 'string', 'max:500'],
            'quote' => ['nullable', 'string', 'max:500'],
            'order_index' => ['nullable', 'integer'],
        ]);

        $story->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Story milestone updated.',
            'data' => $story,
        ]);
    }

    public function destroy(int $id): JsonResponse
    {
        $invitation = Invitation::firstOrFail();
        $story = $invitation->stories()->findOrFail($id);
        $story->delete();

        return response()->json([
            'success' => true,
            'message' => 'Story milestone removed.',
        ]);
    }
}
