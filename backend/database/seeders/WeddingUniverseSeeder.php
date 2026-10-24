<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Invitation;
use App\Models\WeddingEvent;
use App\Models\StoryMilestone;
use App\Models\GalleryMedia;
use App\Models\VenueTravel;
use App\Models\Rsvp;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class WeddingUniverseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Create or update Default Administrator
        $admin = User::firstOrCreate(
            ['email' => 'admin@weddinguniverse.luxury'],
            [
                'name' => 'Royal Custodian',
                'password' => Hash::make('universe2026'),
            ]
        );

        // 2. Primary Invitation: Devansh & Samaira in The Celestial Palace of Udaipur
        $invitation = Invitation::updateOrCreate(
            ['slug' => 'devansh-samaira'],
            [
                'title' => 'The Celestial Union of Devansh & Samaira',
                'partner_one' => 'Devansh',
                'partner_two' => 'Samaira',
                'wedding_date' => '2026-11-28 18:30:00',
                'wedding_timezone' => 'Asia/Kolkata',
                'venue_city' => 'Udaipur, Rajasthan',
                'tagline' => 'Two souls bound across celestial constellations and timeless moonlight.',
                'celestial_quote' => 'In a universe of billions of galaxies, our stars converged into one eternal harmony.',
                'audio_title' => 'Shehnai & Sitar — Auspicious Vivah Dhun',
                'audio_url' => '/audio/shehnai_vivah.mp3',
                'is_published' => true,
                'theme_settings' => [
                    'primary_color' => '#651B2B', // Oxblood
                    'secondary_color' => '#E34236', // Vermilion
                    'accent_color' => '#D7B46A', // Antique Gold
                    'bg_dark' => '#100C12', // Cosmic Black
                    'bg_light' => '#F5ECDD', // Warm Ivory
                    'font_serif' => 'Cinzel Decorative, Cormorant Garamond, serif',
                    'font_sans' => 'Outfit, sans-serif',
                ],
            ]
        );

        // 3. Wedding Events with unique color accents
        WeddingEvent::where('invitation_id', $invitation->id)->delete();
        $events = [
            [
                'invitation_id' => $invitation->id,
                'title' => 'Surya Kanti — The Haldi',
                'event_type' => 'haldi',
                'event_date' => '2026-11-26',
                'start_time' => '10:00 AM',
                'end_time' => '01:00 PM',
                'venue_name' => 'The Sun Courtyard, Jagmandir Island Palace',
                'venue_address' => 'Pichola, Udaipur, Rajasthan 313001',
                'description' => 'A morning drenched in turmeric gold, marigold petals, vibrant folk songs, and pure laughter under the Rajasthan sun.',
                'dress_code' => 'Sunny Yellows, Festive Ochre & Raw Silk',
                'calendar_link' => 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Surya+Kanti+Haldi+-+Devansh+and+Samaira&dates=20261126T043000Z/20261126T073000Z',
                'color_accent' => '#F5B041',
                'order_index' => 1,
            ],
            [
                'invitation_id' => $invitation->id,
                'title' => 'Heena Utsav — The Mehendi',
                'event_type' => 'mehendi',
                'event_date' => '2026-11-26',
                'start_time' => '04:00 PM',
                'end_time' => '08:00 PM',
                'venue_name' => 'Zenana Mahal Gardens',
                'venue_address' => 'City Palace Complex, Udaipur',
                'description' => 'Intricate botanical henna motifs laced with secret initials, spiced artisanal chai, fragrant jasmine, and soulful acoustic melodies.',
                'dress_code' => 'Emerald Green, Botanical Florals & Mint Hues',
                'calendar_link' => 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Heena+Utsav+Mehendi+-+Devansh+and+Samaira&dates=20261126T103000Z/20261126T143000Z',
                'color_accent' => '#2E7D32',
                'order_index' => 2,
            ],
            [
                'invitation_id' => $invitation->id,
                'title' => 'Sitara Raat — The Sangeet',
                'event_type' => 'sangeet',
                'event_date' => '2026-11-27',
                'start_time' => '07:30 PM',
                'end_time' => '01:00 AM',
                'venue_name' => 'Manek Chowk Grand Arena',
                'venue_address' => 'City Palace Heritage Grounds, Udaipur',
                'description' => 'A theatrical evening of choreographed royal face-offs, pulsating Punjabi beats, live Sufi crescendo, and fireworks reflecting on Lake Pichola.',
                'dress_code' => 'High-Glam Royal Velvet, Midnight Navy & Cosmic Shimmer',
                'calendar_link' => 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Sitara+Raat+Sangeet+-+Devansh+and+Samaira&dates=20261127T140000Z/20261127T193000Z',
                'color_accent' => '#D81B60',
                'order_index' => 3,
            ],
            [
                'invitation_id' => $invitation->id,
                'title' => 'The Vedic Pheras — Royal Nuptials',
                'event_type' => 'wedding',
                'event_date' => '2026-11-28',
                'start_time' => '05:30 PM',
                'end_time' => '10:00 PM',
                'venue_name' => 'The Royal Lakeside Mandap, Oberoi Udaivilas',
                'venue_address' => 'Haridas Ji Ki Magri, Udaipur, Rajasthan 313001',
                'description' => 'Seven sacred vows whispered over the holy Agni under the grand celestial moon, surrounded by 10,000 crimson roses and royal Shehnai reverberations.',
                'dress_code' => 'Traditional Indian Regalia — Oxblood, Antique Gold & Regal Ivory',
                'calendar_link' => 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Vedic+Pheras+Wedding+-+Devansh+and+Samaira&dates=20261128T120000Z/20261128T163000Z',
                'color_accent' => '#651B2B',
                'order_index' => 4,
            ],
            [
                'invitation_id' => $invitation->id,
                'title' => 'Jashn-e-Khaas — The Grand Reception',
                'event_type' => 'reception',
                'event_date' => '2026-11-29',
                'start_time' => '08:00 PM',
                'end_time' => '02:00 AM',
                'venue_name' => 'The Durbar Hall & Promenade',
                'venue_address' => 'Fateh Prakash Palace, Udaipur',
                'description' => 'A celestial black-tie gala banquet celebrating the new era with vintage champagne, live orchestral symphony, and decadent royal delicacies.',
                'dress_code' => 'Black Tie Tuxedos, Haute Couture Sarees & Gowns',
                'calendar_link' => 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Jashn-e-Khaas+Reception+-+Devansh+and+Samaira&dates=20261129T143000Z/20261129T203000Z',
                'color_accent' => '#D7B46A',
                'order_index' => 5,
            ],
        ];

        foreach ($events as $event) {
            WeddingEvent::create($event);
        }

        // 4. Story Milestones
        StoryMilestone::where('invitation_id', $invitation->id)->delete();
        $stories = [
            [
                'invitation_id' => $invitation->id,
                'title' => 'The Stargazer Meet',
                'date_label' => 'Autumn 2021',
                'subtitle' => 'Oxford Astronomy Library, London',
                'description' => 'Surrounded by centuries-old celestial maps, Devansh dropped his notes on Keplerian orbits. Samaira picked them up, smiled, and noticed he was looking at the exact star constellation she was studying.',
                'image_url' => 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
                'quote' => '“We didn’t just meet; our orbits simply collapsed into one center of gravity.”',
                'order_index' => 1,
            ],
            [
                'invitation_id' => $invitation->id,
                'title' => 'Chai Over the Ghats',
                'date_label' => 'Winter 2023',
                'subtitle' => 'Varanasi at Dawn',
                'description' => 'On the silent mist-laden ghats of Kashi, watching hundreds of floating earthen diyas drift into the sacred river, they made an unspoken pact to wander every corner of this world hand-in-hand.',
                'image_url' => 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
                'quote' => '“Some moments are written in ancient ink, long before our hearts remember them.”',
                'order_index' => 2,
            ],
            [
                'invitation_id' => $invitation->id,
                'title' => 'The Palace of Whispers',
                'date_label' => 'Spring 2025',
                'subtitle' => 'Amer Fort, Jaipur',
                'description' => 'Inside the Sheesh Mahal, where a single flame reflects across a million mirrors, Devansh knelt down with an heirloom diamond ring crafted in antique gold. Her quiet “Yes” echoed into the night.',
                'image_url' => 'https://images.unsplash.com/photo-1609151162377-794fa6ec4a39?auto=format&fit=crop&w=1200&q=80',
                'quote' => '“In a room of a million reflections, my eyes only searched for one.”',
                'order_index' => 3,
            ],
            [
                'invitation_id' => $invitation->id,
                'title' => 'The Eternal Vow',
                'date_label' => 'November 2026',
                'subtitle' => 'Lake Pichola, Udaipur',
                'description' => 'Now, beneath the vermilion moon and celestial palace arches, we invite you to stand witness as we weave our two families and destinies together into eternity.',
                'image_url' => 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
                'quote' => '“Our universe begins where love transcends the stars.”',
                'order_index' => 4,
            ],
        ];

        foreach ($stories as $story) {
            StoryMilestone::create($story);
        }

        // 5. Gallery Media
        GalleryMedia::where('invitation_id', $invitation->id)->delete();
        $gallery = [
            [
                'invitation_id' => $invitation->id,
                'title' => 'The Royal Portrait',
                'caption' => 'Devansh & Samaira at the City Palace Pavilion',
                'media_type' => 'image',
                'url' => 'https://images.unsplash.com/photo-1609151162377-794fa6ec4a39?auto=format&fit=crop&w=1200&q=80',
                'thumbnail_url' => 'https://images.unsplash.com/photo-1609151162377-794fa6ec4a39?auto=format&fit=crop&w=600&q=80',
                'category' => 'couple',
                'order_index' => 1,
                'is_featured' => true,
            ],
            [
                'invitation_id' => $invitation->id,
                'title' => 'Golden Hour Romance',
                'caption' => 'A gentle breeze over Lake Pichola',
                'media_type' => 'image',
                'url' => 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
                'thumbnail_url' => 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
                'category' => 'couple',
                'order_index' => 2,
                'is_featured' => true,
            ],
            [
                'invitation_id' => $invitation->id,
                'title' => 'Botanical Heena Artistry',
                'caption' => 'Intricate bridal henna and heirloom polki kundan',
                'media_type' => 'image',
                'url' => 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
                'thumbnail_url' => 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80',
                'category' => 'ceremonies',
                'order_index' => 3,
                'is_featured' => false,
            ],
            [
                'invitation_id' => $invitation->id,
                'title' => 'Royal Jharokhas & Archways',
                'caption' => 'Palatial stone craftsmanship in antique gold light',
                'media_type' => 'image',
                'url' => 'https://images.unsplash.com/photo-1599818816933-728b12f6797f?auto=format&fit=crop&w=1200&q=80',
                'thumbnail_url' => 'https://images.unsplash.com/photo-1599818816933-728b12f6797f?auto=format&fit=crop&w=600&q=80',
                'category' => 'cinematic',
                'order_index' => 4,
                'is_featured' => true,
            ],
            [
                'invitation_id' => $invitation->id,
                'title' => 'Crimson Rose Mandap',
                'caption' => 'Floral canopy waiting for the sacred Agni',
                'media_type' => 'image',
                'url' => 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
                'thumbnail_url' => 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
                'category' => 'ceremonies',
                'order_index' => 5,
                'is_featured' => false,
            ],
            [
                'invitation_id' => $invitation->id,
                'title' => 'Moonlit Palace Silhouette',
                'caption' => 'Lake palace glimmering against the vermilion night',
                'media_type' => 'image',
                'url' => 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
                'thumbnail_url' => 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80',
                'category' => 'cinematic',
                'order_index' => 6,
                'is_featured' => true,
            ],
        ];

        foreach ($gallery as $item) {
            GalleryMedia::create($item);
        }

        // 6. Venue & Travel Information
        VenueTravel::updateOrCreate(
            ['invitation_id' => $invitation->id],
            [
                'venue_name' => 'The Oberoi Udaivilas & Jagmandir Island Palace',
                'venue_sub_heading' => 'A celestial heritage sanctuary along the pristine waters of Lake Pichola',
                'address' => 'Haridas Ji Ki Magri, Mulla Talai, Udaipur, Rajasthan 313001, India',
                'map_embed_url' => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3628.188373446452!2d73.6688753761763!3d24.582736156321957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3967e5628b056157%3A0xe5a9df66f77ff779!2sThe%20Oberoi%20Udaivilas%2C%20Udaipur!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
                'map_directions_url' => 'https://maps.google.com/?q=The+Oberoi+Udaivilas+Udaipur',
                'parking_info' => 'Complimentary valet parking and chauffeured vintage golf carts will be available throughout all events at the main entrance portico.',
                'accommodation_info' => 'Luxury lake-view rooms and royal suites have been reserved for all distinguished guests at The Oberoi Udaivilas and Trident Udaipur.',
                'transport_info' => 'Dedicated luxury chauffeurs and private boat transfers from Udaivilas Jetty to Jagmandir Island run continuously every 15 minutes.',
                'contact_name' => 'Royal Concierge Desk',
                'contact_phone' => '+91 98200 12345 / +91 98200 67890',
                'contact_email' => 'concierge@devanshsamaira.luxury',
            ]
        );

        // 7. Demo RSVPs
        Rsvp::where('invitation_id', $invitation->id)->delete();
        $sampleRsvps = [
            [
                'invitation_id' => $invitation->id,
                'guest_name' => 'Maharaja Vikramaditya & Maharani Gayatri Singh',
                'email' => 'vikram.singh@royalheritage.in',
                'phone' => '+91 98111 22334',
                'attendance_status' => 'attending',
                'guest_count' => 2,
                'selected_events' => ['Surya Kanti — The Haldi', 'Sitara Raat — The Sangeet', 'The Vedic Pheras — Royal Nuptials', 'Jashn-e-Khaas — The Grand Reception'],
                'dietary_notes' => 'Strict Royal Jain Rajasthani cuisine',
                'message' => 'Heartiest congratulations to both the royal families! We await this magical union under the stars.',
            ],
            [
                'invitation_id' => $invitation->id,
                'guest_name' => 'Dr. Siddharth & Natasha Oberoi',
                'email' => 'siddharth@oberoigroup.com',
                'phone' => '+91 98222 33445',
                'attendance_status' => 'attending',
                'guest_count' => 3,
                'selected_events' => ['Heena Utsav — The Mehendi', 'Sitara Raat — The Sangeet', 'The Vedic Pheras — Royal Nuptials'],
                'dietary_notes' => 'Gluten free preferences',
                'message' => 'So thrilled to witness the celestial wedding of the decade! Sending all our love.',
            ],
            [
                'invitation_id' => $invitation->id,
                'guest_name' => 'Kabir & Tara Mehta',
                'email' => 'kabir.mehta@londonvc.co.uk',
                'phone' => '+44 7700 900123',
                'attendance_status' => 'attending',
                'guest_count' => 2,
                'selected_events' => ['Surya Kanti — The Haldi', 'Heena Utsav — The Mehendi', 'Sitara Raat — The Sangeet', 'The Vedic Pheras — Royal Nuptials', 'Jashn-e-Khaas — The Grand Reception'],
                'dietary_notes' => 'No restrictions, excited for authentic Mewari feasts',
                'message' => 'Flying in all the way from London! Wouldn’t miss our Oxford astronomer’s grand celestial wedding for the world.',
            ],
        ];

        foreach ($sampleRsvps as $rsvp) {
            Rsvp::create($rsvp);
        }
    }
}
