<?php

namespace Tests\Feature;

use Database\Seeders\WeddingUniverseSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class InvitationApiTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(WeddingUniverseSeeder::class);
    }

    public function test_can_fetch_published_invitation(): void
    {
        $response = $this->getJson('/api/invitations/devansh-samaira');

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
            ])
            ->assertJsonStructure([
                'success',
                'data' => [
                    'id',
                    'slug',
                    'partner_one',
                    'partner_two',
                    'wedding_date',
                    'events',
                    'stories',
                    'gallery',
                    'venue_travel',
                ],
            ]);
    }

    public function test_can_submit_valid_rsvp(): void
    {
        $payload = [
            'guest_name' => 'Royal Guest Tester',
            'email' => 'guest@tester.luxury',
            'phone' => '+91 99999 88888',
            'attendance_status' => 'attending',
            'guest_count' => 2,
            'selected_events' => ['Surya Kanti — The Haldi', 'The Vedic Pheras — Royal Nuptials'],
            'dietary_notes' => 'Rajasthani Royal Thali',
            'message' => 'Heartiest congratulations from the test suite!',
        ];

        $response = $this->postJson('/api/invitations/devansh-samaira/rsvp', $payload);

        $response->assertStatus(201)
            ->assertJson([
                'success' => true,
            ]);

        $this->assertDatabaseHas('rsvps', [
            'guest_name' => 'Royal Guest Tester',
            'email' => 'guest@tester.luxury',
        ]);
    }

    public function test_rsvp_validation_rejects_missing_name(): void
    {
        $payload = [
            'guest_name' => '',
            'attendance_status' => 'attending',
            'guest_count' => 2,
        ];

        $response = $this->postJson('/api/invitations/devansh-samaira/rsvp', $payload);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['guest_name']);
    }

    public function test_admin_can_authenticate_and_access_protected_dashboard(): void
    {
        $loginResponse = $this->postJson('/api/admin/login', [
            'email' => 'admin@weddinguniverse.luxury',
            'password' => 'universe2026',
        ]);

        $loginResponse->assertStatus(200)
            ->assertJsonStructure(['token', 'user']);

        $token = $loginResponse->json('token');

        $dashboardResponse = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->getJson('/api/admin/dashboard');

        $dashboardResponse->assertStatus(200)
            ->assertJson(['success' => true]);
    }
}
