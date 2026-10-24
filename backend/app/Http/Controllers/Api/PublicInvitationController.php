<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Invitation;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PublicInvitationController extends Controller
{
    /**
     * Get published invitation details by slug.
     */
    public function show(?string $slug = null): JsonResponse
    {
        $query = Invitation::query();

        if ($slug && $slug !== 'default') {
            $invitation = $query->where('slug', $slug)->first() ?? Invitation::where('is_published', true)->first();
        } else {
            $invitation = $query->where('is_published', true)->first();
        }

        if (!$invitation) {
            return response()->json([
                'success' => false,
                'message' => 'Celestial wedding invitation not found or is currently private.',
            ], 404);
        }

        // Eager load related assets
        $invitation->load([
            'events' => fn($q) => $q->orderBy('order_index')->orderBy('event_date')->orderBy('start_time'),
            'stories' => fn($q) => $q->orderBy('order_index'),
            'gallery' => fn($q) => $q->orderBy('order_index'),
            'venueTravel',
        ]);

        return response()->json([
            'success' => true,
            'data' => $invitation,
        ]);
    }

    /**
     * Get wedding events for the invitation.
     */
    public function events(string $slug): JsonResponse
    {
        $invitation = Invitation::where('slug', $slug)->firstOrFail();

        $events = $invitation->events()
            ->orderBy('order_index')
            ->orderBy('event_date')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $events,
        ]);
    }

    /**
     * Get gallery media items for the invitation.
     */
    public function gallery(string $slug, Request $request): JsonResponse
    {
        $invitation = Invitation::where('slug', $slug)->firstOrFail();

        $query = $invitation->gallery()->orderBy('order_index');

        if ($request->has('category') && $request->category !== 'all') {
            $query->where('category', $request->category);
        }

        $items = $query->get();

        return response()->json([
            'success' => true,
            'data' => $items,
        ]);
    }
}
