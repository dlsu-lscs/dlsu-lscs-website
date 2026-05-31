'use client';

import * as React from 'react';
import { motion } from 'framer-motion';

export default function PageHeader() {
  return (
    <header className="relative w-full pt-16 pb-8 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-start gap-4">
          {/* Gold gradient pill badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-[#DDB518] to-[#BC7A00] text-white shadow-sm shadow-[#ddb518]/25"
          >
            Latest Updates
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
            className="text-5xl md:text-7xl font-onest font-extrabold tracking-tight"
          >
            Press Releases
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
            className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl font-Poppins"
          >
            Stay informed with the latest news, announcements, and articles from the La Salle
            Computer Society.
          </motion.p>
        </div>
      </div>
    </header>
  );
}
