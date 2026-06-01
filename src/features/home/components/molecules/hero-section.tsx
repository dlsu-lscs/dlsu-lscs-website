'use client';

import { TriangleDownIcon } from '@radix-ui/react-icons';
import { CmsImage } from '../../services/getWebAssets';
import { useLenis } from 'lenis/react';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  heroImage?: CmsImage;
}

export default function HeroSection({ heroImage }: HeroSectionProps) {
  const lenis = useLenis();

  const handleScrollDown = () => {
    if (lenis) {
      lenis.scrollTo(window.innerHeight - 80);
    } else {
      window.scrollBy({
        top: window.innerHeight - 80,
        behavior: 'smooth',
      });
    }
  };

  const backgroundImageUrl = heroImage?.url || '/misc/lscs-people.png';

  return (
    <main className="w-full max-w-9xl mx-auto h-full flex-1 relative flex">
      {/* Masked background container */}
      <div
        className="absolute inset-0 mask-semicircle p-2 w-full gap-2 sm:rounded-2xl bg-center bg-cover"
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
        }}
      />
      <div className="absolute inset-0 mask-semicircle p-2 w-full gap-2 bg-black/60 sm:rounded-2xl" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center flex-1 p-2 gap-2">
        <motion.h1
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-[#EDCC46] font-onest font-extrabold text-base sm:text-xl md:text-3xl text-center leading-tight sm:leading-snug mb-2"
        >
          LA SALLE COMPUTER SOCIETY
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          className="mb-8 sm:mb-10 md:mb-12 font-onest text-white font-bold text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-center whitespace-pre-line leading-tight sm:leading-snug"
        >
          {`Living Yesterday's Vision,\nSetting Today's Trends,\nInspiring Tomorrow's Leaders.`}
        </motion.h2>
      </div>

      {/* Circle shape at bottom */}
      <motion.div
        onClick={handleScrollDown}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.96 }}
        className="absolute left-1/2 -translate-x-1/2 bottom-0 md:w-40 md:h-20 sm:w-32 sm:h-16 h-10 w-20 flex justify-center items-center rounded-t-full z-20 bg-gradient-to-b from-[#DDB518] to-[#77610D] shadow-[4px_4px_4px_rgba(0,0,0,0.25)] cursor-pointer"
      >
        <TriangleDownIcon className="text-white md:w-24 md:h-24 sm:w-20 sm:h-20 w-16 h-16" />
      </motion.div>
    </main>
  );
}
