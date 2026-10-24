import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, MapPin, Users, Heart, Sparkles, Award } from 'lucide-react';
import type { InvitationData } from '../types/wedding';

interface CoupleProfileSectionProps {
  invitation: InvitationData;
}

export const CoupleProfileSection: React.FC<CoupleProfileSectionProps> = ({ invitation }) => {
  const theme = invitation.theme_settings || {};
  const groom = theme.groom_details || {
    name: invitation.partner_one || 'Amit Kumar Singh',
    title: 'The Groom (वर)',
    qualification: 'B.Tech in Computer Science / Senior Software Architect',
    profession: 'Senior Technology Consultant & Entrepreneur',
    father_name: 'Shri Ramendra Singh',
    mother_name: 'Smt. Shanti Devi',
    native_place: 'Thawe, Gopalganj, Bihar',
    about: 'Visionary, ambitious, and deeply rooted in cultural values.',
    photo_url: invitation.hero_image_url || '/images/amit_sweety_hero.jpg',
  };

  const bride = theme.bride_details || {
    name: invitation.partner_two || 'Sweety Singh',
    title: 'The Bride (वधू)',
    qualification: 'M.Sc / MBA in Financial Management',
    profession: 'Financial Analyst & Creative Specialist',
    father_name: 'Shri Dharmendra Singh',
    mother_name: 'Smt. Sunita Devi',
    native_place: 'Thawe, Gopalganj, Bihar',
    about: 'Graceful, intellectual, and radiant. A loving heart bringing joy to all.',
    photo_url: invitation.hero_image_url || '/images/amit_sweety_hero.jpg',
  };

  return (
    <section id="profile-section" className="relative py-12 sm:py-20 px-3 sm:px-4 max-w-6xl mx-auto z-20">
      {/* Section Title */}
      <div className="text-center mb-10 sm:mb-14">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 rounded-full bg-[#FEF9C3] border border-[#EAB308]/70 text-[11px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#713F12] font-bold mb-3 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#CA8A04]" />
          <span>वधू - वर परिचय</span>
          <Sparkles className="w-3.5 h-3.5 text-[#CA8A04]" />
        </motion.div>

        <h2 className="font-title text-2xl sm:text-4xl md:text-5xl text-[#713F12] tracking-wide mb-2 sm:mb-3 font-bold">
          Meet the Bride & Groom
        </h2>
        <p className="font-editorial text-sm sm:text-lg text-[#854D0E] max-w-2xl mx-auto italic font-medium px-2">
          “दो आत्माओं का पावन बंधन, दो परिवारों का मधुर संगम”
        </p>

        {/* Auspicious Turmeric Divider */}
        <div className="flex items-center justify-center gap-3 mt-3 sm:mt-4">
          <div className="h-[1px] w-20 sm:w-24 bg-gradient-to-r from-transparent to-[#EAB308]/70" />
          <span className="text-[#CA8A04] text-xs sm:text-sm">✦</span>
          <div className="h-[1px] w-20 sm:w-24 bg-gradient-to-l from-transparent to-[#EAB308]/70" />
        </div>
      </div>

      {/* Side-by-side Profiles Container in Turmeric Theme (BRIDE FIRST, GROOM SECOND) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-stretch">
        {/* 1. BRIDE PROFILE CARD (FIRST) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-2xl sm:rounded-3xl bg-white/95 border-2 border-[#EAB308]/60 p-4 sm:p-7 shadow-[0_12px_36px_rgba(234,179,8,0.12)] flex flex-col justify-between hover:border-[#EAB308] transition-all duration-300 group"
        >
          <div>
            {/* Top Bar with Badge */}
            <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-[#EAB308]/25">
              <span className="text-[10px] sm:text-[11px] font-bold tracking-widest uppercase text-[#CA8A04]">
                The Bride
              </span>
              <span className="text-[11px] font-title px-2.5 py-0.5 rounded-full bg-[#FEF08A] border border-[#EAB308] text-[#713F12] font-bold shadow-sm shrink-0">
                वधू (Bride)
              </span>
            </div>

            {/* Header info */}
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl overflow-hidden border-2 border-[#EAB308] shadow-md bg-[#FEFCE8] shrink-0 p-0.5 sm:p-1">
                <img
                  src={bride.photo_url || invitation.hero_image_url || '/images/amit_sweety_hero.jpg'}
                  alt={bride.name}
                  className="w-full h-full object-cover object-top rounded-lg sm:rounded-xl"
                />
              </div>
              <div className="min-w-0">
                <h3 className="font-title text-xl sm:text-2xl lg:text-3xl text-[#713F12] font-bold truncate">
                  {bride.name}
                </h3>
                <p className="text-xs text-[#854D0E] font-editorial italic mt-0.5 font-medium">
                  D/o {bride.mother_name} & {bride.father_name}
                </p>
              </div>
            </div>

            {/* Profile Attributes List */}
            <div className="space-y-3 sm:space-y-4 pt-1">
              {/* Qualification */}
              <div className="flex items-start gap-2.5 sm:gap-3 p-3 sm:p-3.5 rounded-xl bg-[#FEFCE8]/80 border border-[#EAB308]/40 shadow-sm">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#FEF08A] flex items-center justify-center shrink-0 text-[#854D0E]">
                  <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] uppercase tracking-wider text-[#854D0E] block font-bold">
                    Education & Qualification
                  </span>
                  <p className="text-xs sm:text-sm text-[#713F12] font-semibold break-words">
                    {bride.qualification}
                  </p>
                </div>
              </div>

              {/* Profession */}
              <div className="flex items-start gap-2.5 sm:gap-3 p-3 sm:p-3.5 rounded-xl bg-[#FEFCE8]/80 border border-[#EAB308]/40 shadow-sm">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#FEF08A] flex items-center justify-center shrink-0 text-[#EA580C]">
                  <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] uppercase tracking-wider text-[#854D0E] block font-bold">
                    Profession & Career
                  </span>
                  <p className="text-xs sm:text-sm text-[#713F12] font-semibold break-words">
                    {bride.profession}
                  </p>
                </div>
              </div>

              {/* Parents & Family Roots */}
              <div className="flex items-start gap-2.5 sm:gap-3 p-3 sm:p-3.5 rounded-xl bg-[#FEFCE8]/80 border border-[#EAB308]/40 shadow-sm">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#FEF08A] flex items-center justify-center shrink-0 text-[#713F12]">
                  <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] uppercase tracking-wider text-[#854D0E] block font-bold">
                    Family & Heritage
                  </span>
                  <p className="text-xs sm:text-sm text-[#713F12] font-semibold">
                    Daughter of <strong>{bride.mother_name}</strong> & <strong>{bride.father_name}</strong>
                  </p>
                  {bride.native_place && (
                    <p className="text-xs text-[#854D0E] flex items-center gap-1 mt-0.5 font-medium">
                      <MapPin className="w-3 h-3 text-[#EA580C] shrink-0" />
                      Native: {bride.native_place}
                    </p>
                  )}
                </div>
              </div>

              {/* About Bride */}
              {bride.about && (
                <div className="p-3 sm:p-3.5 rounded-xl bg-[#FFFDF5] border border-[#EAB308]/50 text-xs text-[#713F12] italic leading-relaxed font-editorial font-medium shadow-sm">
                  “{bride.about}”
                </div>
              )}
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-[#EAB308]/30 flex items-center justify-between text-[11px] text-[#854D0E] font-semibold">
            <span className="flex items-center gap-1.5 font-bold">
              <Heart className="w-3.5 h-3.5 text-[#EA580C] fill-[#EA580C]" />
              Shubh Vivah Vadhu
            </span>
            <span>Singh Pariwar</span>
          </div>
        </motion.div>

        {/* 2. GROOM PROFILE CARD (SECOND) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-2xl sm:rounded-3xl bg-white/95 border-2 border-[#EAB308]/60 p-4 sm:p-7 shadow-[0_12px_36px_rgba(234,179,8,0.12)] flex flex-col justify-between hover:border-[#EAB308] transition-all duration-300 group"
        >
          <div>
            {/* Top Bar with Badge */}
            <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-[#EAB308]/25">
              <span className="text-[10px] sm:text-[11px] font-bold tracking-widest uppercase text-[#CA8A04]">
                The Groom
              </span>
              <span className="text-[11px] font-title px-2.5 py-0.5 rounded-full bg-[#FEF08A] border border-[#EAB308] text-[#713F12] font-bold shadow-sm shrink-0">
                वर (Groom)
              </span>
            </div>

            {/* Header info */}
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl overflow-hidden border-2 border-[#EAB308] shadow-md bg-[#FEFCE8] shrink-0 p-0.5 sm:p-1">
                <img
                  src={groom.photo_url || invitation.hero_image_url || '/images/amit_sweety_hero.jpg'}
                  alt={groom.name}
                  className="w-full h-full object-cover object-top rounded-lg sm:rounded-xl"
                />
              </div>
              <div className="min-w-0">
                <h3 className="font-title text-xl sm:text-2xl lg:text-3xl text-[#713F12] font-bold truncate">
                  {groom.name}
                </h3>
                <p className="text-xs text-[#854D0E] font-editorial italic mt-0.5 font-medium">
                  S/o {groom.mother_name} & {groom.father_name}
                </p>
              </div>
            </div>

            {/* Profile Attributes List */}
            <div className="space-y-3 sm:space-y-4 pt-1">
              {/* Qualification */}
              <div className="flex items-start gap-2.5 sm:gap-3 p-3 sm:p-3.5 rounded-xl bg-[#FEFCE8]/80 border border-[#EAB308]/40 shadow-sm">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#FEF08A] flex items-center justify-center shrink-0 text-[#854D0E]">
                  <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] uppercase tracking-wider text-[#854D0E] block font-bold">
                    Education & Qualification
                  </span>
                  <p className="text-xs sm:text-sm text-[#713F12] font-semibold break-words">
                    {groom.qualification}
                  </p>
                </div>
              </div>

              {/* Profession */}
              <div className="flex items-start gap-2.5 sm:gap-3 p-3 sm:p-3.5 rounded-xl bg-[#FEFCE8]/80 border border-[#EAB308]/40 shadow-sm">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#FEF08A] flex items-center justify-center shrink-0 text-[#EA580C]">
                  <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] uppercase tracking-wider text-[#854D0E] block font-bold">
                    Profession & Career
                  </span>
                  <p className="text-xs sm:text-sm text-[#713F12] font-semibold break-words">
                    {groom.profession}
                  </p>
                </div>
              </div>

              {/* Parents & Family Roots */}
              <div className="flex items-start gap-2.5 sm:gap-3 p-3 sm:p-3.5 rounded-xl bg-[#FEFCE8]/80 border border-[#EAB308]/40 shadow-sm">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#FEF08A] flex items-center justify-center shrink-0 text-[#713F12]">
                  <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] uppercase tracking-wider text-[#854D0E] block font-bold">
                    Family & Heritage
                  </span>
                  <p className="text-xs sm:text-sm text-[#713F12] font-semibold">
                    Son of <strong>{groom.mother_name}</strong> & <strong>{groom.father_name}</strong>
                  </p>
                  {groom.native_place && (
                    <p className="text-xs text-[#854D0E] flex items-center gap-1 mt-0.5 font-medium">
                      <MapPin className="w-3 h-3 text-[#EA580C] shrink-0" />
                      Native: {groom.native_place}
                    </p>
                  )}
                </div>
              </div>

              {/* About Groom */}
              {groom.about && (
                <div className="p-3 sm:p-3.5 rounded-xl bg-[#FFFDF5] border border-[#EAB308]/50 text-xs text-[#713F12] italic leading-relaxed font-editorial font-medium shadow-sm">
                  “{groom.about}”
                </div>
              )}
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-[#EAB308]/30 flex items-center justify-between text-[11px] text-[#854D0E] font-semibold">
            <span className="flex items-center gap-1.5 font-bold">
              <Award className="w-3.5 h-3.5 text-[#CA8A04]" />
              Shubh Vivah Candidate
            </span>
            <span>Singh Pariwar</span>
          </div>
        </motion.div>
      </div>

      {/* Auspicious Marriage Sanskrit Blessing Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#FEFCE8] via-[#FEF9C3] to-[#FEFCE8] border-2 border-[#EAB308]/60 text-center shadow-md"
      >
        <p className="font-hindi text-base sm:text-xl text-[#713F12] font-bold mb-2 drop-shadow-sm">
          {theme.auspicious_welcome || 'मंगलम् भगवान विष्णुः, मंगलम् गरुड़ध्वजः। मंगलम् पुण्डरीकाक्षः, मंगलाय तनो हरिः॥'}
        </p>
        <p className="font-editorial text-xs sm:text-sm text-[#854D0E] max-w-xl mx-auto italic font-medium">
          May the divine grace illuminate their sacred journey with joy, longevity, peace, and eternal togetherness.
        </p>
      </motion.div>
    </section>
  );
};
