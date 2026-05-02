'use client';

import * as React from 'react';
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
    <section className="mx-auto max-w-7xl px-4 py-16 min-h-screen">
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
        <CarouselNext className="mr-14 opacity-40" />
        <CarouselPrevious className="ml-14 opacity-40" />
      </Carousel>

      <h2 className="mb-8 text-center sm:text-4xl text-3xl font-bold font-Poppins mt-8">
        {'"Why Join LSCS?"'}
      </h2>
      <p className="text-center -mt-8 text-base">
        Check out the testimonies of previous and current members of LSCS
      </p>
    </section>
  );
}
