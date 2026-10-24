<?php

use App\Http\Controllers\Api\Admin\AdminRsvpController;
use App\Http\Controllers\Api\Admin\AuthController;
use App\Http\Controllers\Api\Admin\DashboardController;
use App\Http\Controllers\Api\Admin\EventController;
use App\Http\Controllers\Api\Admin\GalleryController;
use App\Http\Controllers\Api\Admin\InvitationController;
use App\Http\Controllers\Api\Admin\StoryController;
use App\Http\Controllers\Api\Admin\VenueTravelController;
use App\Http\Controllers\Api\PublicInvitationController;
use App\Http\Controllers\Api\RsvpController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public Celestial Invitation Routes
|--------------------------------------------------------------------------
*/
Route::get('/invitations/{slug?}', [PublicInvitationController::class, 'show']);
Route::get('/invitations/{slug}/events', [PublicInvitationController::class, 'events']);
Route::get('/invitations/{slug}/gallery', [PublicInvitationController::class, 'gallery']);

// Rate-limited RSVP submission: max 10 attempts per minute per IP
Route::post('/invitations/{slug}/rsvp', [RsvpController::class, 'store'])
    ->middleware('throttle:10,1');

/*
|--------------------------------------------------------------------------
| Admin Authentication
|--------------------------------------------------------------------------
*/
Route::post('/admin/login', [AuthController::class, 'login']);

/*
|--------------------------------------------------------------------------
| Protected Admin Routes (Sanctum)
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->prefix('admin')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    Route::get('/dashboard', [DashboardController::class, 'index']);

    // Invitation settings
    Route::get('/invitation', [InvitationController::class, 'show']);
    Route::match(['put', 'post'], '/invitation', [InvitationController::class, 'update']);

    // Event ceremonies CRUD
    Route::get('/events', [EventController::class, 'index']);
    Route::post('/events', [EventController::class, 'store']);
    Route::put('/events/{id}', [EventController::class, 'update']);
    Route::delete('/events/{id}', [EventController::class, 'destroy']);

    // Story milestones CRUD
    Route::get('/stories', [StoryController::class, 'index']);
    Route::post('/stories', [StoryController::class, 'store']);
    Route::put('/stories/{id}', [StoryController::class, 'update']);
    Route::delete('/stories/{id}', [StoryController::class, 'destroy']);

    // Gallery Media CRUD
    Route::get('/gallery', [GalleryController::class, 'index']);
    Route::post('/gallery', [GalleryController::class, 'store']);
    Route::delete('/gallery/{id}', [GalleryController::class, 'destroy']);

    // Venue & Travel Info
    Route::get('/venue-travel', [VenueTravelController::class, 'show']);
    Route::put('/venue-travel', [VenueTravelController::class, 'update']);

    // RSVPs & Export
    Route::get('/rsvps', [AdminRsvpController::class, 'index']);
    Route::delete('/rsvps/{id}', [AdminRsvpController::class, 'destroy']);
    Route::get('/rsvps-export', [AdminRsvpController::class, 'export']);
});
