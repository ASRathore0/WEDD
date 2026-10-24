<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Invitation;
use App\Models\Rsvp;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\StreamedResponse;

class AdminRsvpController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $invitation = Invitation::firstOrFail();

        $query = Rsvp::where('invitation_id', $invitation->id);

        if ($request->filled('status') && $request->status !== 'all') {
            $query->where('attendance_status', $request->status);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('guest_name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%");
            });
        }

        $rsvps = $query->latest()->paginate($request->get('per_page', 20));

        return response()->json([
            'success' => true,
            'data' => $rsvps,
        ]);
    }

    public function destroy(int $id): JsonResponse
    {
        $invitation = Invitation::firstOrFail();
        $rsvp = $invitation->rsvps()->findOrFail($id);
        $rsvp->delete();

        return response()->json([
            'success' => true,
            'message' => 'RSVP record deleted.',
        ]);
    }

    /**
     * Export RSVP list as CSV.
     */
    public function export(): StreamedResponse
    {
        $invitation = Invitation::firstOrFail();
        $rsvps = $invitation->rsvps()->orderBy('attendance_status')->latest()->get();

        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="rsvps-' . date('Y-m-d') . '.csv"',
        ];

        return response()->stream(function () use ($rsvps) {
            $handle = fopen('php://output', 'w');
            fputcsv($handle, ['ID', 'Guest Name', 'Attendance', 'Guests Count', 'Email', 'Phone', 'Selected Events', 'Dietary Notes', 'Message', 'Submitted At']);

            foreach ($rsvps as $rsvp) {
                fputcsv($handle, [
                    $rsvp->id,
                    $rsvp->guest_name,
                    strtoupper($rsvp->attendance_status),
                    $rsvp->guest_count,
                    $rsvp->email ?? '',
                    $rsvp->phone ?? '',
                    is_array($rsvp->selected_events) ? implode(', ', $rsvp->selected_events) : '',
                    $rsvp->dietary_notes ?? '',
                    $rsvp->message ?? '',
                    $rsvp->created_at->format('Y-m-d H:i:s'),
                ]);
            }

            fclose($handle);
        }, 200, $headers);
    }
}
