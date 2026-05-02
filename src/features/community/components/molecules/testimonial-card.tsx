import * as React from 'react';
import Image from 'next/image';
import { Testimonial } from '@/features/community/types';
import { div } from 'framer-motion/client';

interface TestimonialCardProps {
  testimonial: Testimonial;
  isHighlighted?: boolean;
}

export default function TestimonialCard({
  testimonial,
  isHighlighted = false,
}: TestimonialCardProps) {
  return (
    <div
      className={`aspect-13/16 relative overflow-hidden rounded-lg bg-linear-to-b from-[rgba(221,181,24,0.9)] to-[rgba(119,97,13,0.9)] p-3 shadow-md transition-all duration-300 
        ${
          isHighlighted
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-50 translate-y-2 scale-90'
        }`}
    >
      <div className="relative h-full overflow-hidden rounded-[7px] drop-shadow-2xl inset-shadow-2xs">
        {/* Full card background image */}
        <div className="absolute inset-0">
          <Image
            src={testimonial.image?.url || '/images/placeholder.jpg'}
            alt={testimonial.image?.alt || testimonial.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
            }}
          />
          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
        </div>

        {/* Content overlay */}
        <div className="relative z-10 flex h-full flex-col justify-end p-6 text-white">
          <blockquote className="line-clamp-4 italic text-sm">
            &ldquo;{testimonial.testimony}&rdquo;
          </blockquote>

          <div className="mt-8 text-right">
            <h4 className="font-semibold text-lg">{testimonial.name}</h4>
            <p className="text-sm opacity-90">
              {testimonial.position} • {testimonial.committee} • {testimonial['id-number']}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
