import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import type { StoryMilestoneData } from '../types/wedding';

interface CoupleStorySectionProps {
  stories: StoryMilestoneData[];
}

export const CoupleStorySection: React.FC<CoupleStorySectionProps> = ({ stories }) => {
  return (
    <section id="story-section" className="relative py-12 sm:py-24 px-3 sm:px-6 max-w-6xl mx-auto z-10">
      {/* Editorial Section Header */}
      <div className="text-center mb-10 sm:mb-20 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 rounded-full border border-[#EAB308]/60 bg-[#FEF9C3] text-[#713F12] font-bold text-[11px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] uppercase mb-3 sm:mb-4 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#CA8A04]" />
          <span>The Cosmic Chronicle</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-title text-2xl sm:text-4xl md:text-5xl font-bold text-[#713F12] mb-3 sm:mb-4"
        >
          How Our Stars Aligned
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-editorial text-sm sm:text-lg md:text-xl text-[#854D0E] italic font-medium px-2"
        >
          From quiet library corridors in Oxford to the sacred moonlit ghats of India, here is the celestial journey of our love.
        </motion.p>
      </div>

      {/* Editorial Timeline with Staggered Luxury Frames */}
      <div className="relative">
        {/* Central Vertical Constellation Line (hidden on very small mobile) */}
        <div className="hidden md:block absolute left-1/2 top-4 bottom-12 -translate-x-1/2 w-[1px] bg-gradient-to-b from-[#EAB308]/20 via-[#EAB308]/60 to-[#EAB308]/20" />

        <div className="space-y-12 sm:space-y-20 md:space-y-28">
          {stories.map((milestone, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <motion.div
                key={milestone.id || idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className={`relative flex flex-col ${
                  isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                } items-center gap-8 md:gap-14`}
              >
                {/* Timeline Center Node with Jewel Icon */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white border-2 border-[#EAB308] items-center justify-center z-20 shadow-[0_0_15px_rgba(234,179,8,0.4)]">
                  <Heart className="w-3.5 h-3.5 text-[#EA580C] fill-[#EA580C]/40" />
                </div>

                {/* Staggered Photo in Luxury Royal Frame */}
                <div className="w-full md:w-1/2">
                  <div className="relative group mx-auto max-w-md">
                    {/* Antique Gold Ornate Frame Border */}
                    <div className="absolute -inset-2.5 rounded-2xl bg-gradient-to-tr from-[#FACC15]/40 via-[#EAB308]/30 to-[#EA580C]/30 blur-sm group-hover:blur-md transition-all duration-500" />

                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden border-2 border-[#EAB308] shadow-[0_15px_35px_rgba(234,179,8,0.2)] bg-white">
                      <img
                        src={milestone.image_url}
                        alt={milestone.title}
                        loading="lazy"
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#713F12]/40 via-transparent to-transparent opacity-60" />

                      {/* Date Badge over image */}
                      <div className="absolute bottom-3 left-3 px-3 py-1 rounded-md bg-[#FFFDF5]/90 border border-[#EAB308] backdrop-blur-md shadow-sm">
                        <span className="text-xs uppercase tracking-widest font-mono text-[#713F12] font-bold">
                          {milestone.date_label}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Editorial Narrative Content */}
                <div className={`w-full md:w-1/2 text-center ${isEven ? 'md:text-left' : 'md:text-right'}`}>
                  {milestone.subtitle && (
                    <div className="text-xs uppercase tracking-[0.2em] text-[#CA8A04] mb-1.5 font-bold">
                      ✦ {milestone.subtitle}
                    </div>
                  )}

                  <h3 className="font-title text-2xl sm:text-3xl font-bold text-[#713F12] mb-3">
                    {milestone.title}
                  </h3>

                  <p className="font-body text-sm sm:text-base text-[#854D0E] leading-relaxed mb-4 font-medium">
                    {milestone.description}
                  </p>

                  {milestone.quote && (
                    <blockquote className="font-editorial text-base sm:text-lg text-[#713F12] italic border-l-2 border-[#EAB308] pl-4 py-1 inline-block font-medium">
                      {milestone.quote}
                    </blockquote>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
