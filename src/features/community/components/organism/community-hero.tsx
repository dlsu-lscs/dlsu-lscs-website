'use client';

import { Button } from '@/components/ui/button';
import { useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useLenis } from 'lenis/react';

export default function CommunityHero() {
  const lenis = useLenis();

  const scrollToOfficers = useCallback(() => {
    if (lenis) {
      lenis.scrollTo('#officers-section');
    } else {
      const section = document.getElementById('officers-section');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [lenis]);

  return (
    <div
      className="flex p-4 text-white items-center justify-center min-h-screen relative w-full overflow-x-hidden bg-center bg-cover"
      style={{
        backgroundImage: `url('/cover/Web_Cover.jpg')`,
      }}
    >
      {/* Multi-layer overlay for depth */}
      <div className="absolute inset-0 w-full bg-[#002D57]/75" />
      <div className="absolute inset-0 w-full bg-linear-to-b from-transparent via-transparent to-black/30" />

      <div className="flex items-center justify-center flex-col z-10 mb-12 gap-8">
        {/* Animated badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
          className="rounded-full border border-white/25 bg-white/20 px-5 py-1.5 text-sm font-medium uppercase tracking-widest"
        >
          La Salle Computer Society
        </motion.div>

        {/* Animated heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
          className="md:text-8xl text-5xl font-bold font-onest tracking-tight text-center"
        >
          Community
        </motion.h1>

        {/* Animated subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6, ease: 'easeOut' }}
          className="font-Poppins text-lg text-center max-w-2xl text-white/90 leading-relaxed"
        >
          Be part of our growing community to gain exceptional skills and unforgettable experiences.
        </motion.p>

        {/* Animated CTA button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8, ease: 'easeOut' }}
        >
          <Button
            className="font-Poppins cursor-pointer font-bold text-xl sm:text-2xl w-72 rounded-4xl py-6
              bg-linear-180 from-[#ddb518] to-[#77610d]
              shadow-lg shadow-[#ddb518]/20
              transition-[transform,box-shadow,filter] duration-300 will-change-transform
              hover:shadow-xl hover:shadow-[#ddb518]/30 hover:scale-105 hover:brightness-110
              active:scale-95"
            onClick={scrollToOfficers}
          >
            LEARN MORE
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
