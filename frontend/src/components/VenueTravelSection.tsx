import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  Navigation,
  Car,
  Hotel,
  Ship,
  Phone,
  Mail,
  Map as MapIcon,
  Sparkles,
} from 'lucide-react';
import type { VenueTravelData } from '../types/wedding';

interface VenueTravelSectionProps {
  venue?: VenueTravelData;
}

export const VenueTravelSection: React.FC<VenueTravelSectionProps> = ({ venue }) => {
  const [showInteractiveMap, setShowInteractiveMap] = useState<boolean>(false);

  if (!venue) return null;

  return (
    <section id="venue-section" className="relative py-12 sm:py-24 px-3 sm:px-6 max-w-6xl mx-auto z-10">
      {/* Header */}
      <div className="text-center mb-10 sm:mb-16 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 rounded-full border border-[#EAB308]/60 bg-[#FEF9C3] text-[#713F12] font-bold text-[11px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] uppercase mb-3 sm:mb-4 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#CA8A04]" />
          <span>The Royal Destination</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-title text-2xl sm:text-4xl md:text-5xl font-bold text-[#713F12] mb-3 sm:mb-4"
        >
          Venue & Travel Concierge
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-editorial text-sm sm:text-lg md:text-xl text-[#854D0E] italic font-medium px-2"
        >
          Nestled along the serene waters of Lake Pichola, your presence will grace one of the world's most breathtaking palaces.
        </motion.p>
      </div>

      {/* Main Palatial Showcase Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative rounded-2xl sm:rounded-3xl border-2 border-[#EAB308]/60 bg-white/95 p-4 sm:p-8 md:p-10 shadow-[0_15px_40px_rgba(234,179,8,0.12)] mb-8 sm:mb-12"
      >
        <div className="flex flex-col lg:flex-row items-start justify-between gap-6 sm:gap-8">
          <div className="space-y-3 sm:space-y-4 max-w-xl w-full">
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-[#CA8A04] font-bold">
              Auspicious Wedding Destination
            </span>
            <h3 className="font-title text-2xl sm:text-4xl text-[#713F12] font-bold">
              {venue.venue_name}
            </h3>
            {venue.venue_sub_heading && (
              <p className="font-editorial text-sm sm:text-lg text-[#854D0E] italic font-medium">
                {venue.venue_sub_heading}
              </p>
            )}

            <div className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm text-[#713F12] pt-1 sm:pt-2 font-medium">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#EA580C] shrink-0 mt-0.5" />
              <span>{venue.address}</span>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-4 pt-3 sm:pt-4 w-full sm:w-auto">
              {venue.map_directions_url && (
                <a
                  href={venue.map_directions_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto justify-center inline-flex items-center gap-2 px-6 py-3 sm:py-2.5 rounded-full bg-gradient-to-r from-[#FACC15] via-[#EAB308] to-[#CA8A04] text-[#451A03] text-xs font-bold tracking-wider uppercase border border-[#FEF08A] shadow-[0_4px_16px_rgba(234,179,8,0.3)] hover:shadow-lg transition-all text-center"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#451A03]" />
                  <span>Get Directions</span>
                </a>
              )}

              <button
                onClick={() => setShowInteractiveMap(!showInteractiveMap)}
                className="w-full sm:w-auto justify-center inline-flex items-center gap-2 px-6 py-3 sm:py-2.5 rounded-full bg-[#FEFCE8] hover:bg-[#FEF08A] text-[#713F12] text-xs font-bold tracking-wider uppercase border border-[#EAB308] transition-all cursor-pointer shadow-sm text-center"
              >
                <MapIcon className="w-3.5 h-3.5 text-[#CA8A04]" />
                <span>{showInteractiveMap ? 'Hide Map' : 'View Interactive Map'}</span>
              </button>
            </div>
          </div>

          {/* Concierge Contact Box */}
          <div className="w-full lg:w-auto shrink-0 p-4 sm:p-5 rounded-2xl bg-[#FFFDF5] border border-[#EAB308]/50 shadow-sm">
            <h4 className="font-title text-sm tracking-wider uppercase text-[#713F12] font-bold mb-3">
              {venue.contact_name || 'Hospitality Desk'}
            </h4>
            <div className="space-y-2.5 text-xs text-[#854D0E] font-medium">
              {venue.contact_phone && (
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#CA8A04]" />
                  <a href={`tel:${venue.contact_phone.split('/')[0].trim()}`} className="hover:text-[#713F12]">
                    {venue.contact_phone}
                  </a>
                </div>
              )}
              {venue.contact_email && (
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#CA8A04]" />
                  <a href={`mailto:${venue.contact_email}`} className="hover:text-[#713F12]">
                    {venue.contact_email}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Embedded Interactive Map on Demand */}
        {showInteractiveMap && venue.map_embed_url && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-8 rounded-2xl overflow-hidden border border-[#EAB308]/50 shadow-inner"
          >
            <iframe
              src={venue.map_embed_url}
              width="100%"
              height="380"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Palace Location Map"
            />
          </motion.div>
        )}
      </motion.div>

      {/* Guest Logistics Cards (Parking, Accommodation, Transport) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Parking */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="p-6 rounded-2xl bg-white/95 border-2 border-[#EAB308]/50 shadow-sm flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-full bg-[#FEF08A] border border-[#EAB308] flex items-center justify-center text-[#854D0E] mb-4">
              <Car className="w-5 h-5" />
            </div>
            <h4 className="font-title text-lg text-[#713F12] font-bold mb-2">Valet & Parking</h4>
            <p className="text-xs sm:text-sm text-[#854D0E] leading-relaxed font-body font-medium">
              {venue.parking_info ||
                'Chauffeured valet services and vintage golf carts will be available for all guests at the main portico.'}
            </p>
          </div>
        </motion.div>

        {/* Accommodations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="p-6 rounded-2xl bg-white/95 border-2 border-[#EAB308]/50 shadow-sm flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-full bg-[#FEF08A] border border-[#EAB308] flex items-center justify-center text-[#854D0E] mb-4">
              <Hotel className="w-5 h-5" />
            </div>
            <h4 className="font-title text-lg text-[#713F12] font-bold mb-2">Accommodations</h4>
            <p className="text-xs sm:text-sm text-[#854D0E] leading-relaxed font-body font-medium">
              {venue.accommodation_info ||
                'Luxury suites have been reserved for all our distinguished guests at The Oberoi Udaivilas and Trident.'}
            </p>
          </div>
        </motion.div>

        {/* Transport & Ferry */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="p-6 rounded-2xl bg-white/95 border-2 border-[#EAB308]/50 shadow-sm flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-full bg-[#FEF08A] border border-[#EAB308] flex items-center justify-center text-[#854D0E] mb-4">
              <Ship className="w-5 h-5" />
            </div>
            <h4 className="font-title text-lg text-[#713F12] font-bold mb-2">Transfers & Boats</h4>
            <p className="text-xs sm:text-sm text-[#854D0E] leading-relaxed font-body font-medium">
              {venue.transport_info ||
                'Private shikaras and luxury motorboats run every 15 minutes between the lakeside jetty and island venues.'}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
