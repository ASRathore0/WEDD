<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Invitation extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'title',
        'partner_one',
        'partner_two',
        'wedding_date',
        'wedding_timezone',
        'venue_city',
        'tagline',
        'hero_image_url',
        'celestial_quote',
        'audio_title',
        'audio_url',
        'is_published',
        'theme_settings',
    ];

    protected $casts = [
        'wedding_date' => 'datetime',
        'is_published' => 'boolean',
        'theme_settings' => 'array',
    ];

    public function events(): HasMany
    {
        return $this->hasMany(WeddingEvent::class)->orderBy('order_index')->orderBy('event_date')->orderBy('start_time');
    }

    public function stories(): HasMany
    {
        return $this->hasMany(StoryMilestone::class)->orderBy('order_index');
    }

    public function gallery(): HasMany
    {
        return $this->hasMany(GalleryMedia::class)->orderBy('order_index');
    }

    public function venueTravel(): HasOne
    {
        return $this->hasOne(VenueTravel::class);
    }

    public function rsvps(): HasMany
    {
        return $this->hasMany(Rsvp::class)->latest();
    }
}
