import React from 'react';
import { motion } from 'framer-motion';
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Sparkles,
  Sun,
  Flame,
  Music2,
  Gem,
  GlassWater,
  Shirt,
  ExternalLink,
} from 'lucide-react';
import type { WeddingEventData } from '../types/wedding';

interface WeddingEventsSectionProps {
  events: WeddingEventData[];
}

export const WeddingEventsSection: React.FC<WeddingEventsSectionProps> = ({ events }) => {
  // Theme mapping for ceremonial identities
  const getThemeDetails = (type: string) => {
    switch (type.toLowerCase()) {
      case 'haldi':
        return {
          icon: Sun,
          accentBorder: 'border-2 border-[#EAB308]',
          gradientBg: 'from-white to-[#FEFCE8]',
          tagBg: 'bg-[#FEF08A] text-[#713F12] border-[#EAB308] font-bold',
          glow: 'shadow-[0_10px_30px_rgba(234,179,8,0.12)]',
          badgeText: 'Haldi Utsav (हल्दी उत्सव)',
          accentColor: '#CA8A04',
        };
      case 'mehendi':
        return {
          icon: Gem,
          accentBorder: 'border-2 border-[#10B981]',
          gradientBg: 'from-white to-[#F0FDF4]',
          tagBg: 'bg-[#DCFCE7] text-[#065F46] border-[#10B981] font-bold',
          glow: 'shadow-[0_10px_30px_rgba(16,185,129,0.12)]',
          badgeText: 'Mehndi & Sangeet (मेंहदी)',
          accentColor: '#059669',
        };
      case 'sangeet':
        return {
          icon: Music2,
          accentBorder: 'border-2 border-[#F59E0B]',
          gradientBg: 'from-white to-[#FFFBEB]',
          tagBg: 'bg-[#FEF3C7] text-[#92400E] border-[#F59E0B] font-bold',
          glow: 'shadow-[0_10px_30px_rgba(245,158,11,0.12)]',
          badgeText: 'Sangeet Night (संगीत)',
          accentColor: '#D97706',
        };
      case 'wedding':
        return {
          icon: Flame,
          accentBorder: 'border-2 border-[#EA580C]',
          gradientBg: 'from-white to-[#FFF7ED]',
          tagBg: 'bg-[#FFEDD5] text-[#9A3412] border-[#EA580C] font-bold',
          glow: 'shadow-[0_10px_30px_rgba(234,88,12,0.12)]',
          badgeText: 'Shubh Vivah (शुभ विवाह)',
          accentColor: '#C2410C',
        };
      case 'reception':
      default:
        return {
          icon: GlassWater,
          accentBorder: 'border-2 border-[#EAB308]',
          gradientBg: 'from-white to-[#FEF9C3]',
          tagBg: 'bg-[#FEF08A] text-[#713F12] border-[#EAB308] font-bold',
          glow: 'shadow-[0_10px_30px_rgba(234,179,8,0.12)]',
          badgeText: 'Grand Reception (प्रीतिभोज)',
          accentColor: '#CA8A04',
        };
    }
  };

  return (
    <section id="events-section" className="relative py-12 sm:py-24 px-3 sm:px-6 max-w-6xl mx-auto z-10">
      {/* Section Header */}
      <div className="text-center mb-10 sm:mb-16 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 rounded-full border border-[#EAB308]/60 bg-[#FEF9C3] text-[#713F12] font-bold text-[11px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] uppercase mb-2 sm:mb-3 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#CA8A04]" />
          <span>शुभ विवाह कार्यक्रम</span>
          <Sparkles className="w-3.5 h-3.5 text-[#CA8A04]" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-title text-2xl sm:text-4xl md:text-5xl font-bold text-[#713F12] mb-2 sm:mb-3"
        >
          Ceremony Dates & Itinerary
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-editorial text-sm sm:text-lg md:text-xl text-[#854D0E] italic leading-relaxed font-medium px-2"
        >
          “चार पावन अध्याय — हल्दी, मेंहदी, वैदिक फेरे एवं आशीर्वाद समारोह”
        </motion.p>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
        {events.map((event, index) => {
          const theme = getThemeDetails(event.event_type);
          const Icon = theme.icon;

          const eventDateFormatted = new Date(event.event_date).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          });

          return (
            <motion.div
              key={event.id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className={`relative rounded-2xl ${theme.accentBorder} bg-gradient-to-b ${theme.gradientBg} p-4 sm:p-7 flex flex-col justify-between backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 ${theme.glow}`}
            >
              {/* Top Tag & Ceremony Icon */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-3 sm:mb-4">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-bold tracking-wider uppercase border ${theme.tagBg}`}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span>{theme.badgeText}</span>
                  </span>

                  <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-[#854D0E]/70 font-semibold shrink-0">
                    Day 0{index + 1}
                  </span>
                </div>

                <h3 className="font-title text-lg sm:text-2xl font-bold text-[#713F12] mb-2 sm:mb-3 leading-snug">
                  {event.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#854D0E] leading-relaxed mb-4 sm:mb-6 font-body font-medium">
                  {event.description}
                </p>
              </div>

              {/* Ceremony Meta (Date, Time, Venue, Dress Code) */}
              <div className="space-y-2.5 sm:space-y-3 pt-3 sm:pt-4 border-t border-[#EAB308]/25 text-xs sm:text-sm">
                <div className="flex items-center gap-2.5 text-[#713F12]">
                  <CalendarIcon className="w-4 h-4 text-[#CA8A04] shrink-0" />
                  <span className="font-semibold">{eventDateFormatted}</span>
                </div>

                <div className="flex items-center gap-2.5 text-[#713F12]">
                  <Clock className="w-4 h-4 text-[#CA8A04] shrink-0" />
                  <span className="font-medium">
                    {event.start_time} {event.end_time ? `– ${event.end_time}` : ''}
                  </span>
                </div>

                <div className="flex items-start gap-2.5 text-[#713F12]">
                  <MapPin className="w-4 h-4 text-[#EA580C] shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <div className="font-bold text-[#713F12] leading-snug">
                      {event.venue_name || event.venue_address}
                    </div>
                  </div>
                </div>

                {event.dress_code && (
                  <div className="flex items-start gap-2.5 text-[#713F12] pt-0.5">
                    <Shirt className="w-4 h-4 text-[#CA8A04] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#854D0E] font-bold block">
                        Dress Code:
                      </span>
                      <span className="text-xs text-[#713F12] italic font-semibold">{event.dress_code}</span>
                    </div>
                  </div>
                )}

                {/* Add to Calendar Link */}
                {event.calendar_link && (
                  <div className="pt-2 sm:pt-3">
                    <a
                      href={event.calendar_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FEFCE8] hover:bg-[#FEF08A] border border-[#EAB308]/50 text-xs text-[#713F12] font-bold tracking-wide transition-colors group shadow-sm"
                    >
                      <span>Add to Google Calendar</span>
                      <ExternalLink className="w-3 h-3 text-[#CA8A04] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
