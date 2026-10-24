import React from 'react';
import { motion } from 'framer-motion';
import { Users, Heart, Sparkles, Award } from 'lucide-react';
import type { InvitationData, FamilyMember } from '../types/wedding';
import { DEFAULT_BRIDE_FAMILY } from '../types/wedding';
export { DEFAULT_BRIDE_FAMILY };

interface BrideFamilySectionProps {
  invitation: InvitationData;
}

export const BrideFamilySection: React.FC<BrideFamilySectionProps> = ({ invitation }) => {
  const theme = invitation.theme_settings || {};
  const familyList: FamilyMember[] =
    theme.bride_family && theme.bride_family.length > 0
      ? theme.bride_family
      : DEFAULT_BRIDE_FAMILY;

  const brideName = theme.bride_details?.name || invitation.partner_one || 'Sweety Singh';

  return (
    <section id="bride-family-section" className="relative py-12 sm:py-20 px-3 sm:px-4 max-w-6xl mx-auto z-20">
      {/* Section Header */}
      <div className="text-center mb-10 sm:mb-14">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1 rounded-full bg-[#FEF9C3] border border-[#EAB308]/70 text-[11px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#713F12] font-bold mb-3 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#CA8A04]" />
          <span>वधू पक्ष परिवार एवं स्वजन</span>
          <Sparkles className="w-3.5 h-3.5 text-[#CA8A04]" />
        </motion.div>

        <h2 className="font-title text-2xl sm:text-4xl md:text-5xl text-[#713F12] tracking-wide mb-2 sm:mb-3 font-bold">
          Bride's Family & Kinsfolk
        </h2>
        <p className="font-editorial text-sm sm:text-lg text-[#854D0E] max-w-2xl mx-auto italic font-medium px-2">
          “मातृ-पितृ आशीर्वाद एवं समस्त सिंह परिवार की ओर से स्नेहिल आमंत्रण — हमारी लाडली {brideName} का पावन विवाह”
        </p>

        {/* Auspicious Divider */}
        <div className="flex items-center justify-center gap-3 mt-3 sm:mt-4">
          <div className="h-[1px] w-20 sm:w-28 bg-gradient-to-r from-transparent to-[#EAB308]/70" />
          <span className="text-[#CA8A04] text-xs sm:text-sm">卐</span>
          <div className="h-[1px] w-20 sm:w-28 bg-gradient-to-l from-transparent to-[#EAB308]/70" />
        </div>
      </div>

      {/* Family Members Grid in Turmeric Royal Card Aesthetic */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 items-stretch">
        {familyList.map((member, index) => {
          const isParents = member.category === 'parents' || member.relation.includes('माता-पिता');
          const isElders = member.category === 'elders' || member.relation.includes('दादा') || member.relation.includes('नाना');
          const isWelcoming = member.category === 'darsanabhilashi' || member.relation.includes('दर्शनाभिलाषी');

          return (
            <motion.div
              key={member.id || index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className={`relative rounded-2xl bg-white/95 border-2 ${
                isParents
                  ? 'border-[#EAB308] shadow-[0_10px_30px_rgba(234,179,8,0.22)] bg-gradient-to-b from-[#FFFDF2] to-[#FEFCE8]'
                  : isElders
                  ? 'border-[#EAB308]/80 shadow-[0_6px_22px_rgba(234,179,8,0.12)] bg-gradient-to-b from-white to-[#FEFCE8]'
                  : isWelcoming
                  ? 'border-[#EAB308]/80 shadow-[0_6px_22px_rgba(234,179,8,0.12)] bg-gradient-to-b from-[#FEFCE8] to-white sm:col-span-2 lg:col-span-3'
                  : 'border-[#EAB308]/50 shadow-[0_4px_18px_rgba(234,179,8,0.08)]'
              } p-4 sm:p-5 flex flex-col justify-between hover:border-[#EAB308] hover:shadow-lg transition-all duration-300 group`}
            >
              <div>
                {/* Relation Badge */}
                <div className="flex items-center justify-between gap-2 mb-2.5 pb-2 border-b border-[#EAB308]/25">
                  <span className="text-[10px] sm:text-[11px] font-title px-2.5 py-0.5 rounded-full bg-[#FEF08A] border border-[#EAB308] text-[#713F12] font-bold shadow-sm inline-flex items-center gap-1.5">
                    {isParents ? (
                      <Heart className="w-3 h-3 text-[#EA580C] fill-[#EA580C]" />
                    ) : isElders ? (
                      <Award className="w-3 h-3 text-[#CA8A04]" />
                    ) : (
                      <Users className="w-3 h-3 text-[#CA8A04]" />
                    )}
                    <span>{member.relation}</span>
                  </span>

                  <span className="text-[9px] uppercase tracking-widest font-mono text-[#854D0E]/70 font-semibold">
                    वधू पक्ष
                  </span>
                </div>

                {/* Member Name */}
                <h3 className="font-title text-base sm:text-lg text-[#713F12] font-bold mb-1 leading-snug">
                  {member.name}
                </h3>

                {/* Note / Blessing / Native */}
                {member.note && (
                  <p className="font-editorial text-xs sm:text-sm text-[#854D0E] italic font-medium leading-relaxed mt-1">
                    {member.note}
                  </p>
                )}
              </div>

              {/* Bottom Decorative Motif */}
              <div className="mt-3 pt-2 border-t border-[#EAB308]/20 flex items-center justify-between text-[10px] text-[#CA8A04] font-medium">
                <span className="text-[9px] uppercase tracking-wider text-[#854D0E] font-bold">
                  {isParents ? 'परम आदरणीय' : isElders ? 'परम पूज्य' : 'सस्नेह स्वजन'}
                </span>
                <span className="text-[#CA8A04]">✦ सिंह परिवार ✦</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Special Family Blessing Citation Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-8 sm:mt-12 p-4 sm:p-7 rounded-2xl bg-gradient-to-r from-[#FEFCE8] via-[#FEF9C3] to-[#FEFCE8] border-2 border-[#EAB308]/60 text-center shadow-md"
      >
        <p className="font-hindi text-sm sm:text-lg text-[#713F12] font-bold mb-1.5 drop-shadow-sm">
          “कन्यादान महादान — बेटी विदा होकर पराए घर नहीं जाती, एक नए कुल को संवारने जाती है।”
        </p>
        <p className="font-editorial text-xs sm:text-sm text-[#854D0E] max-w-2xl mx-auto italic font-medium px-2">
          Your benign presence and affectionate blessings will enrich our daughter Sweety's sacred journey into her new home.
        </p>
      </motion.div>
    </section>
  );
};
