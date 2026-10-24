<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\RsvpRequest;
use App\Models\Invitation;
use App\Models\Rsvp;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\RateLimiter;

class RsvpController extends Controller
{
    /**
     * Submit an RSVP response.
     */
    public function store(RsvpRequest $request, string $slug): JsonResponse
    {
        $invitation = Invitation::where('slug', $slug)->first();

        if (!$invitation) {
            return response()->json([
                'success' => false,
                'message' => 'Invitation not found.',
            ], 404);
        }

        // Duplicate submission prevention: check if identical guest name + email/phone submitted in last 10 minutes
        $validated = $request->validated();
        $ip = $request->ip();

        $existing = Rsvp::where('invitation_id', $invitation->id)
            ->where('guest_name', $validated['guest_name'])
            ->where(function ($query) use ($validated) {
                if (!empty($validated['email'])) {
                    $query->orWhere('email', $validated['email']);
                }
                if (!empty($validated['phone'])) {
                    $query->orWhere('phone', $validated['phone']);
                }
            })
            ->where('created_at', '>=', now()->subMinutes(10))
            ->first();

        if ($existing) {
            return response()->json([
                'success' => true,
                'message' => 'We already received your RSVP response recently. Thank you for your warmth!',
                'data' => [
                    'id' => $existing->id,
                    'guest_name' => $existing->guest_name,
                    'attendance_status' => $existing->attendance_status,
                ],
            ], 200);
        }

        $rsvp = Rsvp::create([
            'invitation_id' => $invitation->id,
            'guest_name' => $validated['guest_name'],
            'email' => $validated['email'] ?? null,
            'phone' => $validated['phone'] ?? null,
            'attendance_status' => $validated['attendance_status'],
            'guest_count' => $validated['guest_count'] ?? 1,
            'selected_events' => $validated['selected_events'] ?? [],
            'dietary_notes' => $validated['dietary_notes'] ?? null,
            'message' => $validated['message'] ?? null,
            'ip_address' => $ip,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Your presence has been recorded in the stars! Thank you for gracing our celestial universe.',
            'data' => [
                'id' => $rsvp->id,
                'guest_name' => $rsvp->guest_name,
                'attendance_status' => $rsvp->attendance_status,
                'guest_count' => $rsvp->guest_count,
            ],
        ], 201);
    }
}
