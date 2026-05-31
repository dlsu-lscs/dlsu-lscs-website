'use client';

import { motion } from 'framer-motion';

type ScrollAnimationProps = {
  children: React.ReactNode;
};

export default function ScrollAnimation({ children }: ScrollAnimationProps) {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.1 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
