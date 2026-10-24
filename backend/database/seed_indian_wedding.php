<?php

require_once __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Invitation;
use App\Models\WeddingEvent;
use App\Models\VenueTravel;

$inv = Invitation::first();
if (!$inv) {
    $inv = new Invitation();
    $inv->slug = 'amit-sweety';
}

$inv->title = 'Shubh Vivah — Sweety Singh & Amit Kumar Singh';
$inv->partner_one = 'Sweety Singh';
$inv->partner_two = 'Amit Kumar Singh';
$inv->wedding_date = '2026-11-30 19:00:00';
$inv->wedding_timezone = 'Asia/Kolkata';
$inv->venue_city = 'Shiv Bajrang Hotel, Thawe';
$inv->tagline = 'Two Hearts. One Extraordinary Universe.';
$inv->hero_image_url = '/images/amit_sweety_hero.jpg';

$theme = $inv->theme_settings ?? [];
$theme['primary_color'] = '#EAB308';
$theme['secondary_color'] = '#CA8A04';
$theme['accent_color'] = '#FACC15';
$theme['bg_dark'] = '#FEFCE8';
$theme['bg_light'] = '#FFFDF0';
$theme['ganesh_image_url'] = '/images/ganesh_ji.jpg';
$theme['ganesh_shloka_hindi'] = '॥ श्री गणेशाय नमः ॥';
$theme['ganesh_mantra'] = 'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥';
$theme['bride_details'] = [
    'name' => 'Sweety Singh',
    'title' => 'The Bride (वधू)',
    'qualification' => 'M.Sc / MBA in Financial Management',
    'profession' => 'Financial Analyst & Creative Specialist',
    'father_name' => 'Shri Dharmendra Singh',
    'mother_name' => 'Smt. Sunita Devi',
    'native_place' => 'Thawe, Gopalganj, Bihar',
    'about' => 'Graceful, intellectual, and radiant. An accomplished professional who brings joy, elegance, and harmony.',
    'photo_url' => '/images/amit_sweety_hero.jpg'
];
$theme['groom_details'] = [
    'name' => 'Amit Kumar Singh',
    'title' => 'The Groom (वर)',
    'qualification' => 'B.Tech in Computer Science / Senior Software Architect',
    'profession' => 'Senior Technology Consultant & Entrepreneur',
    'father_name' => 'Shri Ramendra Singh',
    'mother_name' => 'Smt. Shanti Devi',
    'native_place' => 'Thawe, Gopalganj, Bihar',
    'about' => 'Visionary and rooted in tradition. Leading digital technologies while cherishing deep cultural values.',
    'photo_url' => '/images/amit_sweety_hero.jpg'
];
$theme['bride_family'] = [
    [
        'id' => 'bf-1',
        'name' => 'स्व. श्री रामचन्द्र सिंह एवं श्रीमती देवकी देवी',
        'relation' => 'दादा जी - दादी जी (Paternal Grandparents)',
        'category' => 'elders',
        'note' => 'परम पूज्य पूर्वज एवं कुलदेवता तुल्य शुभाशीष',
    ],
    [
        'id' => 'bf-2',
        'name' => 'स्व. श्री रामवृक्ष सिंह एवं श्रीमती प्रभावती देवी',
        'relation' => 'नाना जी - नानी जी (Maternal Grandparents)',
        'category' => 'elders',
        'note' => 'सदा स्मरणीय मंगलमय शुभाशीष',
    ],
    [
        'id' => 'bf-3',
        'name' => 'श्री धर्मेन्द्र सिंह एवं श्रीमती सुनीता देवी',
        'relation' => 'माता-पिता (Parents)',
        'category' => 'parents',
        'note' => 'वधू के परम स्नेही माता एवं पिता (थावे, गोपालगंज)',
    ],
    [
        'id' => 'bf-4',
        'name' => 'श्री बीरेन्द्र सिंह एवं श्रीमती रेखा देवी',
        'relation' => 'चाचा जी - चाची जी (Paternal Uncle & Aunt)',
        'category' => 'uncles_aunts',
        'note' => 'सस्नेह शुभाशीष',
    ],
    [
        'id' => 'bf-5',
        'name' => 'श्री जितेन्द्र सिंह एवं श्रीमती मीना देवी',
        'relation' => 'चाचा जी - चाची जी (Paternal Uncle & Aunt)',
        'category' => 'uncles_aunts',
        'note' => 'सस्नेह शुभाशीष',
    ],
    [
        'id' => 'bf-6',
        'name' => 'श्री संजय सिंह एवं श्रीमती उर्मिला देवी',
        'relation' => 'मामा जी - मामी जी (Maternal Uncle & Aunt)',
        'category' => 'uncles_aunts',
        'note' => 'मातृपक्ष मंगलकामनाएं',
    ],
    [
        'id' => 'bf-7',
        'name' => 'राहुल सिंह एवं अभिषेक सिंह',
        'relation' => 'भ्राता (Brothers)',
        'category' => 'siblings',
        'note' => 'स्नेही भाई',
    ],
    [
        'id' => 'bf-8',
        'name' => 'समस्त सिंह परिवार एवं स्नेहीजन',
        'relation' => 'दर्शनाभिलाषी / स्वागताकांक्षी (Welcoming Kinsfolk)',
        'category' => 'darsanabhilashi',
        'note' => 'थावे, गोपालगंज (बिहार)',
    ],
];
$theme['family_invitation_text'] = 'Together with their families, cordially invite you to share in the joy and blessings of their holy matrimonial union.';
$theme['auspicious_welcome'] = 'मंगलम् भगवान विष्णुः, मंगलम् गरुड़ध्वजः। मंगलम् पुण्डरीकाक्षः, मंगलाय तनो हरिः॥';
$theme['compliments_from'] = 'With best compliments from: Singh & Pariwar, Relatives & Friends';

