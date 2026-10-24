export interface WeddingEventData {
  id: number;
  invitation_id: number;
  title: string;
  event_type: 'haldi' | 'mehendi' | 'sangeet' | 'wedding' | 'reception' | 'other';
  event_date: string;
  start_time: string;
  end_time?: string;
  venue_name: string;
  venue_address?: string;
  description?: string;
  dress_code?: string;
  calendar_link?: string;
  color_accent?: string;
  order_index: number;
}

export interface StoryMilestoneData {
  id: number;
  invitation_id: number;
  title: string;
  date_label: string;
  subtitle?: string;
  description: string;
  image_url?: string;
  quote?: string;
  order_index: number;
}

export interface GalleryMediaData {
  id: number;
  invitation_id: number;
  title?: string;
  caption?: string;
  media_type: 'image' | 'video';
  url: string;
  thumbnail_url?: string;
  category: 'all' | 'couple' | 'ceremonies' | 'cinematic';
  order_index: number;
  is_featured: boolean;
}

export interface VenueTravelData {
  id?: number;
  invitation_id?: number;
  venue_name: string;
  venue_sub_heading?: string;
  address: string;
  map_embed_url?: string;
  map_directions_url?: string;
  parking_info?: string;
  accommodation_info?: string;
  transport_info?: string;
  contact_name?: string;
  contact_phone?: string;
  contact_email?: string;
}

export interface PersonDetails {
  name: string;
  title?: string;
  qualification: string;
  profession: string;
  father_name: string;
  mother_name: string;
  native_place?: string;
  about?: string;
  photo_url?: string;
}

export interface FamilyMember {
  id: string;
  name: string;
  relation: string; // e.g. "दादा जी - दादी जी", "माता-पिता", "चाचा जी", "भ्राता", etc.
  category?: 'elders' | 'parents' | 'uncles_aunts' | 'siblings' | 'darsanabhilashi' | 'other';
  note?: string; // blessing, profession, or native place
}

export const DEFAULT_BRIDE_FAMILY: FamilyMember[] = [
  {
    id: 'bf-1',
    name: 'स्व. श्री रामचन्द्र सिंह एवं श्रीमती देवकी देवी',
    relation: 'दादा जी - दादी जी (Paternal Grandparents)',
    category: 'elders',
    note: 'परम पूज्य पूर्वज एवं कुलदेवता तुल्य शुभाशीष',
  },
  {
    id: 'bf-2',
    name: 'स्व. श्री रामवृक्ष सिंह एवं श्रीमती प्रभावती देवी',
    relation: 'नाना जी - नानी जी (Maternal Grandparents)',
    category: 'elders',
    note: 'सदा स्मरणीय मंगलमय शुभाशीष',
  },
  {
    id: 'bf-3',
    name: 'श्री धर्मेन्द्र सिंह एवं श्रीमती सुनीता देवी',
    relation: 'माता-पिता (Parents)',
    category: 'parents',
    note: 'वधू के परम स्नेही माता एवं पिता (थावे, गोपालगंज)',
  },
  {
    id: 'bf-4',
    name: 'श्री बीरेन्द्र सिंह एवं श्रीमती रेखा देवी',
    relation: 'चाचा जी - चाची जी (Paternal Uncle & Aunt)',
    category: 'uncles_aunts',
    note: 'सस्नेह शुभाशीष',
  },
  {
    id: 'bf-5',
    name: 'श्री जितेन्द्र सिंह एवं श्रीमती मीना देवी',
    relation: 'चाचा जी - चाची जी (Paternal Uncle & Aunt)',
    category: 'uncles_aunts',
    note: 'सस्नेह शुभाशीष',
  },
  {
    id: 'bf-6',
    name: 'श्री संजय सिंह एवं श्रीमती उर्मिला देवी',
    relation: 'मामा जी - मामी जी (Maternal Uncle & Aunt)',
    category: 'uncles_aunts',
    note: 'मातृपक्ष मंगलकामनाएं',
  },
  {
    id: 'bf-7',
    name: 'राहुल सिंह एवं अभिषेक सिंह',
    relation: 'भ्राता (Brothers)',
    category: 'siblings',
    note: 'स्नेही भाई',
  },
  {
    id: 'bf-8',
    name: 'समस्त सिंह परिवार एवं स्नेहीजन',
    relation: 'दर्शनाभिलाषी / स्वागताकांक्षी (Welcoming Kinsfolk)',
    category: 'darsanabhilashi',
    note: 'थावे, गोपालगंज (बिहार)',
  },
];

export interface ThemeSettings {
  primary_color?: string;
  secondary_color?: string;
  accent_color?: string;
  bg_dark?: string;
  bg_light?: string;
  font_serif?: string;
  font_sans?: string;
  ganesh_image_url?: string;
  ganesh_shloka_hindi?: string;
  ganesh_mantra?: string;
  bride_details?: PersonDetails;
  groom_details?: PersonDetails;
  bride_family?: FamilyMember[];
  family_invitation_text?: string;
  auspicious_welcome?: string;
  compliments_from?: string;
}

export interface InvitationData {
  id: number;
  slug: string;
  title: string;
  partner_one: string;
  partner_two: string;
  wedding_date: string;
  wedding_timezone: string;
  venue_city: string;
  tagline: string;
  hero_image_url?: string;
  celestial_quote?: string;
  audio_title?: string;
  audio_url?: string;
  is_published: boolean;
  theme_settings?: ThemeSettings;
  events: WeddingEventData[];
  stories: StoryMilestoneData[];
  gallery: GalleryMediaData[];
  venue_travel?: VenueTravelData;
}

export interface RsvpSubmission {
  guest_name: string;
  email?: string;
  phone?: string;
  attendance_status: 'attending' | 'declined' | 'tentative';
  guest_count: number;
  selected_events: string[];
  dietary_notes?: string;
  message?: string;
}

export interface AdminStats {
  total_rsvps: number;
  attending_rsvps: number;
  declined_rsvps: number;
  tentative_rsvps: number;
  total_attending_guests: number;
  events_count: number;
  gallery_count: number;
  stories_count: number;
}
