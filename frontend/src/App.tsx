import React, { useState, useEffect } from 'react';
import { CelestialUniverseCanvas } from './components/CelestialUniverseCanvas';
import { OpeningEnvelopeIntro } from './components/OpeningEnvelopeIntro';
import { CinematicHero } from './components/CinematicHero';
import { CoupleProfileSection } from './components/CoupleProfileSection';
import { BrideFamilySection } from './components/BrideFamilySection';
import { CoupleStorySection } from './components/CoupleStorySection';
import { WeddingEventsSection } from './components/WeddingEventsSection';
import { VenueTravelSection } from './components/VenueTravelSection';
import { RsvpSection } from './components/RsvpSection';
import { CinematicGallerySection } from './components/CinematicGallerySection';
import { ClosingSceneSection } from './components/ClosingSceneSection';
import { AudioController } from './components/AudioController';
import { AdminPanel } from './components/AdminPanel';
import { weddingApi, DEFAULT_DEMO_INVITATION } from './services/api';
import type { InvitationData } from './types/wedding';
import { Menu, X, Users, Calendar, MapPin, Heart, Image } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const App: React.FC = () => {
  const [invitation, setInvitation] = useState<InvitationData>(DEFAULT_DEMO_INVITATION);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Intro state: check session storage so it doesn't repeat unnecessarily
  const [hasOpenedEnvelope, setHasOpenedEnvelope] = useState<boolean>(() => {
    return sessionStorage.getItem('universe_envelope_opened') === 'true';
  });

  const [audioAutoplayTrigger, setAudioAutoplayTrigger] = useState<boolean>(false);

  // Admin View State: supports #admin or /admin path
  const [isAdminView, setIsAdminView] = useState<boolean>(() => {
    return (
      window.location.pathname.startsWith('/admin') ||
      window.location.hash === '#admin'
    );
  });

  // Handle URL hash changes
  useEffect(() => {
    const checkHash = () => {
      if (window.location.pathname.startsWith('/admin') || window.location.hash === '#admin') {
        setIsAdminView(true);
      } else {
        setIsAdminView(false);
      }
    };

    window.addEventListener('popstate', checkHash);
    window.addEventListener('hashchange', checkHash);
    return () => {
      window.removeEventListener('popstate', checkHash);
      window.removeEventListener('hashchange', checkHash);
    };
  }, []);

  // Fetch live invitation from Laravel API
  useEffect(() => {
    const fetchLiveInvitation = async () => {
      try {
        const pathParts = window.location.pathname.split('/').filter(Boolean);
        const slug = pathParts[0] === 'invite' && pathParts[1] ? pathParts[1] : 'devansh-samaira';
        const data = await weddingApi.getInvitation(slug);
        setInvitation(data);
      } catch (err) {
        console.warn('Using default demo invitation data');
      }
    };

    fetchLiveInvitation();
  }, []);

  const handleOpenInvitation = () => {
    setHasOpenedEnvelope(true);
    sessionStorage.setItem('universe_envelope_opened', 'true');
    setAudioAutoplayTrigger(true); // explicit user interaction trigger
  };

  const handleRevisitInvitation = () => {
    sessionStorage.removeItem('universe_envelope_opened');
    setHasOpenedEnvelope(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // If Admin view is active
  if (isAdminView) {
    return (
      <AdminPanel
        onBackToGuestView={() => {
          setIsAdminView(false);
          window.location.hash = '';
          if (window.location.pathname.startsWith('/admin')) {
            window.history.pushState({}, '', '/');
          }
        }}
      />
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#FEFCE8] via-[#FFFDF0] to-[#FEF9C3] text-[#713F12] font-body selection:bg-[#FACC15] selection:text-[#713F12]">
      {/* Dynamic Celestial Background Canvas (Warm Saffron Stars & Golden Marigold Petals) */}
      <CelestialUniverseCanvas interactive={true} />

      {/* Opening Envelope 3D Intro */}
      {!hasOpenedEnvelope && (
        <OpeningEnvelopeIntro invitation={invitation} onOpen={handleOpenInvitation} />
      )}

      {/* Floating Audio Controller (Configurable from Admin Panel) */}
      <AudioController
        audioUrl={invitation.audio_url}
        audioTitle={invitation.audio_title}
        autoPlayTrigger={audioAutoplayTrigger}
        showWidget={invitation.theme_settings?.show_audio_controls !== false}
      />

      {/* Top Floating Mini Header */}
      <nav className="fixed top-0 inset-x-0 z-30 backdrop-blur-md bg-[#FFFDF5]/95 border-b border-[#EAB308]/40 shadow-sm">
        <div className="px-4 sm:px-8 py-3 flex items-center justify-between">
          {/* Mobile & Desktop Branding: Swastik + Sweety & Amit */}
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] font-semibold text-[#854D0E]">
            <span className="text-[#EAB308] text-base leading-none">卐</span>
            <span className="font-title font-bold text-sm tracking-wide text-[#713F12]">
              Sweety & Amit
            </span>
          </div>

          {/* Desktop Navigation Links (hidden on mobile) */}
          <div className="hidden md:flex items-center gap-5 text-xs font-semibold tracking-wider uppercase">
            <button
              onClick={() => scrollToSection('profile-section')}
              className="text-[#713F12]/80 hover:text-[#CA8A04] transition-colors cursor-pointer"
            >
              Bride & Groom
            </button>
            <button
              onClick={() => scrollToSection('bride-family-section')}
              className="text-[#713F12]/80 hover:text-[#CA8A04] transition-colors cursor-pointer"
            >
              Bride's Family
            </button>
            <button
              onClick={() => scrollToSection('events-section')}
              className="text-[#713F12]/80 hover:text-[#CA8A04] transition-colors cursor-pointer"
            >
              Ceremonies
            </button>
            <button
              onClick={() => scrollToSection('venue-section')}
              className="text-[#713F12]/80 hover:text-[#CA8A04] transition-colors cursor-pointer"
            >
              Venue
            </button>
            <button
              onClick={() => scrollToSection('gallery-section')}
              className="text-[#713F12]/80 hover:text-[#CA8A04] transition-colors cursor-pointer"
            >
              Gallery
            </button>

            <button
              onClick={() => scrollToSection('rsvp-section')}
              className="px-4 py-1.5 rounded-full bg-gradient-to-r from-[#FACC15] via-[#EAB308] to-[#CA8A04] text-[#451A03] border border-[#FDE047] shadow-[0_2px_12px_rgba(234,179,8,0.35)] hover:shadow-[0_4px_18px_rgba(234,179,8,0.5)] transition-all cursor-pointer text-[11px] font-bold"
            >
              RSVP
            </button>
          </div>

          {/* Mobile Menu Toggle Button (shown ONLY on mobile) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-lg bg-[#FEFCE8] border border-[#EAB308]/70 text-[#713F12] hover:bg-[#FEF9C3] transition-colors focus:outline-none cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#713F12]" /> : <Menu className="w-5 h-5 text-[#713F12]" />}
          </button>
        </div>

        {/* Mobile Slide-down Drawer for all navigation links & RSVP */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden bg-[#FFFDF7]/98 border-t border-[#EAB308]/30 shadow-xl px-5 py-4"
            >
              <div className="flex flex-col gap-2.5">
                <button
                  onClick={() => {
                    scrollToSection('profile-section');
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#FEFCE8] text-[#713F12] font-semibold text-xs tracking-wider uppercase text-left transition-colors cursor-pointer"
                >
                  <Users className="w-4 h-4 text-[#CA8A04]" />
                  <span>Bride & Groom (परिचय)</span>
                </button>

                <button
                  onClick={() => {
                    scrollToSection('bride-family-section');
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#FEFCE8] text-[#713F12] font-semibold text-xs tracking-wider uppercase text-left transition-colors cursor-pointer"
                >
                  <Heart className="w-4 h-4 text-[#EA580C]" />
                  <span>Bride's Family (वधू पक्ष परिवार)</span>
                </button>

                <button
                  onClick={() => {
                    scrollToSection('events-section');
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#FEFCE8] text-[#713F12] font-semibold text-xs tracking-wider uppercase text-left transition-colors cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-[#CA8A04]" />
                  <span>Ceremonies (कार्यक्रम)</span>
                </button>

                <button
                  onClick={() => {
                    scrollToSection('venue-section');
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#FEFCE8] text-[#713F12] font-semibold text-xs tracking-wider uppercase text-left transition-colors cursor-pointer"
                >
                  <MapPin className="w-4 h-4 text-[#EA580C]" />
                  <span>Venue & Travel (विवाह स्थल)</span>
                </button>

                <button
                  onClick={() => {
                    scrollToSection('story-section');
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#FEFCE8] text-[#713F12] font-semibold text-xs tracking-wider uppercase text-left transition-colors cursor-pointer"
                >
                  <Heart className="w-4 h-4 text-[#EA580C]" />
                  <span>Our Story (प्रेम कथा)</span>
                </button>

                <button
                  onClick={() => {
                    scrollToSection('gallery-section');
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#FEFCE8] text-[#713F12] font-semibold text-xs tracking-wider uppercase text-left transition-colors cursor-pointer"
                >
                  <Image className="w-4 h-4 text-[#CA8A04]" />
                  <span>Royal Gallery (फोटो गैलरी)</span>
                </button>

                <div className="pt-2 border-t border-[#EAB308]/30">
                  <button
                    onClick={() => {
                      scrollToSection('rsvp-section');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-2.5 rounded-full bg-gradient-to-r from-[#FACC15] via-[#EAB308] to-[#CA8A04] text-[#451A03] font-bold text-xs tracking-widest uppercase border border-[#FEF08A] shadow-[0_2px_12px_rgba(234,179,8,0.35)] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Send Blessings (RSVP)</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Guest Journey Flow */}
      <main className="relative z-10 pt-14 sm:pt-16">
        {/* Cinematic Hero Header with Ganesha Blessing (Secret Admin Gateway on tap) & Couple Picture */}
        <CinematicHero
          invitation={invitation}
          onExploreProfiles={() => scrollToSection('profile-section')}
          onViewEvents={() => scrollToSection('events-section')}
          onRsvp={() => scrollToSection('rsvp-section')}
          onOpenAdmin={() => {
            window.location.hash = 'admin';
            setIsAdminView(true);
          }}
        />

        {/* Bride & Groom Detailed Profile & Qualifications Section (Bride First) */}
        <CoupleProfileSection invitation={invitation} />

        {/* Bride's Family Members Section */}
        <BrideFamilySection invitation={invitation} />

        {/* Wedding Events / Ceremonies Section */}
        <WeddingEventsSection events={invitation.events || []} />

        {/* Venue & Travel Logistics Section */}
        <VenueTravelSection venue={invitation.venue_travel} />

        {/* RSVP Section */}
        <RsvpSection invitation={invitation} />

        {/* Couple Story Section */}
        <CoupleStorySection stories={invitation.stories || []} />

        {/* Cinematic Gallery Section */}
        <CinematicGallerySection gallery={invitation.gallery || []} />

        {/* Closing Scene Section */}
        <ClosingSceneSection
          invitation={invitation}
          onRevisitInvitation={handleRevisitInvitation}
        />
      </main>
    </div>
  );
};
