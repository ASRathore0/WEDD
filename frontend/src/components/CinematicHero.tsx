import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Sparkles, ChevronDown, Heart } from 'lucide-react';
import type { InvitationData } from '../types/wedding';

interface CinematicHeroProps {
  invitation: InvitationData;
  onExploreProfiles?: () => void;
  onViewEvents: () => void;
  onRsvp?: () => void;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export const CinematicHero: React.FC<CinematicHeroProps> = ({
  invitation,
  onExploreProfiles,
  onViewEvents,
  onRsvp,
}) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });

  useEffect(() => {
    const calculateCountdown = () => {
      const target = new Date(invitation.wedding_date).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    };

    calculateCountdown();
    const timer = setInterval(calculateCountdown, 1000);
    return () => clearInterval(timer);
  }, [invitation.wedding_date]);

  const weddingDateFormatted = new Date(invitation.wedding_date).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const heroImage = invitation.hero_image_url || '/images/amit_sweety_hero.jpg';
  const theme = invitation.theme_settings || {};
  const ganeshImage = theme.ganesh_image_url || '/images/ganesh_ji.jpg';
  const ganeshShlokaHindi = theme.ganesh_shloka_hindi || '॥ श्री गणेशाय नमः ॥';
  const ganeshMantra = theme.ganesh_mantra || 'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥';

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-between text-center px-3 sm:px-6 pt-6 sm:pt-14 pb-10 sm:pb-12 overflow-hidden bg-gradient-to-b from-[#FEFCE8] via-[#FFFDF0] to-[#FEF9C3]">
      {/* Traditional Auspicious Turmeric Background Accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Radiant Turmeric & Kesar Saffron Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[750px] h-[750px] rounded-full bg-[radial-gradient(circle,rgba(250,204,21,0.25)_0%,rgba(234,179,8,0.12)_45%,transparent_75%)] blur-3xl pointer-events-none" />
        
        {/* Auspicious Traditional Corner Ornaments */}
        <div className="absolute top-2 left-2 sm:top-6 sm:left-6 w-12 h-12 sm:w-20 sm:h-20 border-t-2 border-l-2 border-[#EAB308]/60 rounded-tl-xl sm:rounded-tl-2xl pointer-events-none" />
        <div className="absolute top-2 right-2 sm:top-6 sm:right-6 w-12 h-12 sm:w-20 sm:h-20 border-t-2 border-r-2 border-[#EAB308]/60 rounded-tr-xl sm:rounded-tr-2xl pointer-events-none" />
      </div>

      {/* 1. Divine Lord Ganesha Invocatory Blessing Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="relative z-20 flex flex-col items-center pt-2 max-w-xl mx-auto"
      >
        {/* Auspicious Lord Ganesha Medallion */}
        <div className="relative mb-2 sm:mb-3 group">
          <div className="absolute -inset-1.5 sm:-inset-2 rounded-full bg-gradient-to-r from-[#FDE047]/60 via-[#F59E0B]/50 to-[#CA8A04]/60 blur-md group-hover:blur-lg transition-all" />
          <div className="relative w-16 h-16 sm:w-24 sm:h-24 rounded-full p-1 bg-gradient-to-b from-[#FEF08A] via-[#EAB308] to-[#CA8A04] shadow-[0_4px_25px_rgba(234,179,8,0.35)]">
            <img
              src={ganeshImage}
              alt="Lord Ganesha - Auspicious Wedding Blessings"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </div>

        {/* Shloka & Auspicious Invocation Text */}
        <h2 className="font-hindi text-lg sm:text-2xl text-[#713F12] tracking-widest font-bold drop-shadow-sm">
          {ganeshShlokaHindi}
        </h2>
        <p className="font-editorial text-xs sm:text-sm text-[#854D0E] italic tracking-wide max-w-md mt-1 px-2 leading-relaxed font-medium">
          {ganeshMantra}
        </p>

        {/* Elegant Turmeric Gold Divider */}
        <div className="flex items-center gap-3 my-2 sm:my-3 w-40 sm:w-48 mx-auto">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#EAB308]/80" />
          <span className="text-[#CA8A04] text-xs">卐</span>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#EAB308]/80" />
        </div>
      </motion.div>

      {/* 2. Main Royal Centerpiece: Couple Portrait & Regal Typography */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative z-20 my-auto py-1 sm:py-2 max-w-5xl flex flex-col items-center"
      >
        {/* Royal Framed Couple Picture */}
        {heroImage && (
          <div className="relative mb-4 sm:mb-6 group">
            {/* Ambient gold halo */}
            <div className="absolute -inset-2.5 sm:-inset-4 rounded-t-[120px] sm:rounded-t-[140px] rounded-b-2xl bg-gradient-to-b from-[#FACC15]/30 via-[#EAB308]/25 to-[#FDE047]/30 blur-md transition-all duration-700" />

            {/* Traditional Royal Arch Frame */}
            <div className="relative w-56 sm:w-80 md:w-96 aspect-[9/13] rounded-t-[120px] sm:rounded-t-[140px] rounded-b-2xl overflow-hidden border-2 border-[#EAB308] shadow-[0_15px_40px_rgba(234,179,8,0.2)] bg-[#FFFDF7]">
              <img
                src={heroImage}
                alt={`${invitation.partner_one} & ${invitation.partner_two}`}
                className="w-full h-full object-cover object-top transform group-hover:scale-103 transition-transform duration-1000 ease-out"
              />

              {/* Base gradient overlay for smooth integration */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#713F12]/40 via-transparent to-transparent pointer-events-none" />

              {/* Watermark Arch Border */}
              <div className="absolute inset-1 sm:inset-1.5 border border-[#EAB308]/40 rounded-t-[114px] sm:rounded-t-[132px] rounded-b-xl pointer-events-none" />

              {/* Top Auspicious Kalash / Lotus Badge */}
              <div className="absolute top-2.5 sm:top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#FFFDF5]/95 border border-[#EAB308] text-[#713F12] text-[9px] sm:text-[10px] uppercase tracking-widest font-title font-bold shadow">
                शुभ विवाह
              </div>
            </div>
          </div>
        )}

        {/* Formal Invitation Text */}
        <p className="font-editorial text-[11px] sm:text-base text-[#854D0E] tracking-[0.2em] sm:tracking-[0.25em] uppercase mb-1.5 font-bold px-2 max-w-sm sm:max-w-none">
          {theme.family_invitation_text || 'Together with their families request the honour of your presence at the wedding of'}
        </p>

        {/* Couple Names - Bride First */}
        <h1 className="font-title text-2xl sm:text-4xl md:text-5xl tracking-wide leading-tight mb-2 px-1">
          <span className="block gold-text-gradient drop-shadow-sm font-bold">
            {theme.bride_details?.name || (invitation.partner_two?.includes('Sweety') ? invitation.partner_two : invitation.partner_one) || 'Sweety Singh'}
          </span>
          <span className="inline-block font-calligraphy text-2xl sm:text-4xl text-[#D97706] my-0.5 sm:my-1 px-3">
            weds
          </span>
          <span className="block gold-text-gradient drop-shadow-sm font-bold">
            {theme.groom_details?.name || (invitation.partner_one?.includes('Amit') ? invitation.partner_one : invitation.partner_two) || 'Amit Kumar Singh'}
          </span>
        </h1>

        {/* Tagline */}
        {invitation.tagline && (
          <p className="font-editorial text-xs sm:text-lg text-[#854D0E] italic max-w-xl mx-auto mb-2.5 sm:mb-3 px-3 font-medium">
            “{invitation.tagline}”
          </p>
        )}

        {/* Auspicious Ceremony Dates Summary Pills (Haldi, Mehndi, Wedding) in Turmeric Theme */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-3 mt-2 sm:mt-3 max-w-2xl px-1">
          <div className="px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-lg bg-[#FFFDF5] border border-[#EAB308] text-[11px] sm:text-xs text-[#713F12] flex items-center gap-1.5 shadow-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-[#EAB308] shadow-[0_0_8px_#EAB308]" />
            <span className="text-[#854D0E] font-bold">HALDI:</span> 28 Nov
          </div>
          <div className="px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-lg bg-[#F0FDF4] border border-[#10B981] text-[11px] sm:text-xs text-[#065F46] flex items-center gap-1.5 shadow-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-[#10B981] shadow-[0_0_8px_#10B981]" />
            <span className="text-[#047857] font-bold">MEHNDI:</span> 29 Nov
          </div>
          <div className="px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-lg bg-[#FFF7ED] border border-[#EA580C] text-[11px] sm:text-xs text-[#9A3412] flex items-center gap-1.5 shadow-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-[#EA580C] shadow-[0_0_8px_#EA580C]" />
            <span className="text-[#C2410C] font-bold">WEDDING:</span> 30 Nov
          </div>
        </div>

        {/* Main Wedding Date & Venue Location Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mt-3 text-xs sm:text-sm px-2">
          <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/95 border border-[#EAB308]/70 shadow-sm text-[#713F12]">
            <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#CA8A04]" />
            <span className="font-semibold tracking-wide text-xs sm:text-sm">{weddingDateFormatted}</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/95 border border-[#EAB308]/70 shadow-sm text-[#713F12]">
            <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#EA580C]" />
            <span className="font-semibold tracking-wide text-xs sm:text-sm">{invitation.venue_city}</span>
          </div>
        </div>

        {/* Auspicious Muhurat Countdown */}
        <div className="mt-5 sm:mt-7 max-w-md mx-auto w-full px-2">
          <div className="text-[10px] sm:text-[11px] tracking-[0.2em] sm:tracking-[0.25em] uppercase text-[#854D0E] mb-2 font-bold flex items-center justify-center gap-1.5">
            <Sparkles className="w-3 h-3 text-[#CA8A04]" />
            <span>{timeLeft.isPast ? 'The Sacred Vows Have Commenced' : 'Countdown to Auspicious Muhurat'}</span>
            <Sparkles className="w-3 h-3 text-[#CA8A04]" />
          </div>

          <div className="grid grid-cols-4 gap-1.5 sm:gap-3">
            {[
              { label: 'Days (दिन)', value: timeLeft.days },
              { label: 'Hours (घंटे)', value: timeLeft.hours },
              { label: 'Mins (मिनट)', value: timeLeft.minutes },
              { label: 'Secs (सेकंड)', value: timeLeft.seconds },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center py-2 px-1 sm:p-2.5 rounded-xl bg-white/95 border border-[#EAB308]/60 shadow-[0_4px_16px_rgba(234,179,8,0.12)]"
              >
                <span className="font-title text-lg sm:text-2xl font-bold text-[#713F12] leading-tight">
                  {String(item.value).padStart(2, '0')}
                </span>
                <span className="text-[7.5px] sm:text-[9px] uppercase tracking-wider text-[#854D0E]/80 mt-0.5 font-bold truncate max-w-full">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* 3. Clean Traditional CTA Navigation Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="relative z-20 flex flex-col items-center gap-3 sm:gap-4 mt-5 sm:mt-6 w-full"
      >
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-3 w-full max-w-xs sm:max-w-none px-4 sm:px-0">
          {onExploreProfiles && (
            <button
              onClick={onExploreProfiles}
              className="w-full sm:w-auto px-5 sm:px-6 py-3 sm:py-2.5 rounded-full bg-gradient-to-r from-[#FACC15] via-[#EAB308] to-[#CA8A04] text-[#451A03] text-xs font-bold tracking-wider uppercase border border-[#FEF08A] shadow-[0_4px_20px_rgba(234,179,8,0.35)] hover:shadow-[0_6px_28px_rgba(234,179,8,0.5)] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Heart className="w-3.5 h-3.5 text-[#451A03] fill-[#451A03]" />
              Meet Bride & Groom (परिचय)
            </button>
          )}

          <button
            onClick={onViewEvents}
            className="w-full sm:w-auto px-5 sm:px-6 py-3 sm:py-2.5 rounded-full bg-white hover:bg-[#FEFCE8] text-[#713F12] text-xs font-bold tracking-wider uppercase border-2 border-[#EAB308] shadow-sm transition-all cursor-pointer text-center"
          >
            Ceremony Dates (कार्यक्रम)
          </button>

          {onRsvp && (
            <button
              onClick={onRsvp}
              className="w-full sm:w-auto px-5 sm:px-6 py-3 sm:py-2.5 rounded-full bg-[#FEF9C3] hover:bg-[#FEF08A] text-[#854D0E] text-xs font-bold tracking-wider uppercase border border-[#EAB308] transition-all cursor-pointer shadow-sm text-center"
            >
              Send Blessings (RSVP)
            </button>
          )}
        </div>

        {/* Subtle Scroll Indicator */}
        <div
          onClick={onExploreProfiles || onViewEvents}
          className="text-[#854D0E] flex flex-col items-center gap-1 cursor-pointer pt-2 group"
        >
          <span className="text-[9px] uppercase tracking-widest text-[#713F12] font-bold">Scroll to Celebrate</span>
          <ChevronDown className="w-4 h-4 text-[#CA8A04] group-hover:translate-y-1 transition-transform" />
        </div>
      </motion.div>
    </section>
  );
};
