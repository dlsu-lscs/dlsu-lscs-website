'use client';

import { motion } from 'framer-motion';

type ScrollAnimationProps = {
  children: React.ReactNode;
};

export default function ScrollAnimation({ children }: ScrollAnimationProps) {
  return (
    <motion.div
      className="snap-start"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      viewport={{ amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
