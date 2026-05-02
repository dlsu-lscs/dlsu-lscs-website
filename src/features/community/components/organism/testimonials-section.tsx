'use client';

import * as React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import TestimonialCard from '@/features/community/components/molecules/testimonial-card';
import { TestimonialResponse } from '@/features/community/types';

interface TestimonialsSectionProps {
  testimonialsData: TestimonialResponse;
}

export default function TestimonialsSection({ testimonialsData }: TestimonialsSectionProps) {
  const testimonials = testimonialsData.docs;
  const slideCount = testimonials.length;
  const middleIndex = Math.floor(slideCount / 2);

  const [centeredIndex, setCenteredIndex] = React.useState(middleIndex);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'center',
      slidesToScroll: 1,
    },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );

  // Scroll to middle slide on mount so a card is centered
  React.useEffect(() => {
    if (!emblaApi) return;
    emblaApi.scrollTo(middleIndex, false);
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setCenteredIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on('select', onSelect);
    onSelect();

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = React.useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <h2 className="mb-8 text-center text-4xl font-bold">What Our Members Say</h2>

      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {testimonials.map((testimonial) => {
              const isHighlighted = testimonials.indexOf(testimonial) === centeredIndex;

              return (
                <div
                  key={testimonial.id}
                  className="min-w-0 flex-[0_0_100%] sm:flex-[0_0_calc(100%/3)]"
                >
                  <TestimonialCard testimonial={testimonial} isHighlighted={isHighlighted} />
                </div>
              );
            })}
          </div>
        </div>

        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow-md z-10"
          onClick={scrollPrev}
          aria-label="Previous testimonial"
        >
          &larr;
        </button>
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow-md z-10"
          onClick={scrollNext}
          aria-label="Next testimonial"
        >
          &rarr;
        </button>
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full ${
              index === centeredIndex ? 'bg-blue-600' : 'bg-gray-300'
            }`}
            onClick={() => scrollTo(index)}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
