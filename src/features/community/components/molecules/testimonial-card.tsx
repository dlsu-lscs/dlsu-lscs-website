import * as React from 'react';
import Image from 'next/image';
import { Testimonial } from '@/features/community/types';

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
      className={`aspect-13/16 relative overflow-hidden rounded-xl bg-linear-to-b from-[rgba(221,181,24,0.9)] to-[rgba(119,97,13,0.9)] p-3 shadow-md transition-all duration-500 ease-out
        ${
          isHighlighted
            ? 'opacity-100 translate-y-0 scale-100 shadow-lg shadow-[#ddb518]/20'
            : 'opacity-40 translate-y-2 scale-90'
        }`}
    >
      <div className="relative h-full overflow-hidden rounded-lg drop-shadow-2xl inset-shadow-2xs">
        {/* Full card background image */}
        <div className="absolute inset-0">
          <Image
            src={testimonial.image?.url || '/images/placeholder-profile.png'}
            alt={testimonial.image?.alt || testimonial.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/images/placeholder-profile.png';
            }}
          />
          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/40 to-transparent" />
        </div>

        {/* Content overlay */}
        <div className="relative z-10 flex h-full flex-col justify-end p-6 text-white">
          <blockquote className="line-clamp-4 italic text-sm leading-relaxed text-white/95">
            &ldquo;{testimonial.testimony}&rdquo;
          </blockquote>

          <div className="mt-6 border-t border-white/20 pt-4 text-right">
            <h3 className="font-semibold text-lg">{testimonial.name}</h3>
            <p className="text-sm text-white/80">
              {testimonial.position} • {testimonial.committee} • {testimonial['id-number']}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
