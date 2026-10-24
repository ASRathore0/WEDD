import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AudioControllerProps {
  audioUrl?: string;
  audioTitle?: string;
  autoPlayTrigger?: boolean;
  showWidget?: boolean;
}

export const AudioController: React.FC<AudioControllerProps> = ({
  audioUrl = '/audio/shehnai_vivah.mp3',
  audioTitle = 'Shehnai & Sitar — Auspicious Vivah Dhun',
  autoPlayTrigger = false,
  showWidget = true,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentSrc, setCurrentSrc] = useState<string>(audioUrl || '/audio/shehnai_vivah.mp3');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  // Update src if audioUrl prop changes
  useEffect(() => {
    if (audioUrl) {
      setCurrentSrc(audioUrl);
    }
  }, [audioUrl]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.35; // gentle default volume
    audio.loop = true;

    const onPlay = () => {
      setIsPlaying(true);
    };
    const onPause = () => setIsPlaying(false);
    const onError = () => {
      console.warn('Audio playback encountered an issue, trying fallback local audio.');
      if (currentSrc !== '/audio/shehnai_vivah.mp3') {
        setCurrentSrc('/audio/shehnai_vivah.mp3');
      } else {
        setIsPlaying(false);
      }
    };

    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('error', onError);

    return () => {
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('error', onError);
    };
  }, [currentSrc]);

  // Triggered when user opens the invitation (explicit user interaction fulfilled)
  useEffect(() => {
    if (autoPlayTrigger && audioRef.current && !isPlaying) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.log('Autoplay prevented by browser policy until next interaction:', err);
        });
    }
  }, [autoPlayTrigger, isPlaying, currentSrc]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch((e) => {
          console.warn('Playback error:', e);
          if (currentSrc !== '/audio/shehnai_vivah.mp3') {
            setCurrentSrc('/audio/shehnai_vivah.mp3');
          }
        });
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <>
      <audio ref={audioRef} src={currentSrc} preload="auto" />

      {/* Floating Audio Controller Widget (toggled via Admin Panel) */}
      {showWidget && (
        <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, x: 10, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 10, scale: 0.95 }}
                className="bg-white/95 border border-[#EAB308]/60 text-[#713F12] text-xs px-3 py-1.5 rounded-lg shadow-xl backdrop-blur-md hidden sm:block max-w-[220px] truncate"
              >
                <div className="text-[10px] uppercase tracking-wider text-[#854D0E] font-bold">Atmospheric Music</div>
                <div className="truncate font-editorial italic text-sm">{audioTitle}</div>
              </motion.div>
            )}
          </AnimatePresence>

          <div
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            className="flex items-center gap-1.5 p-1.5 rounded-full bg-[#FFFDF5]/95 border-2 border-[#EAB308]/60 shadow-[0_8px_24px_rgba(234,179,8,0.25)] backdrop-blur-md"
          >
            {/* Animated Equalizer Waveform Bars when playing */}
            <div className="flex items-end gap-[3px] h-4 px-2" aria-hidden="true">
              {[12, 18, 10, 16].map((h, i) => (
                <motion.span
                  key={i}
                  className="w-[2px] bg-[#CA8A04] rounded-full origin-bottom"
                  animate={
                    isPlaying && !isMuted
                      ? {
                          scaleY: [0.3, 1, 0.4, 0.8, 0.2],
                        }
                      : { scaleY: 0.2 }
                  }
                  transition={{
                    repeat: Infinity,
                    duration: 0.8 + i * 0.2,
                    ease: 'easeInOut',
                  }}
                  style={{ height: `${h}px` }}
                />
              ))}
            </div>

            {/* Play/Pause Button */}
            <button
              onClick={togglePlay}
              className="w-8 h-8 rounded-full flex items-center justify-center bg-[#FEF08A] hover:bg-[#FACC15] text-[#713F12] transition-colors cursor-pointer shadow-sm font-bold"
              title={isPlaying ? 'Pause music' : 'Play music'}
              aria-label={isPlaying ? 'Pause music' : 'Play music'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
            </button>

            {/* Mute/Unmute Toggle */}
            <button
              onClick={toggleMute}
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#854D0E] hover:text-[#713F12] transition-colors cursor-pointer"
              title={isMuted ? 'Unmute' : 'Mute'}
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-[#EA580C]" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
