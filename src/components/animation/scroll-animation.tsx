'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type ScrollAnimationProps = {
  children: React.ReactNode;
  offsetY?: number;
  offsetX?: number;
  scale?: number;
  duration?: number;
  delay?: number;
  ease?: NonNullable<React.ComponentProps<typeof motion.div>['transition']>['ease'];
  viewportAmount?: number;
  once?: boolean;
  className?: string;
};

export default function ScrollAnimation({
  children,
  offsetY = 40,
  offsetX = 0,
  scale = 1,
  duration = 1,
  delay = 0,
  ease = [0.16, 1, 0.3, 1], // Ultra-smooth easeOutExpo bezier curve
  viewportAmount = 0.2,
  once = true,
  className,
}: ScrollAnimationProps) {
  return (
    <motion.div
      className={cn('relative z-10 overflow-visible', className)}
      initial={{ opacity: 0, y: offsetY, x: offsetX, scale }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      transition={{
        duration,
        delay,
        ease,
      }}
      viewport={{ once, amount: viewportAmount }}
    >
      {children}
    </motion.div>
  );
}
