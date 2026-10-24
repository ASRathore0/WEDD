<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Invitation;
use App\Models\VenueTravel;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class VenueTravelController extends Controller
{
    public function show(): JsonResponse
    {
        $invitation = Invitation::firstOrFail();
        $venue = $invitation->venueTravel ?? new VenueTravel();

        return response()->json([
            'success' => true,
            'data' => $venue,
        ]);
    }

    public function update(Request $request): JsonResponse
    {
        $invitation = Invitation::firstOrFail();

        $validated = $request->validate([
            'venue_name' => ['required', 'string', 'max:200'],
            'venue_sub_heading' => ['nullable', 'string', 'max:255'],
            'address' => ['required', 'string'],
            'map_embed_url' => ['nullable', 'string'],
            'map_directions_url' => ['nullable', 'string'],
            'parking_info' => ['nullable', 'string'],
            'accommodation_info' => ['nullable', 'string'],
            'transport_info' => ['nullable', 'string'],
            'contact_name' => ['nullable', 'string', 'max:100'],
            'contact_phone' => ['nullable', 'string', 'max:50'],
            'contact_email' => ['nullable', 'string', 'max:100'],
        ]);

        $venue = VenueTravel::updateOrCreate(
            ['invitation_id' => $invitation->id],
            $validated
        );

        return response()->json([
            'success' => true,
            'message' => 'Venue and travel information updated.',
            'data' => $venue,
        ]);
    }
}
