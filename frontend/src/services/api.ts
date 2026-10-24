import axios from 'axios';
import type { InvitationData, RsvpSubmission } from '../types/wedding';
import { DEFAULT_BRIDE_FAMILY } from '../types/wedding';

// Fallback demo data so user experience is guaranteed immediately even before server ping
export const DEFAULT_DEMO_INVITATION: InvitationData = {
  id: 1,
  slug: 'amit-sweety',
  title: 'Shubh Vivah — Sweety Singh & Amit Kumar Singh',
  partner_one: 'Sweety Singh',
  partner_two: 'Amit Kumar Singh',
  wedding_date: '2026-11-30 19:00:00',
  wedding_timezone: 'Asia/Kolkata',
  venue_city: 'Shiv Bajrang Hotel, Thawe',
  tagline: 'Two Hearts. One Extraordinary Universe.',
  hero_image_url: '/images/amit_sweety_hero.jpg',
  celestial_quote: 'With the divine blessings of Lord Ganesha and our beloved elders, we begin our lifelong sacred journey.',
  audio_title: 'Shehnai & Sitar — Auspicious Vivah Dhun',
  audio_url: 'https://assets.mixkit.co/music/preview/mixkit-serene-view-443.mp3',
  is_published: true,
  theme_settings: {
    primary_color: '#EAB308',
    secondary_color: '#CA8A04',
    accent_color: '#FACC15',
    bg_dark: '#FEFCE8',
    bg_light: '#FFFDF0',
    ganesh_image_url: '/images/ganesh_ji.jpg',
    ganesh_shloka_hindi: '॥ श्री गणेशाय नमः ॥',
    ganesh_mantra: 'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥',
    family_invitation_text: 'Together with their families, cordially invite you to share in the joy and auspicious blessings of their holy matrimonial union.',
    auspicious_welcome: 'मंगलम् भगवान विष्णुः, मंगलम् गरुड़ध्वजः। मंगलम् पुण्डरीकाक्षः, मंगलाय तनो हरिः॥',
    compliments_from: 'With best compliments from: Singh & Pariwar, Relatives & Friends',
    bride_details: {
      name: 'Sweety Singh',
      title: 'The Bride (वधू)',
      qualification: 'M.Sc / MBA in Financial Management',
      profession: 'Financial Analyst & Creative Specialist',
      father_name: 'Shri Dharmendra Singh',
      mother_name: 'Smt. Sunita Devi',
      native_place: 'Thawe, Gopalganj, Bihar',
      about: 'Graceful, intellectual, and radiant. An accomplished professional who brings joy, elegance, and harmony.',
      photo_url: '/images/amit_sweety_hero.jpg',
    },
    groom_details: {
      name: 'Amit Kumar Singh',
      title: 'The Groom (वर)',
      qualification: 'B.Tech in Computer Science / Senior Software Architect',
      profession: 'Senior Technology Consultant & Entrepreneur',
      father_name: 'Shri Ramendra Singh',
      mother_name: 'Smt. Shanti Devi',
      native_place: 'Thawe, Gopalganj, Bihar',
      about: 'Visionary and rooted in tradition. Leading digital technologies while cherishing deep cultural values.',
      photo_url: '/images/amit_sweety_hero.jpg',
    },
    bride_family: DEFAULT_BRIDE_FAMILY,
  },
  events: [
    {
      id: 1,
      invitation_id: 1,
      title: 'Haldi Utsav (हल्दी उत्सव)',
      event_type: 'haldi',
      event_date: '2026-11-28',
      start_time: '10:00 AM',
      end_time: '02:00 PM',
      venue_name: 'Shiv Bajrang Hotel, Thawe',
      venue_address: 'Near Thawe Mandir, Gopalganj, Bihar',
      description: 'Auspicious turmeric ceremony filled with love, laughter, golden marigold petals, and traditional folk music.',
      dress_code: 'Peele Vastra / Festive Yellow & Ochre',
      calendar_link: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Haldi+Utsav+-+Amit+and+Sweety&dates=20261128T043000Z/20261128T083000Z',
      color_accent: '#D97706',
      order_index: 1,
    },
    {
      id: 2,
      invitation_id: 1,
      title: 'Mehndi & Sangeet Raas (मेंहदी एवं संगीत)',
      event_type: 'mehendi',
      event_date: '2026-11-29',
      start_time: '05:00 PM',
      end_time: '11:00 PM',
      venue_name: 'Shiv Bajrang Hotel, Thawe',
      venue_address: 'Grand Banquet Hall, Shiv Bajrang Hotel, Thawe, Gopalganj, Bihar',
      description: 'An enchanting evening of intricate henna designs, soulful songs, dance performances, and festive dinner.',
      dress_code: 'Royal Green, Emerald & Festive Ethnic',
      calendar_link: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Mehndi+and+Sangeet+-+Amit+and+Sweety&dates=20261129T113000Z/20261129T173000Z',
      color_accent: '#047857',
      order_index: 2,
    },
    {
      id: 3,
      invitation_id: 1,
      title: 'Shubh Vivah (शुभ विवाह एवं पाणिग्रहण)',
      event_type: 'wedding',
      event_date: '2026-11-30',
      start_time: '07:00 PM',
      end_time: '02:00 AM',
      venue_name: 'Shiv Bajrang Hotel, Thawe',
      venue_address: 'Royal Vivah Mandap, Shiv Bajrang Hotel, Thawe, Gopalganj, Bihar',
      description: 'The auspicious Vedic wedding rituals, Jaimala, and seven sacred vows (Saat Phere) around the holy fire.',
      dress_code: 'Traditional Royal Attire — Deep Maroon, Crimson Red & Antique Gold',
      calendar_link: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Shubh+Vivah+-+Amit+and+Sweety&dates=20261130T133000Z/20261130T203000Z',
      color_accent: '#881337',
      order_index: 3,
    },
    {
      id: 4,
      invitation_id: 1,
      title: 'Grand Reception & Aashirwad (प्रीतिभोज)',
      event_type: 'reception',
      event_date: '2026-12-01',
      start_time: '07:30 PM',
      end_time: '11:30 PM',
      venue_name: 'Shiv Bajrang Hotel, Thawe',
      venue_address: 'Banquet Lawn, Shiv Bajrang Hotel, Thawe, Gopalganj, Bihar',
      description: 'An evening of celebration, banquet dining, and warm blessings for the newly wed couple.',
      dress_code: 'Royal Ethnic or Formal Regalia',
      calendar_link: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Grand+Reception+-+Amit+and+Sweety&dates=20261201T140000Z/20261201T180000Z',
      color_accent: '#B45309',
      order_index: 4,
    },
  ],
  stories: [
    {
      id: 1,
      invitation_id: 1,
      title: 'The Stargazer Meet',
      date_label: 'Autumn 2021',
      subtitle: 'Oxford Astronomy Library, London',
      description: 'Surrounded by centuries-old celestial maps, Devansh dropped his notes on Keplerian orbits. Samaira picked them up, smiled, and noticed he was looking at the exact star constellation she was studying.',
      image_url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
      quote: '“We didn’t just meet; our orbits simply collapsed into one center of gravity.”',
      order_index: 1,
    },
    {
      id: 2,
      invitation_id: 1,
      title: 'Chai Over the Ghats',
      date_label: 'Winter 2023',
      subtitle: 'Varanasi at Dawn',
      description: 'On the silent mist-laden ghats of Kashi, watching hundreds of floating earthen diyas drift into the sacred river, they made an unspoken pact to wander every corner of this world hand-in-hand.',
      image_url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
      quote: '“Some moments are written in ancient ink, long before our hearts remember them.”',
      order_index: 2,
    },
    {
      id: 3,
      invitation_id: 1,
      title: 'The Palace of Whispers',
      date_label: 'Spring 2025',
      subtitle: 'Amer Fort, Jaipur',
      description: 'Inside the Sheesh Mahal, where a single flame reflects across a million mirrors, Devansh knelt down with an heirloom diamond ring crafted in antique gold. Her quiet “Yes” echoed into the night.',
      image_url: 'https://images.unsplash.com/photo-1609151162377-794fa6ec4a39?auto=format&fit=crop&w=1200&q=80',
      quote: '“In a room of a million reflections, my eyes only searched for one.”',
      order_index: 3,
    },
    {
      id: 4,
      invitation_id: 1,
      title: 'The Eternal Vow',
      date_label: 'November 2026',
      subtitle: 'Lake Pichola, Udaipur',
      description: 'Now, beneath the vermilion moon and celestial palace arches, we invite you to stand witness as we weave our two families and destinies together into eternity.',
      image_url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
      quote: '“Our universe begins where love transcends the stars.”',
      order_index: 4,
    },
  ],
  gallery: [
    {
      id: 1,
      invitation_id: 1,
      title: 'The Royal Portrait',
      caption: 'Devansh & Samaira at the City Palace Pavilion',
      media_type: 'image',
      url: 'https://images.unsplash.com/photo-1609151162377-794fa6ec4a39?auto=format&fit=crop&w=1200&q=80',
      thumbnail_url: 'https://images.unsplash.com/photo-1609151162377-794fa6ec4a39?auto=format&fit=crop&w=600&q=80',
      category: 'couple',
      order_index: 1,
      is_featured: true,
    },
    {
      id: 2,
      invitation_id: 1,
      title: 'Golden Hour Romance',
      caption: 'A gentle breeze over Lake Pichola',
      media_type: 'image',
      url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
      thumbnail_url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
      category: 'couple',
      order_index: 2,
      is_featured: true,
    },
    {
      id: 3,
      invitation_id: 1,
      title: 'Botanical Heena Artistry',
      caption: 'Intricate bridal henna and heirloom polki kundan',
      media_type: 'image',
      url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
      thumbnail_url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80',
      category: 'ceremonies',
      order_index: 3,
      is_featured: false,
    },
    {
      id: 4,
      invitation_id: 1,
      title: 'Royal Jharokhas & Archways',
      caption: 'Palatial stone craftsmanship in antique gold light',
      media_type: 'image',
      url: 'https://images.unsplash.com/photo-1599818816933-728b12f6797f?auto=format&fit=crop&w=1200&q=80',
      thumbnail_url: 'https://images.unsplash.com/photo-1599818816933-728b12f6797f?auto=format&fit=crop&w=600&q=80',
      category: 'cinematic',
      order_index: 4,
      is_featured: true,
    },
    {
      id: 5,
      invitation_id: 1,
      title: 'Crimson Rose Mandap',
      caption: 'Floral canopy waiting for the sacred Agni',
      media_type: 'image',
      url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
      thumbnail_url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
      category: 'ceremonies',
      order_index: 5,
      is_featured: false,
    },
    {
      id: 6,
      invitation_id: 1,
      title: 'Moonlit Palace Silhouette',
      caption: 'Lake palace glimmering against the vermilion night',
      media_type: 'image',
      url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
      thumbnail_url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80',
      category: 'cinematic',
      order_index: 6,
      is_featured: true,
    },
  ],
  venue_travel: {
    id: 1,
    invitation_id: 1,
    venue_name: 'Shiv Bajrang Hotel, Thawe',
    venue_sub_heading: 'Auspicious Heritage Destination & Sacred Celebration Venue',
    address: 'Near Thawe Mandir, Gopalganj, Bihar 841428',
    map_embed_url: '',
    map_directions_url: 'https://maps.google.com/?q=Shiv+Bajrang+Hotel+Thawe+Gopalganj+Bihar',
    parking_info: 'Valet and dedicated guest parking available inside the hotel premises.',
    accommodation_info: 'Well-appointed rooms and suites reserved for wedding family and outstation guests at Shiv Bajrang Hotel.',
    transport_info: 'Complimentary shuttle and pick-up services coordinated from Gopalganj Railway Station and Siwan Junction.',
    contact_name: 'Singh Family Hospitality Desk',
    contact_phone: '+91 98765 43210',
    contact_email: 'hospitality@weddinguniverse.luxury',
  },
};

