<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Invitations
        Schema::create('invitations', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title')->default('Wedding Universe');
            $table->string('partner_one')->default('Devansh');
            $table->string('partner_two')->default('Samaira');
            $table->dateTime('wedding_date');
            $table->string('wedding_timezone')->default('Asia/Kolkata');
            $table->string('venue_city')->default('Udaipur, Rajasthan');
            $table->string('tagline')->default('A Little Universe Created For You');
            $table->text('celestial_quote')->nullable();
            $table->string('audio_title')->default('Raag Darbari - Celestial Sitar & Santoor');
            $table->string('audio_url')->nullable();
            $table->boolean('is_published')->default(true);
            $table->json('theme_settings')->nullable();
            $table->timestamps();
        });

        // Wedding Events (Haldi, Mehendi, Sangeet, Wedding, Reception)
        Schema::create('wedding_events', function (Blueprint $table) {
            $table->id();
            $table->foreignId('invitation_id')->constrained()->cascadeOnDelete();
            $table->string('title');
            $table->string('event_type'); // haldi, mehendi, sangeet, wedding, reception
            $table->date('event_date');
            $table->string('start_time');
            $table->string('end_time')->nullable();
            $table->string('venue_name');
            $table->string('venue_address')->nullable();
            $table->text('description')->nullable();
            $table->string('dress_code')->nullable();
            $table->string('calendar_link')->nullable();
            $table->string('color_accent')->nullable();
            $table->integer('order_index')->default(0);
            $table->timestamps();

            $table->index(['invitation_id', 'order_index']);
        });

        // Story Milestones
        Schema::create('story_milestones', function (Blueprint $table) {
            $table->id();
            $table->foreignId('invitation_id')->constrained()->cascadeOnDelete();
            $table->string('title');
            $table->string('date_label'); // e.g., "Winter 2021", "First Gaze"
            $table->string('subtitle')->nullable();
            $table->text('description');
            $table->string('image_url')->nullable();
            $table->string('quote')->nullable();
            $table->integer('order_index')->default(0);
            $table->timestamps();

            $table->index(['invitation_id', 'order_index']);
        });

        // Gallery Media
        Schema::create('gallery_media', function (Blueprint $table) {
            $table->id();
            $table->foreignId('invitation_id')->constrained()->cascadeOnDelete();
            $table->string('title')->nullable();
            $table->string('caption')->nullable();
            $table->enum('media_type', ['image', 'video'])->default('image');
            $table->string('url');
            $table->string('thumbnail_url')->nullable();
            $table->string('category')->default('all'); // all, couple, ceremonies, cinematic
            $table->integer('order_index')->default(0);
            $table->boolean('is_featured')->default(false);
            $table->timestamps();

            $table->index(['invitation_id', 'category', 'order_index']);
        });

        // Venue and Travel Info
        Schema::create('venue_travel', function (Blueprint $table) {
            $table->id();
            $table->foreignId('invitation_id')->constrained()->cascadeOnDelete();
            $table->string('venue_name');
            $table->string('venue_sub_heading')->nullable();
            $table->text('address');
            $table->text('map_embed_url')->nullable();
            $table->text('map_directions_url')->nullable();
            $table->text('parking_info')->nullable();
            $table->text('accommodation_info')->nullable();
            $table->text('transport_info')->nullable();
            $table->string('contact_name')->nullable();
            $table->string('contact_phone')->nullable();
            $table->string('contact_email')->nullable();
            $table->timestamps();
        });

        // RSVPs
        Schema::create('rsvps', function (Blueprint $table) {
            $table->id();
            $table->foreignId('invitation_id')->constrained()->cascadeOnDelete();
            $table->string('guest_name');
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->enum('attendance_status', ['attending', 'declined', 'tentative'])->default('attending');
            $table->integer('guest_count')->default(1);
            $table->json('selected_events')->nullable();
            $table->text('dietary_notes')->nullable();
            $table->text('message')->nullable();
            $table->string('ip_address', 45)->nullable();
            $table->timestamps();

            $table->index(['invitation_id', 'attendance_status']);
            $table->index(['invitation_id', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rsvps');
        Schema::dropIfExists('venue_travel');
        Schema::dropIfExists('gallery_media');
        Schema::dropIfExists('story_milestones');
        Schema::dropIfExists('wedding_events');
        Schema::dropIfExists('invitations');
    }
};
