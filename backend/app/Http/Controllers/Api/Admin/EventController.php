<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Invitation;
use App\Models\WeddingEvent;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function index(): JsonResponse
    {
        $invitation = Invitation::firstOrFail();
        $events = $invitation->events()->orderBy('order_index')->get();

        return response()->json([
            'success' => true,
            'data' => $events,
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $invitation = Invitation::firstOrFail();

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:150'],
            'event_type' => ['required', 'string', 'in:haldi,mehendi,sangeet,wedding,reception,other'],
            'event_date' => ['required', 'date'],
            'start_time' => ['required', 'string', 'max:50'],
            'end_time' => ['nullable', 'string', 'max:50'],
            'venue_name' => ['required', 'string', 'max:200'],
            'venue_address' => ['nullable', 'string', 'max:500'],
            'description' => ['nullable', 'string'],
            'dress_code' => ['nullable', 'string', 'max:255'],
            'calendar_link' => ['nullable', 'string', 'max:500'],
            'color_accent' => ['nullable', 'string', 'max:50'],
            'order_index' => ['nullable', 'integer'],
        ]);

        $event = $invitation->events()->create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Event ceremony created successfully.',
            'data' => $event,
        ], 201);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $invitation = Invitation::firstOrFail();
        $event = $invitation->events()->findOrFail($id);

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:150'],
            'event_type' => ['required', 'string', 'in:haldi,mehendi,sangeet,wedding,reception,other'],
            'event_date' => ['required', 'date'],
            'start_time' => ['required', 'string', 'max:50'],
            'end_time' => ['nullable', 'string', 'max:50'],
            'venue_name' => ['required', 'string', 'max:200'],
            'venue_address' => ['nullable', 'string', 'max:500'],
            'description' => ['nullable', 'string'],
            'dress_code' => ['nullable', 'string', 'max:255'],
            'calendar_link' => ['nullable', 'string', 'max:500'],
            'color_accent' => ['nullable', 'string', 'max:50'],
            'order_index' => ['nullable', 'integer'],
        ]);

        $event->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Event ceremony updated successfully.',
            'data' => $event,
        ]);
    }

    public function destroy(int $id): JsonResponse
    {
        $invitation = Invitation::firstOrFail();
        $event = $invitation->events()->findOrFail($id);
        $event->delete();

        return response()->json([
            'success' => true,
            'message' => 'Event ceremony removed.',
        ]);
    }
}
