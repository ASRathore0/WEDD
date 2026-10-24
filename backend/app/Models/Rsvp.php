<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Rsvp extends Model
{
    use HasFactory;

    protected $fillable = [
        'invitation_id',
        'guest_name',
        'email',
        'phone',
        'attendance_status',
        'guest_count',
        'selected_events',
        'dietary_notes',
        'message',
        'ip_address',
    ];

    protected $casts = [
        'selected_events' => 'array',
        'guest_count' => 'integer',
    ];

    public function invitation(): BelongsTo
    {
        return $this->belongsTo(Invitation::class);
    }
}
