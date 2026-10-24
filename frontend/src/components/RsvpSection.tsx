import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Users,
  Send,
  Heart,
} from 'lucide-react';
import type { InvitationData, RsvpSubmission } from '../types/wedding';
import { weddingApi } from '../services/api';

interface RsvpSectionProps {
  invitation: InvitationData;
}

export const RsvpSection: React.FC<RsvpSectionProps> = ({ invitation }) => {
  const [formData, setFormData] = useState<RsvpSubmission>({
    guest_name: '',
    email: '',
    phone: '',
    attendance_status: 'attending',
    guest_count: 1,
    selected_events: invitation.events.map((e) => e.title),
    dietary_notes: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>('');

  const handleEventToggle = (eventTitle: string) => {
    setFormData((prev) => {
      const exists = prev.selected_events.includes(eventTitle);
      return {
        ...prev,
        selected_events: exists
          ? prev.selected_events.filter((t) => t !== eventTitle)
          : [...prev.selected_events, eventTitle],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Frontend validation
    if (!formData.guest_name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    if (formData.attendance_status === 'attending' && formData.selected_events.length === 0) {
      setErrorMessage('Please select at least one ceremony you plan to attend.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await weddingApi.submitRsvp(invitation.slug, formData);

      if (response?.success) {
        setIsSuccess(true);
        setSuccessMessage(
          response.message || 'Your presence has been recorded in the stars! Thank you for gracing our universe.'
        );

        // Confetti burst
        try {
          confetti({
            particleCount: 70,
            spread: 75,
            origin: { y: 0.6 },
            colors: ['#D7B46A', '#F3E5AB', '#E34236', '#651B2B'],
          });
        } catch {
          // ignore
        }
      } else {
        setErrorMessage(response?.message || 'Could not record your RSVP. Please verify your details.');
      }
    } catch (err: any) {
      const msg =
        err.response?.data?.message ||
        (err.response?.data?.errors ? Object.values(err.response.data.errors)[0] : null) ||
        'Failed to connect to the server. Please try again.';
      setErrorMessage(Array.isArray(msg) ? msg[0] : String(msg));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="rsvp-section" className="relative py-12 sm:py-24 px-3 sm:px-6 max-w-4xl mx-auto z-10">
      {/* Section Header */}
      <div className="text-center mb-10 sm:mb-16 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 rounded-full border border-[#EAB308]/60 bg-[#FEF9C3] text-[#713F12] font-bold text-[11px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] uppercase mb-3 sm:mb-4 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#CA8A04]" />
          <span>Grace Our Universe</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-title text-2xl sm:text-4xl md:text-5xl font-bold text-[#713F12] mb-3 sm:mb-4"
        >
          Confirm Your Presence
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-editorial text-sm sm:text-lg md:text-xl text-[#854D0E] italic font-medium px-2"
        >
          Kindly grace us with your response by October 31, 2026, so our royal hospitality team can prepare for your arrival.
        </motion.p>
      </div>

      {/* Main Form Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative rounded-2xl sm:rounded-3xl border-2 border-[#EAB308]/60 bg-white/95 p-4 sm:p-8 md:p-10 shadow-[0_15px_40px_rgba(234,179,8,0.14)]"
      >
        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              key="success-state"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="py-12 text-center flex flex-col items-center justify-center space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-[#FEF08A] border-2 border-[#EAB308] flex items-center justify-center text-[#713F12] mb-2 shadow-[0_0_20px_rgba(234,179,8,0.35)]">
                <Heart className="w-8 h-8 fill-[#EA580C] text-[#EA580C]" />
              </div>

              <h3 className="font-title text-2xl sm:text-3xl text-[#713F12] font-bold">
                Presence Recorded
              </h3>

              <p className="font-editorial text-lg sm:text-xl text-[#854D0E] max-w-lg mx-auto italic font-medium">
                “{successMessage}”
              </p>

              <div className="pt-4 text-xs font-mono tracking-widest uppercase text-[#CA8A04] font-bold">
                We eagerly await celebrating under the stars with you.
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsSuccess(false);
                  setFormData({
                    guest_name: '',
                    email: '',
                    phone: '',
                    attendance_status: 'attending',
                    guest_count: 1,
                    selected_events: invitation.events.map((e) => e.title),
                    dietary_notes: '',
                    message: '',
                  });
                }}
                className="mt-6 text-xs text-[#713F12] font-bold hover:underline tracking-wider cursor-pointer"
              >
                Submit another response
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Toast if any */}
              {errorMessage && (
                <div className="p-4 rounded-xl bg-[#FEF2F2] border border-[#DC2626]/50 text-xs text-[#991B1B] flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Attendance Status Radios */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#854D0E] mb-3 font-bold">
                  Will you grace our celebration?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { value: 'attending', label: 'Joyfully Attending', desc: 'Can’t wait to celebrate' },
                    { value: 'declined', label: 'Regretfully Declining', desc: 'Celebrating in spirit' },
                    { value: 'tentative', label: 'Tentative', desc: 'Will confirm shortly' },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className={`relative flex flex-col p-3.5 rounded-xl border cursor-pointer transition-all ${
                        formData.attendance_status === option.value
                          ? 'border-2 border-[#EAB308] bg-[#FEF9C3] shadow-[0_2px_12px_rgba(234,179,8,0.2)]'
                          : 'border border-[#EAB308]/30 bg-[#FFFDF5] hover:border-[#EAB308]/60'
                      }`}
                    >
                      <input
                        type="radio"
                        name="attendance_status"
                        value={option.value}
                        checked={formData.attendance_status === option.value}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            attendance_status: e.target.value as any,
                          })
                        }
                        className="sr-only"
                      />
                      <span className="font-title text-sm text-[#713F12] font-bold">
                        {option.label}
                      </span>
                      <span className="text-[11px] text-[#854D0E] font-medium font-body mt-0.5">
                        {option.desc}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Guest Name & Number of Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs uppercase tracking-widest text-[#854D0E] mb-1.5 sm:mb-2 font-bold">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikramaditya Singh"
                    value={formData.guest_name}
                    onChange={(e) => setFormData({ ...formData, guest_name: e.target.value })}
                    className="w-full px-3.5 sm:px-4 py-3 min-h-[46px] rounded-xl bg-[#FFFDF5] border border-[#EAB308]/40 text-[#713F12] placeholder-[#854D0E]/40 text-base sm:text-sm focus:outline-none focus:border-[#EAB308] focus:ring-1 focus:ring-[#EAB308] transition-colors font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#854D0E] mb-1.5 sm:mb-2 font-bold">
                    Party Size (Guests)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min={1}
                      max={10}
                      value={formData.guest_count}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          guest_count: parseInt(e.target.value, 10) || 1,
                        })
                      }
                      className="w-full px-3.5 sm:px-4 py-3 min-h-[46px] rounded-xl bg-[#FFFDF5] border border-[#EAB308]/40 text-[#713F12] text-base sm:text-sm focus:outline-none focus:border-[#EAB308] focus:ring-1 focus:ring-[#EAB308] transition-colors font-medium"
                    />
                    <Users className="w-4 h-4 text-[#CA8A04] absolute right-3 top-3.5 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#854D0E] mb-1.5 sm:mb-2 font-bold">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="For itinerary updates"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 sm:px-4 py-3 min-h-[46px] rounded-xl bg-[#FFFDF5] border border-[#EAB308]/40 text-[#713F12] placeholder-[#854D0E]/40 text-base sm:text-sm focus:outline-none focus:border-[#EAB308] focus:ring-1 focus:ring-[#EAB308] transition-colors font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#854D0E] mb-1.5 sm:mb-2 font-bold">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    placeholder="For wedding updates"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 sm:px-4 py-3 min-h-[46px] rounded-xl bg-[#FFFDF5] border border-[#EAB308]/40 text-[#713F12] placeholder-[#854D0E]/40 text-base sm:text-sm focus:outline-none focus:border-[#EAB308] focus:ring-1 focus:ring-[#EAB308] transition-colors font-medium"
                  />
                </div>
              </div>

              {/* Ceremonies Selection (Only shown when attending) */}
              {formData.attendance_status === 'attending' && (
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#854D0E] mb-2 font-bold flex flex-wrap items-center justify-between gap-1">
                    <span>Which ceremonies will you attend?</span>
                    <span className="text-[10px] lowercase text-[#854D0E]/70 font-semibold">select all that apply</span>
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                    {invitation.events.map((event) => {
                      const isChecked = formData.selected_events.includes(event.title);

                      return (
                        <div
                          key={event.id}
                          onClick={() => handleEventToggle(event.title)}
                          className={`flex items-center gap-3 p-3 sm:p-3.5 rounded-xl border min-h-[48px] cursor-pointer transition-all ${
                            isChecked
                              ? 'border-2 border-[#EAB308] bg-[#FEF9C3] text-[#713F12] shadow-sm'
                              : 'border border-[#EAB308]/30 bg-[#FFFDF5] text-[#854D0E] hover:border-[#EAB308]/60'
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded flex items-center justify-center border shrink-0 transition-colors ${
                              isChecked
                                ? 'bg-[#EAB308] border-[#EAB308] text-white'
                                : 'border-[#EAB308]/50'
                            }`}
                          >
                            {isChecked && <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>

                          <div className="text-xs min-w-0">
                            <span className="font-bold text-[#713F12] block truncate">
                              {event.title}
                            </span>
                            <span className="text-[10px] text-[#854D0E] font-medium block truncate">
                              {new Date(event.event_date).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                              })}{' '}
                              • {event.start_time}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Dietary / Accessibility Preferences */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#854D0E] mb-1.5 sm:mb-2 font-bold">
                  Dietary / Accessibility Notes
                </label>
                <input
                  type="text"
                  placeholder="e.g. Vegetarian, Jain food, Wheelchair assistance"
                  value={formData.dietary_notes}
                  onChange={(e) => setFormData({ ...formData, dietary_notes: e.target.value })}
                  className="w-full px-3.5 sm:px-4 py-3 min-h-[46px] rounded-xl bg-[#FFFDF5] border border-[#EAB308]/40 text-[#713F12] placeholder-[#854D0E]/40 text-base sm:text-sm focus:outline-none focus:border-[#EAB308] focus:ring-1 focus:ring-[#EAB308] transition-colors font-medium"
                />
              </div>

              {/* Blessing Message */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#854D0E] mb-1.5 sm:mb-2 font-bold">
                  Warm Blessings / Note for Sweety & Amit
                </label>
                <textarea
                  rows={3}
                  placeholder="Share your auspicious blessing for the lovely couple..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 sm:px-4 py-3 rounded-xl bg-[#FFFDF5] border border-[#EAB308]/40 text-[#713F12] placeholder-[#854D0E]/40 text-base sm:text-sm focus:outline-none focus:border-[#EAB308] focus:ring-1 focus:ring-[#EAB308] transition-colors resize-none font-medium"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 sm:py-4 min-h-[48px] rounded-full bg-gradient-to-r from-[#FACC15] via-[#EAB308] to-[#CA8A04] text-[#451A03] text-xs sm:text-sm font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase border border-[#FEF08A] shadow-[0_4px_20px_rgba(234,179,8,0.35)] hover:shadow-[0_6px_28px_rgba(234,179,8,0.5)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#451A03]" />
                      <span>Recording Your Blessings...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-[#451A03]" />
                      <span>(शुभकामनाएं भेजें)</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};
