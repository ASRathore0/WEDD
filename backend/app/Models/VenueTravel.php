<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class VenueTravel extends Model
{
    use HasFactory;

    protected $table = 'venue_travel';

    protected $fillable = [
        'invitation_id',
        'venue_name',
        'venue_sub_heading',
        'address',
        'map_embed_url',
        'map_directions_url',
        'parking_info',
        'accommodation_info',
        'transport_info',
        'contact_name',
        'contact_phone',
        'contact_email',
    ];

    public function invitation(): BelongsTo
    {
        return $this->belongsTo(Invitation::class);
    }
}