$inv->theme_settings = $theme;
$inv->save();

WeddingEvent::where('invitation_id', $inv->id)->delete();

WeddingEvent::create([
    'invitation_id' => $inv->id,
    'title' => 'Haldi Utsav (हल्दी उत्सव)',
    'event_type' => 'haldi',
    'event_date' => '2026-11-28 10:00:00',
    'start_time' => '10:00 AM',
    'end_time' => '02:00 PM',
    'venue_name' => 'Shiv Bajrang Hotel, Thawe',
    'venue_address' => 'Near Thawe Mandir, Gopalganj, Bihar',
    'description' => 'Auspicious turmeric ceremony filled with love, laughter, golden marigold petals, and traditional folk music.',
    'dress_code' => 'Peele Vastra / Festive Yellow & Ochre',
    'calendar_link' => 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Haldi+Utsav+-+Amit+and+Sweety&dates=20261128T043000Z/20261128T083000Z',
    'color_accent' => '#D97706',
    'order_index' => 1
]);

WeddingEvent::create([
    'invitation_id' => $inv->id,
    'title' => 'Mehndi & Sangeet Raas (मेंहदी एवं संगीत)',
    'event_type' => 'mehendi',
    'event_date' => '2026-11-29 17:00:00',
    'start_time' => '05:00 PM',
    'end_time' => '11:00 PM',
    'venue_name' => 'Shiv Bajrang Hotel, Thawe',
    'venue_address' => 'Grand Banquet Hall, Shiv Bajrang Hotel, Thawe, Gopalganj, Bihar',
    'description' => 'An enchanting evening of intricate henna designs, soulful songs, dance performances, and family celebrations.',
    'dress_code' => 'Royal Green, Emerald & Festive Ethnic',
    'calendar_link' => 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Mehndi+and+Sangeet+-+Amit+and+Sweety&dates=20261129T113000Z/20261129T173000Z',
    'color_accent' => '#047857',
    'order_index' => 2
]);

WeddingEvent::create([
    'invitation_id' => $inv->id,
    'title' => 'Shubh Vivah (शुभ विवाह एवं पाणिग्रहण)',
    'event_type' => 'wedding',
    'event_date' => '2026-11-30 19:00:00',
    'start_time' => '07:00 PM',
    'end_time' => '02:00 AM',
    'venue_name' => 'Shiv Bajrang Hotel, Thawe',
    'venue_address' => 'Royal Vivah Mandap, Shiv Bajrang Hotel, Thawe, Gopalganj, Bihar',
    'description' => 'The auspicious Vedic wedding rituals, Jaimala, and the seven sacred vows (Saat Phere) around the holy fire.',
    'dress_code' => 'Traditional Royal Attire — Deep Maroon, Crimson Red & Antique Gold',
    'calendar_link' => 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Shubh+Vivah+-+Amit+and+Sweety&dates=20261130T133000Z/20261130T203000Z',
    'color_accent' => '#881337',
    'order_index' => 3
]);

WeddingEvent::create([
    'invitation_id' => $inv->id,
    'title' => 'Grand Reception & Aashirwad (प्रीतिभोज एवं आशीर्वाद)',
    'event_type' => 'reception',
    'event_date' => '2026-12-01 19:30:00',
    'start_time' => '07:30 PM',
    'end_time' => '11:30 PM',
    'venue_name' => 'Shiv Bajrang Hotel, Thawe',
    'venue_address' => 'Banquet Lawn, Shiv Bajrang Hotel, Thawe, Gopalganj, Bihar',
    'description' => 'An evening of celebration, banquet dining, and warm blessings for the newly wed couple.',
    'dress_code' => 'Royal Ethnic or Formal Regalia',
    'calendar_link' => 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Grand+Reception+-+Amit+and+Sweety&dates=20261201T140000Z/20261201T180000Z',
    'color_accent' => '#B45309',
    'order_index' => 4
]);

$venue = VenueTravel::firstOrNew(['invitation_id' => $inv->id]);
$venue->venue_name = 'Shiv Bajrang Hotel, Thawe';
$venue->venue_sub_heading = 'Auspicious Heritage Destination';
$venue->address = 'Near Thawe Mandir, Gopalganj, Bihar 841428';
$venue->map_directions_url = 'https://maps.google.com/?q=Shiv+Bajrang+Hotel+Thawe+Gopalganj+Bihar';
$venue->parking_info = 'Valet parking available for all wedding guests inside the hotel premises.';
$venue->accommodation_info = 'Rooms and suites arranged for outstation family and guests at Shiv Bajrang Hotel.';
$venue->transport_info = 'Pick-up and shuttle services available from Gopalganj Railway Station and Siwan Junction.';
$venue->contact_name = 'Singh Family Hospitality Desk';
$venue->contact_phone = '+91 98765 43210';
$venue->contact_email = 'hospitality@weddinguniverse.luxury';
$venue->save();

echo "SUCCESSFULLY_SEEDED_INDIAN_WEDDING\n";
