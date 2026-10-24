<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class GalleryMedia extends Model
{
    use HasFactory;

    protected $fillable = [
        'invitation_id',
        'title',
        'caption',
        'media_type',
        'url',
        'thumbnail_url',
        'category',
        'order_index',
        'is_featured',
    ];

    protected $casts = [
        'is_featured' => 'boolean',
        'order_index' => 'integer',
    ];

    public function invitation(): BelongsTo
    {
        return $this->belongsTo(Invitation::class);
    }
}
