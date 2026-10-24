<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Invitation;
use App\Models\Rsvp;
use App\Models\WeddingEvent;
use Illuminate\Http\JsonResponse;

class DashboardController extends Controller
{
    /**
     * Get administrative overview stats.
     */
    public function index(): JsonResponse
    {
        $invitation = Invitation::first();

        if (!$invitation) {
            return response()->json([
                'success' => false,
                'message' => 'No invitation configured yet.',
            ], 404);
        }

        $totalRsvps = Rsvp::where('invitation_id', $invitation->id)->count();
        $attendingRsvps = Rsvp::where('invitation_id', $invitation->id)->where('attendance_status', 'attending')->count();
        $declinedRsvps = Rsvp::where('invitation_id', $invitation->id)->where('attendance_status', 'declined')->count();
        $tentativeRsvps = Rsvp::where('invitation_id', $invitation->id)->where('attendance_status', 'tentative')->count();
        $totalAttendingGuests = (int) Rsvp::where('invitation_id', $invitation->id)
            ->where('attendance_status', 'attending')
            ->sum('guest_count');

        $eventsCount = WeddingEvent::where('invitation_id', $invitation->id)->count();
        $galleryCount = $invitation->gallery()->count();
        $storiesCount = $invitation->stories()->count();

        $recentRsvps = Rsvp::where('invitation_id', $invitation->id)
            ->latest()
            ->take(6)
            ->get();

        return response()->json([
            'success' => true,
            'data' => [
                'invitation' => [
                    'id' => $invitation->id,
                    'slug' => $invitation->slug,
                    'title' => $invitation->title,
                    'partner_one' => $invitation->partner_one,
                    'partner_two' => $invitation->partner_two,
                    'wedding_date' => $invitation->wedding_date,
                    'wedding_timezone' => $invitation->wedding_timezone,
                    'is_published' => $invitation->is_published,
                ],
                'stats' => [
                    'total_rsvps' => $totalRsvps,
                    'attending_rsvps' => $attendingRsvps,
                    'declined_rsvps' => $declinedRsvps,
                    'tentative_rsvps' => $tentativeRsvps,
                    'total_attending_guests' => $totalAttendingGuests,
                    'events_count' => $eventsCount,
                    'gallery_count' => $galleryCount,
                    'stories_count' => $storiesCount,
                ],
                'recent_rsvps' => $recentRsvps,
            ],
        ]);
    }
}
