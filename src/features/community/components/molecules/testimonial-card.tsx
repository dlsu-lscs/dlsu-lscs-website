import * as React from 'react';
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
      className={`relative overflow-hidden rounded-lg shadow-md transition-all duration-300 ${
        isHighlighted ? 'opacity-100 translate-y-0 scale-100' : 'opacity-50 translate-y-2 scale-95'
      }`}
      style={{ aspectRatio: '9/16' }}
    >
      {/* Full card background image */}
      <div className="absolute inset-0">
        <img
          src={testimonial.image?.url || '/images/placeholder.jpg'}
          alt={testimonial.image?.alt || testimonial.name}
          className="h-full w-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
          }}
        />
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 flex h-full flex-col justify-end p-6 text-white">
        <div className="mb-4">
          <h4 className="font-semibold">{testimonial.name}</h4>
          <p className="text-sm opacity-90">
            {testimonial.position} • {testimonial.committee}
          </p>
        </div>

        <blockquote className="line-clamp-4 italic text-sm">
          &ldquo;{testimonial.testimony}&rdquo;
        </blockquote>

        <p className="mt-2 text-right text-xs opacity-70">ID: {testimonial['id-number']}</p>
      </div>
    </div>
  );
}
