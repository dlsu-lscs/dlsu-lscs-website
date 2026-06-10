'use client';
import Image from 'next/image';
import BackgroundWord from '../components/background-word';
import BlueBackground from '../components/blue-background';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const, // easeOutExpo
    },
  },
};

export default function CoreValues() {
  return (
    <div className="lg:min-h-screen relative flex flex-col items-center justify-between p-8 sm:p-16">
      {/* Animated absolute image (Left) */}
      <motion.div
        initial={{ opacity: 0, x: -60, rotate: -5 }}
        whileInView={{ opacity: 1, x: 0, rotate: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.1 }}
        className="absolute -top-16 sm:-top-28 md:-top-36 z-20 left-0 w-24 md:w-75 h-auto"
      >
        <Image
          src="/macky1.png"
          alt="macky1"
          width={280}
          height={280}
          className="w-full h-auto antialiased"
        />
      </motion.div>

      {/* Animated absolute image (Right) */}
      <motion.div
        initial={{ opacity: 0, x: 60, rotate: 5 }}
        whileInView={{ opacity: 1, x: 0, rotate: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.1 }}
        className="absolute -top-20 sm:-top-28 md:-top-36 right-0 w-24 md:w-75 h-auto z-20"
      >
        <Image
          src="/macky2.png"
          alt="macky2"
          width={280}
          height={280}
          className="w-full h-auto z-20 antialiased"
        />
      </motion.div>

      <div className="absolute top-0 left-0 w-full h-1/2 flex justify-center">
        <BackgroundWord text="CORE" yOffset="0%" />
        <div
          className="absolute top-0 left-0 w-full h-60 pointer-events-none z-10"
          style={{
            WebkitMaskImage:
              'linear-gradient(to top, black 0%, black 30%, rgba(0,0,0,0.9) 30%, rgba(0,0,0,0.5) 60%, transparent 100%)',
            WebkitMaskRepeat: 'no-repeat',
            WebkitMaskSize: 'cover',
            backgroundColor: 'white',
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.1 }}
        className="z-30 translate-y-20"
      >
        <div className="top-0 flex flex-col items-center justify-center max-w-2xl mx-auto h-full text-center">
          <h1 className="md:text-5xl text-2xl font-extrabold mb-4">Our Core Values</h1>
          <p className="text-[18px]">
            The La Salle Computer Society shall serve as a venue for the growth and development of
            its member through a three-step course of:
          </p>
        </div>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={containerVariants}
        className="relative z-30 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-32 mb-26 items-stretch"
      >
        <motion.div variants={cardVariants}>
          <BlueBackground
            number="1"
            imageSrc="/purpose.png"
            imageAlt="Purpose"
            title="Purpose"
            description="to know and understand the reason behind every act, decision, and endeavor pursued."
          />
        </motion.div>

        <motion.div variants={cardVariants}>
          <BlueBackground
            number="2"
            imageSrc="/process.png"
            imageAlt="Process"
            title="Process"
            description="to organize and oversee the entire procedure of every project and make sure that each goes through very necessary step towards the purpose."
          />
        </motion.div>

        <motion.div variants={cardVariants}>
          <BlueBackground
            number="3"
            imageSrc="/excellence.png"
            imageAlt="Excellence"
            title="Excellence"
            description="to accomplish our goals in the best way possible and in accordance with the ideals of the organization and of De La Salle University Manila."
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
