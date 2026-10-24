<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StoryMilestone extends Model
{
    use HasFactory;

    protected $fillable = [
        'invitation_id',
        'title',
        'date_label',
        'subtitle',
        'description',
        'image_url',
        'quote',
        'order_index',
    ];

    protected $casts = [
        'order_index' => 'integer',
    ];

    public function invitation(): BelongsTo
    {
        return $this->belongsTo(Invitation::class);
    }
}
