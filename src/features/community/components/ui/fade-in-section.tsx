'use client';

import { motion } from 'framer-motion';

interface FadeInSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Lightweight fade-in + slide-up animation triggered when the element
 * enters the viewport. Uses `once: true` so the animation only plays
 * on first appearance, and a low `amount` threshold to work reliably
 * with programmatic scrolling and snap-mandatory layouts.
 */
export default function FadeInSection({ children, className, delay = 0 }: FadeInSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.05 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
