'use client';

import HorizontalLscsBg from '../../../components/horizontal-lscs-bg';
import Image from 'next/image';
import { CmsImage } from '../../home/services/getWebAssets';
import { motion } from 'framer-motion';

interface AboutProps {
  aboutImages?: {
    id: string;
    image: CmsImage;
  }[];
}

export default function About({ aboutImages }: AboutProps) {
  return (
    <>
      <div className="min-h-screen relative flex items-center justify-between p-8 sm:p-16 overflow-hidden">
        {/* Background image with fade mask */}
        <HorizontalLscsBg />
        {/* Content */}
        <main className="flex flex-wrap gap-8 w-full z-10">
          <section className="flex flex-col flex-1 gap-8 justify-center">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="self-start flex bg-linear-to-r from-[#DDB518] to-[#AA8B12] text-white font-bold px-4 py-1.5 rounded-lg text-[18px] tracking-wider shadow-lg shadow-[#DDB518]/25"
            >
              ABOUT US
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
              className="text-[#003D6F] sm:text-7xl text-5xl font-extrabold leading-none drop-shadow-md will-change-transform"
            >
              <h1>LA SALLE</h1>
              <h1>COMPUTER</h1>
              <h1>SOCIETY</h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            >
              <p className="text-lg mr-8 text-justify leading-relaxed">
                is the pioneering organization in the College of Computer Studies now in its 40th
                year of service for the Lasallian community. We are committed to developing members
                to become competent and well-rounded Lasallians who are aware of the numerous
                advances in computer studies.
              </p>
            </motion.div>
          </section>

          <motion.section
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
            className="flex-1 flex items-center justify-center min-w-48"
          >
            <div className="relative hover:scale-105 transition-transform will-change-transform duration-500 ease-in-out">
              <Image
                src={aboutImages ? aboutImages[0].image.url : '/40th_logo.png'}
                alt={aboutImages ? aboutImages[0].image.alt : 'logo'}
                className="drop-shadow-2xl"
                width={600}
                height={600}
                style={{ width: 'auto', height: 'auto' }}
                loading="eager"
              />
            </div>
          </motion.section>
        </main>
      </div>
    </>
  );
}