const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

// Attach bearer token if present
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('universe_admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const weddingApi = {
  // Public
  async getInvitation(slug: string = 'devansh-samaira'): Promise<InvitationData> {
    try {
      const res = await apiClient.get(`/invitations/${slug}`);
      if (res.data?.success && res.data.data) {
        return res.data.data;
      }
      return DEFAULT_DEMO_INVITATION;
    } catch (err) {
      console.warn('API fetch fell back to default demo invitation:', err);
      return DEFAULT_DEMO_INVITATION;
    }
  },

  async submitRsvp(slug: string, data: RsvpSubmission) {
    const res = await apiClient.post(`/invitations/${slug}/rsvp`, data);
    return res.data;
  },

  // Admin Auth
  async login(credentials: { email: string; password: string }) {
    const res = await apiClient.post('/admin/login', credentials);
    if (res.data?.token) {
      localStorage.setItem('universe_admin_token', res.data.token);
    }
    return res.data;
  },

  async logout() {
    try {
      await apiClient.post('/admin/logout');
    } finally {
      localStorage.removeItem('universe_admin_token');
    }
  },

  async getMe() {
    const res = await apiClient.get('/admin/me');
    return res.data;
  },

  // Admin Operations
  async getDashboard() {
    const res = await apiClient.get('/admin/dashboard');
    return res.data;
  },

  async getAdminInvitation() {
    const res = await apiClient.get('/admin/invitation');
    return res.data;
  },

  async updateAdminInvitation(data: Partial<InvitationData> | FormData) {
    if (data instanceof FormData) {
      const res = await apiClient.post('/admin/invitation', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return res.data;
    } else {
      const res = await apiClient.put('/admin/invitation', data);
      return res.data;
    }
  },

  // Events CRUD
  async getAdminEvents() {
    const res = await apiClient.get('/admin/events');
    return res.data;
  },

  async saveAdminEvent(event: any) {
    if (event.id) {
      const res = await apiClient.put(`/admin/events/${event.id}`, event);
      return res.data;
    } else {
      const res = await apiClient.post('/admin/events', event);
      return res.data;
    }
  },

  async deleteAdminEvent(id: number) {
    const res = await apiClient.delete(`/admin/events/${id}`);
    return res.data;
  },

  // Stories CRUD
  async getAdminStories() {
    const res = await apiClient.get('/admin/stories');
    return res.data;
  },

  async saveAdminStory(story: any) {
    if (story.id) {
      const res = await apiClient.put(`/admin/stories/${story.id}`, story);
      return res.data;
    } else {
      const res = await apiClient.post('/admin/stories', story);
      return res.data;
    }
  },

  async deleteAdminStory(id: number) {
    const res = await apiClient.delete(`/admin/stories/${id}`);
    return res.data;
  },

  // Gallery CRUD
  async getAdminGallery() {
    const res = await apiClient.get('/admin/gallery');
    return res.data;
  },

  async addAdminGallery(media: any) {
    const res = await apiClient.post('/admin/gallery', media);
    return res.data;
  },

  async deleteAdminGallery(id: number) {
    const res = await apiClient.delete(`/admin/gallery/${id}`);
    return res.data;
  },

  // Venue Travel
  async getAdminVenue() {
    const res = await apiClient.get('/admin/venue-travel');
    return res.data;
  },

  async updateAdminVenue(data: any) {
    const res = await apiClient.put('/admin/venue-travel', data);
    return res.data;
  },

  // RSVPs
  async getAdminRsvps(params?: { status?: string; search?: string; page?: number }) {
    const res = await apiClient.get('/admin/rsvps', { params });
    return res.data;
  },

  async deleteAdminRsvp(id: number) {
    const res = await apiClient.delete(`/admin/rsvps/${id}`);
    return res.data;
  },
};
