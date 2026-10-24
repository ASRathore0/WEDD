import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Share2,
  RotateCcw,
  Sparkles,
  Check,
  MessageCircle,
} from 'lucide-react';
import type { InvitationData } from '../types/wedding';

interface ClosingSceneSectionProps {
  invitation: InvitationData;
  onRevisitInvitation: () => void;
}

export const ClosingSceneSection: React.FC<ClosingSceneSectionProps> = ({
  invitation,
  onRevisitInvitation,
}) => {
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Generate calendar link for main wedding
  const mainWeddingDate = new Date(invitation.wedding_date);
  const startTime = mainWeddingDate.toISOString().replace(/-|:|\.\d\d\d/g, '');
  const endTime = new Date(mainWeddingDate.getTime() + 4 * 60 * 60 * 1000)
    .toISOString()
    .replace(/-|:|\.\d\d\d/g, '');

  const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    `The Celestial Wedding of ${invitation.partner_one} & ${invitation.partner_two}`
  )}&dates=${startTime}/${endTime}&details=${encodeURIComponent(
    `Join us in celebrating the holy union of ${invitation.partner_one} & ${invitation.partner_two} in Udaipur, Rajasthan.`
  )}&location=${encodeURIComponent(invitation.venue_city)}`;

  // WhatsApp share
  const invitationUrl = window.location.href;
  const shareText = `✨ You are cordially invited into the Celestial Universe of ${invitation.partner_one} & ${invitation.partner_two}. View your royal invitation here: ${invitationUrl}`;
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${invitation.partner_one} & ${invitation.partner_two} — Wedding Universe`,
          text: `A little universe has been created for you. Join our celestial celebration in Udaipur.`,
          url: invitationUrl,
        });
      } catch (err) {
        // Share cancelled or failed
      }
    } else {
      // Copy to clipboard fallback
      navigator.clipboard.writeText(invitationUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <footer className="relative pt-12 sm:pt-24 pb-12 sm:pb-20 px-3 sm:px-6 text-center max-w-4xl mx-auto z-10">
      {/* Decorative divider */}
      <div className="flex items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-16 opacity-80">
        <div className="h-[1px] w-16 sm:w-32 bg-gradient-to-r from-transparent to-[#EAB308]" />
        <span className="text-[#CA8A04] text-xs sm:text-sm font-bold">✦ ✦ ✦</span>
        <div className="h-[1px] w-16 sm:w-32 bg-gradient-to-l from-transparent to-[#EAB308]" />
      </div>

      {/* Animated Glowing Royal Emblem */}
      <div className="relative mx-auto w-24 h-24 sm:w-36 sm:h-36 mb-6 sm:mb-8 flex items-center justify-center">
        {/* Outer Pulsing Aura */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          className="absolute inset-0 rounded-full bg-[#EAB308]/25 blur-xl"
        />

        {/* Concentric Rotating Gold Rings */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
          className="absolute inset-0 rounded-full border border-dashed border-[#EAB308]/50"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
          className="absolute inset-2 rounded-full border border-dotted border-[#CA8A04]/40"
        />

        {/* Emblem Core */}
        <div className="relative w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#FEF08A] to-[#FACC15] border-2 border-[#EAB308] flex flex-col items-center justify-center shadow-[0_0_30px_rgba(234,179,8,0.35)]">
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#713F12] mb-0.5" />
          <span className="font-title text-sm sm:text-lg font-bold text-[#713F12] tracking-tight">
            S&A
          </span>
          <span className="text-[7px] sm:text-[8px] uppercase tracking-widest text-[#854D0E] font-mono font-bold">
            Eternity
          </span>
        </div>
      </div>

      {/* Memorable Closing Headline */}
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="font-title text-xl sm:text-4xl md:text-5xl font-bold text-[#713F12] mb-3 sm:mb-4 leading-tight px-2"
      >
        “Our universe wouldn't be complete without you.”
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="font-editorial text-base sm:text-xl text-[#854D0E] italic max-w-xl mx-auto mb-8 sm:mb-10 font-medium px-2"
      >
        We look forward to sharing our laughter, tears of joy, and sacred vows with the ones who mean the stars to us.
      </motion.p>

      {/* Interactive Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-wrap items-center justify-center gap-2.5 sm:gap-4 mb-10 sm:mb-14 max-w-xs sm:max-w-xl lg:max-w-none mx-auto w-full"
      >
        {/* Add to Calendar */}
        <a
          href={googleCalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto justify-center inline-flex items-center gap-2 px-5 py-3 sm:py-2.5 min-h-[44px] rounded-full bg-white hover:bg-[#FEFCE8] text-[#713F12] text-xs font-bold tracking-wider uppercase border-2 border-[#EAB308] transition-all shadow-sm text-center"
        >
          <Calendar className="w-3.5 h-3.5 text-[#CA8A04]" />
          <span>Add to Calendar</span>
        </a>

        {/* WhatsApp Share */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto justify-center inline-flex items-center gap-2 px-5 py-3 sm:py-2.5 min-h-[44px] rounded-full bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#047857] text-xs font-bold tracking-wider uppercase border border-[#25D366]/50 transition-all shadow-sm text-center"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>Share via WhatsApp</span>
        </a>

        {/* Native Share / Copy Link */}
        <button
          onClick={handleNativeShare}
          className="w-full sm:w-auto justify-center inline-flex items-center gap-2 px-5 py-3 sm:py-2.5 min-h-[44px] rounded-full bg-[#FEF9C3] hover:bg-[#FEF08A] text-[#713F12] text-xs font-bold tracking-wider uppercase border border-[#EAB308] transition-all cursor-pointer shadow-sm text-center"
        >
          {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-[#CA8A04]" />}
          <span>{copiedLink ? 'Link Copied!' : 'Share Invitation'}</span>
        </button>

        {/* Revisit Opening Envelope */}
        <button
          onClick={onRevisitInvitation}
          className="w-full sm:w-auto justify-center inline-flex items-center gap-2 px-5 py-3 sm:py-2.5 min-h-[44px] rounded-full bg-[#FFFDF5] hover:bg-[#FEFCE8] text-[#854D0E] text-xs font-bold tracking-wider uppercase border border-[#EAB308] transition-all cursor-pointer shadow-sm text-center"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#EA580C]" />
          <span>Revisit Envelope</span>
        </button>
      </motion.div>

      {/* Royal Signature Signoff - Bride First */}
      <div className="pt-8 border-t border-[#EAB308]/30 text-xs text-[#854D0E] space-y-2">
        <div className="font-editorial text-base text-[#713F12] italic font-medium">
          With Love, Warmth & Blessings
        </div>
        <div className="font-title text-sm tracking-widest uppercase text-[#854D0E] font-bold">
          {invitation.theme_settings?.bride_details?.name || (invitation.partner_two?.includes('Sweety') ? invitation.partner_two : invitation.partner_one) || 'Sweety Singh'} & {invitation.theme_settings?.groom_details?.name || (invitation.partner_one?.includes('Amit') ? invitation.partner_one : invitation.partner_two) || 'Amit Kumar Singh'}
        </div>
        <div className="text-[10px] text-[#854D0E]/70 tracking-wider font-medium">
          The Sacred Mandap • Thawe, Gopalganj, Bihar • 2026
        </div>
      </div>
    </footer>
  );
};
