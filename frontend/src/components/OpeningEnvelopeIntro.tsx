import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, ArrowRight } from 'lucide-react';
import type { InvitationData } from '../types/wedding';

interface OpeningEnvelopeIntroProps {
  invitation: InvitationData;
  onOpen: () => void;
}

export const OpeningEnvelopeIntro: React.FC<OpeningEnvelopeIntroProps> = ({
  invitation,
  onOpen,
}) => {
  const [isOpenAnimationTriggered, setIsOpenAnimationTriggered] = useState(false);
  const [sealCracked, setSealCracked] = useState(false);

  const handleOpen = () => {
    if (isOpenAnimationTriggered) return;
    setSealCracked(true);

    // Fire golden royal confetti particles
    try {
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.55 },
        colors: ['#D7B46A', '#F3E5AB', '#E34236', '#651B2B', '#FFFFFF'],
        disableForReducedMotion: true,
      });
    } catch {
      // Ignore if confetti fails
    }

    setIsOpenAnimationTriggered(true);

    // Complete transition into hero scene
    setTimeout(() => {
      onOpen();
    }, 1800);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-[#FEFCE8] via-[#FFFDF0] to-[#FEF9C3] text-[#713F12] px-4 overflow-hidden select-none"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Ambient Turmeric & Kesar lighting */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FACC15]/25 rounded-full blur-[140px]" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[#EAB308]/20 rounded-full blur-[100px]" />
        </div>

        {/* Top Header Tagline */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-center z-10 mb-5 sm:mb-8 max-w-md px-2"
        >
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 rounded-full border border-[#EAB308]/60 bg-[#FEF9C3] text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] uppercase text-[#713F12] font-bold mb-2 sm:mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#CA8A04]" />
            <span>Auspicious Wedding Invitation</span>
          </div>
          <p className="font-editorial text-base sm:text-xl text-[#854D0E] italic font-medium">
            “A little sacred celebration created with love for you.”
          </p>
        </motion.div>

        {/* 3D Envelope Container */}
        <div className="relative perspective-1000 z-10 w-[88vw] max-w-[320px] sm:max-w-[420px] aspect-[1.45/1]">
          <motion.div
            className="w-full h-full relative preserve-3d"
            animate={
              isOpenAnimationTriggered
                ? { rotateX: 12, translateY: 30, scale: 1.03 }
                : { y: [0, -8, 0] }
            }
            transition={
              isOpenAnimationTriggered
                ? { duration: 1.2, ease: 'easeOut' }
                : { repeat: Infinity, duration: 5, ease: 'easeInOut' }
            }
          >
            {/* Envelope Back Body */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#FEF08A] to-[#FACC15] rounded-xl shadow-[0_20px_50px_rgba(234,179,8,0.35)] border-2 border-[#EAB308] overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(254,240,138,0.5),transparent_70%)]" />
              
              {/* Palace Arch Linework Watermark */}
              <div className="absolute inset-0 flex items-center justify-center opacity-25 pointer-events-none">
                <svg viewBox="0 0 100 100" className="w-48 h-48 stroke-[#CA8A04] fill-none" strokeWidth="0.8">
                  <path d="M 20 80 L 20 40 Q 50 10 80 40 L 80 80 Z" />
                  <path d="M 30 80 L 30 45 Q 50 20 70 45 L 70 80 Z" />
                  <circle cx="50" cy="50" r="14" />
                </svg>
              </div>
            </div>

            {/* Letter Inside Sliding Out on Open */}
            <motion.div
              className="absolute left-3 right-3 sm:left-4 sm:right-4 top-2 sm:top-3 bottom-2 sm:bottom-3 bg-white rounded-lg border-2 border-[#EAB308] shadow-xl p-3.5 sm:p-5 flex flex-col justify-between items-center text-center preserve-3d"
              initial={{ y: 0, opacity: 0 }}
              animate={
                isOpenAnimationTriggered
                  ? { y: -95, opacity: 1, scale: 1.02 }
                  : { y: 0, opacity: 0 }
              }
              transition={{ duration: 1.2, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="w-full flex items-center justify-between border-b border-[#EAB308]/30 pb-2">
                <span className="text-[10px] tracking-widest uppercase text-[#CA8A04] font-bold">Thawe</span>
                <span className="text-xs text-[#CA8A04]">✦ ✦ ✦</span>
                <span className="text-[10px] tracking-widest uppercase text-[#CA8A04] font-bold">2026</span>
              </div>

              <div>
                <h4 className="font-title text-xl sm:text-2xl tracking-wide font-bold text-[#713F12] mb-1">
                  {invitation.theme_settings?.bride_details?.name || (invitation.partner_two?.includes('Sweety') ? invitation.partner_two : invitation.partner_one) || 'Sweety Singh'} & {invitation.theme_settings?.groom_details?.name || (invitation.partner_one?.includes('Amit') ? invitation.partner_one : invitation.partner_two) || 'Amit Kumar Singh'}
                </h4>
                <p className="font-editorial text-xs sm:text-sm text-[#854D0E] italic font-medium">
                  cordially invite you into their sacred celebration
                </p>
              </div>

              <div className="text-[11px] text-[#713F12] tracking-wider font-mono font-bold">
                {new Date(invitation.wedding_date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </div>
            </motion.div>

            {/* Envelope Pocket Front (Triangular folds) */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Bottom fold */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#EAB308] via-[#FACC15] to-[#FDE047] rounded-b-xl border-b border-[#CA8A04]/40"
                style={{
                  clipPath: 'polygon(0% 100%, 100% 100%, 50% 48%)',
                }}
              />
              {/* Left fold */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-[#FACC15] to-[#FDE047] rounded-l-xl opacity-95"
                style={{
                  clipPath: 'polygon(0% 0%, 0% 100%, 52% 50%)',
                }}
              />
              {/* Right fold */}
              <div
                className="absolute inset-0 bg-gradient-to-l from-[#FACC15] to-[#FDE047] rounded-r-xl opacity-95"
                style={{
                  clipPath: 'polygon(100% 0%, 100% 100%, 48% 50%)',
                }}
              />
            </div>

            {/* Top Flap with 3D Rotate on Open */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-1/2 origin-top preserve-3d"
              animate={
                isOpenAnimationTriggered
                  ? { rotateX: -180, zIndex: 0 }
                  : { rotateX: 0, zIndex: 30 }
              }
              transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
            >
              <div
                className="w-full h-full bg-gradient-to-b from-[#FDE047] to-[#EAB308] rounded-t-xl border-t border-[#CA8A04]/50 shadow-md"
                style={{
                  clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
                }}
              />
            </motion.div>

            {/* Ornate Turmeric Gold Wax Seal */}
            <div className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-40">
              <motion.button
                onClick={handleOpen}
                disabled={isOpenAnimationTriggered}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center cursor-pointer transition-shadow ${
                  sealCracked ? 'opacity-0 scale-150 duration-500' : 'wax-seal-glow'
                }`}
                style={{
                  background: 'radial-gradient(circle, #FEF08A 0%, #FACC15 50%, #EAB308 75%, #CA8A04 100%)',
                  boxShadow: '0 4px 25px rgba(234, 179, 8, 0.6), inset 0 0 12px rgba(254, 240, 138, 0.9)',
                }}
                aria-label="Crack royal wax seal and open invitation"
              >
                <div className="w-[82%] h-[82%] rounded-full border-2 border-dashed border-[#713F12]/60 flex flex-col items-center justify-center text-[#713F12]">
                  <span className="font-title text-xs sm:text-sm font-bold tracking-tighter">
                    S&A
                  </span>
                  <span className="text-[7px] uppercase tracking-widest font-mono font-bold">
                    शुभ मुहर
                  </span>
                </div>
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Primary CTA and Controls */}
        <div className="z-10 mt-12 flex flex-col items-center gap-4">
          <motion.button
            onClick={handleOpen}
            disabled={isOpenAnimationTriggered}
            whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(234, 179, 8, 0.6)' }}
            whileTap={{ scale: 0.98 }}
            className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#FACC15] via-[#EAB308] to-[#CA8A04] text-[#451A03] font-bold tracking-widest uppercase text-xs sm:text-sm border border-[#FEF08A] shadow-[0_4px_25px_rgba(234,179,8,0.4)] cursor-pointer overflow-hidden transition-all duration-300"
          >
            <span className="relative z-10 flex items-center gap-2">
              <span>{isOpenAnimationTriggered ? 'Entering Universe...' : 'Open Your Sacred Invitation'}</span>
              <ArrowRight className="w-4 h-4 text-[#451A03] group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FEF08A]/35 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </motion.button>

          <button
            onClick={onOpen}
            className="text-xs text-[#854D0E] hover:text-[#713F12] font-bold tracking-wider transition-colors cursor-pointer py-1"
          >
            Skip Intro →
          </button>
        </div>

        {/* Small Bottom Guidance */}
        <div className="absolute bottom-4 text-center text-[11px] text-[#854D0E]/60 tracking-wider font-medium">
          Best experienced with audio enabled ✦ Tap to awaken
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
