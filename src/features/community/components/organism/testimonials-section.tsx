'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
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
  const [api, setApi] = React.useState<CarouselApi | null>(null);

  // Scroll to middle slide on mount
  React.useEffect(() => {
    if (!api) return;
    api.scrollTo(middleIndex, false);
  }, [api, middleIndex]);

  React.useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCenteredIndex(api.selectedScrollSnap());
    };

    api.on('select', onSelect);
    onSelect();

    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      {/* Section header — above the carousel for better readability */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.05 }}
        className="flex flex-col items-center gap-3 mb-12"
      >
        <h2 className="text-center sm:text-5xl text-3xl font-extrabold font-Poppins tracking-tight">
          {'"Why Join LSCS?"'}
        </h2>
        <p className="text-center text-base text-muted-foreground max-w-md">
          Check out the testimonies of previous and current members of LSCS
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.05 }}
      >
        <Carousel
          opts={{
            loop: true,
            align: 'center',
            slidesToScroll: 1,
          }}
          plugins={[Autoplay({ delay: 5000, stopOnInteraction: false })]}
          setApi={setApi}
          className="relative"
        >
          <CarouselContent>
            {testimonials.map((testimonial) => {
              const isHighlighted = testimonials.indexOf(testimonial) === centeredIndex;

              return (
                <CarouselItem key={testimonial.id} className="pl-4 sm:basis-1/3">
                  <TestimonialCard testimonial={testimonial} isHighlighted={isHighlighted} />
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselNext className="mr-14 opacity-60 hover:opacity-100 transition-opacity" />
          <CarouselPrevious className="ml-14 opacity-60 hover:opacity-100 transition-opacity" />
        </Carousel>

        {/* Dot indicators for carousel position */}
        {slideCount > 1 && (
          <div className="flex justify-center gap-1.5 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => api?.scrollTo(i)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  i === centeredIndex
                    ? 'h-2 w-6 bg-[#ddb518]'
                    : 'h-2 w-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}
