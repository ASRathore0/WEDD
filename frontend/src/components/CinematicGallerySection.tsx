import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import type { GalleryMediaData } from '../types/wedding';

interface CinematicGallerySectionProps {
  gallery: GalleryMediaData[];
}

export const CinematicGallerySection: React.FC<CinematicGallerySectionProps> = ({ gallery }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'All Glimpses' },
    { id: 'couple', label: 'The Couple' },
    { id: 'ceremonies', label: 'Sacred Ceremonies' },
    { id: 'cinematic', label: 'Palatial & Cinematic' },
  ];

  const filteredItems =
    activeCategory === 'all'
      ? gallery
      : gallery.filter((item) => item.category === activeCategory);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;

      if (e.key === 'Escape') {
        setSelectedImageIndex(null);
      } else if (e.key === 'ArrowRight') {
        setSelectedImageIndex((prev) => (prev !== null ? (prev + 1) % filteredItems.length : 0));
      } else if (e.key === 'ArrowLeft') {
        setSelectedImageIndex((prev) =>
          prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : 0
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, filteredItems.length]);

  return (
    <section id="gallery-section" className="relative py-12 sm:py-24 px-3 sm:px-6 max-w-6xl mx-auto z-10">
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
          <span>Cinematic Moments</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-title text-2xl sm:text-4xl md:text-5xl font-bold text-[#713F12] mb-3 sm:mb-4"
        >
          The Royal Gallery
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-editorial text-sm sm:text-lg md:text-xl text-[#854D0E] italic font-medium px-2"
        >
          Portraits bathed in antique sunlight, palatial architecture, and timeless Indian grandeur.
        </motion.p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-3 mb-8 sm:mb-12 px-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setActiveCategory(cat.id);
              setSelectedImageIndex(null);
            }}
            className={`px-3.5 sm:px-5 py-2 min-h-[38px] rounded-full text-[11px] sm:text-xs font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
              activeCategory === cat.id
                ? 'bg-gradient-to-r from-[#FACC15] via-[#EAB308] to-[#CA8A04] text-[#451A03] border border-[#FEF08A] shadow-[0_2px_12px_rgba(234,179,8,0.3)]'
                : 'bg-white/90 text-[#854D0E] hover:text-[#713F12] border border-[#EAB308]/30 font-medium'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Editorial Masonry Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, index) => (
          <motion.div
            key={item.id || index}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            onClick={() => setSelectedImageIndex(index)}
            className="group relative aspect-[4/5] rounded-2xl overflow-hidden border-2 border-[#EAB308]/50 bg-white cursor-pointer shadow-md hover:shadow-xl transition-all duration-500"
          >
            <img
              src={item.url}
              alt={item.title || 'Wedding glimpse'}
              loading="lazy"
              className="w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-700 ease-out"
            />

            {/* Radiant turmeric gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#713F12] via-[#713F12]/60 to-transparent opacity-0 group-hover:opacity-95 transition-opacity duration-300 flex flex-col justify-end p-5">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#FEF08A] font-bold translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                {item.category}
              </span>
              <h4 className="font-title text-base sm:text-lg text-white font-bold translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                {item.title}
              </h4>
              {item.caption && (
                <p className="font-editorial text-xs sm:text-sm text-[#FEF9C3] italic line-clamp-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-100 font-medium">
                  {item.caption}
                </p>
              )}
            </div>

            {/* Expand Icon pill */}
            <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 border border-[#EAB308] flex items-center justify-center text-[#713F12] opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
              <Maximize2 className="w-3.5 h-3.5" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Full-Screen Lightbox Modal */}
      <AnimatePresence>
        {selectedImageIndex !== null && filteredItems[selectedImageIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#100C12]/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImageIndex(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#451A03]/80 border border-[#EAB308]/60 text-[#FEF08A] hover:text-white flex items-center justify-center transition-colors cursor-pointer z-50 shadow-lg"
              aria-label="Close Lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Prev Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImageIndex(
                  (selectedImageIndex - 1 + filteredItems.length) % filteredItems.length
                );
              }}
              className="absolute left-2 sm:left-8 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#451A03]/80 border border-[#EAB308]/60 text-[#FEF08A] hover:bg-[#713F12] flex items-center justify-center transition-all cursor-pointer z-50 shadow-lg"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImageIndex((selectedImageIndex + 1) % filteredItems.length);
              }}
              className="absolute right-2 sm:right-8 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#451A03]/80 border border-[#EAB308]/60 text-[#FEF08A] hover:bg-[#713F12] flex items-center justify-center transition-all cursor-pointer z-50 shadow-lg"
              aria-label="Next Image"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Lightbox Image & Caption */}
            <motion.div
              key={selectedImageIndex}
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl w-full flex flex-col items-center max-h-[85vh] px-2"
            >
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#EAB308]/60 shadow-2xl max-h-[70vh]">
                <img
                  src={filteredItems[selectedImageIndex].url}
                  alt={filteredItems[selectedImageIndex].title || 'Wedding portrait'}
                  className="w-full h-full max-h-[70vh] object-contain bg-black/50"
                />
              </div>

              <div className="text-center mt-3 sm:mt-4 max-w-xl">
                <h3 className="font-title text-base sm:text-xl text-[#FEF08A] font-bold">
                  {filteredItems[selectedImageIndex].title}
                </h3>
                {filteredItems[selectedImageIndex].caption && (
                  <p className="font-editorial text-xs sm:text-sm text-[#FEF9C3]/80 italic mt-0.5 sm:mt-1 font-medium">
                    {filteredItems[selectedImageIndex].caption}
                  </p>
                )}
                <div className="text-[10px] text-[#EAB308] font-mono tracking-widest uppercase mt-1 sm:mt-2 font-bold">
                  Image {selectedImageIndex + 1} of {filteredItems.length}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
