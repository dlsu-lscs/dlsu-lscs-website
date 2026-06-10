'use client';
import AwardsCard from '../components/awards-card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import { CmsAward } from '../types/awards';
import ScrollAnimation from '@/components/animation/scroll-animation';

interface AwardsRecognitionViewProps {
  awards: CmsAward[];
}

export default function AwardsRecognitionView({ awards }: AwardsRecognitionViewProps) {
  const mid = Math.ceil(awards.length / 2);
  const firstHalf: CmsAward[] = awards.slice(0, mid);
  const secondHalf: CmsAward[] = awards.slice(mid);

  return (
    <>
      <main className="relative z-20 min-h-screen bg-linear-to-b from-[#003D6F] to-[#041019] flex flex-col items-center justify-center">
        <ScrollAnimation className="absolute -top-24 left-0 w-50 md:w-96 h-auto -z-10 md:z-0">
          <Image
            src="/puzzle.png"
            alt="puzzle"
            width={380}
            height={0}
            className="w-full h-auto antialiased"
          />
        </ScrollAnimation>

        {/* Dots BG */}
        <div
          className="absolute inset-0 bg-[url('/dots.png')] bg-cover bg-top-left min-h-screen opacity-60"
          style={{
            maskImage: 'radial-gradient(ellipse 90% 85% at center, black 30%, transparent 90%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 90% 85% at center, black 30%, transparent 90%)',
            zIndex: -1,
          }}
        />

        <ScrollAnimation>
          <header className="flex flex-col gap-6">
            <h1
              className="text-[#FEE373] font-bold px-2 text-4xl md:text-5xl text-center"
              style={{ textShadow: '3px 3px 7px rgba(0,0,0,0.8)' }}
            >
              Awards <span className="text-[#003D6F]">&</span> Recognition
            </h1>

            <p className="font-geist text-center text-[#FFFF] text-wrap px-4 text-md md:text-lg font-semibold">
              Awards received this AY 2025-2026
            </p>
          </header>
        </ScrollAnimation>

        <ScrollAnimation className="w-[75%] sm:w-[90%] lg:w-[85%] mx-auto mt-12" delay={0.15}>
          <section className="w-full">
            {firstHalf.length > 0 ? (
              <Carousel
                opts={{ loop: true }}
                plugins={[
                  Autoplay({
                    delay: 4000,
                  }),
                ]}
              >
                <CarouselContent className="py-4 flex justify-start gap-6 overflow-visible">
                  {firstHalf.map((award) => (
                    <CarouselItem
                      key={award.id}
                      className="flex-none min-w-65 sm:min-w-75 md:min-w-70 lg:min-w-65"
                    >
                      <AwardsCard {...award} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            ) : null}

            {secondHalf.length > 0 ? (
              <Carousel
                opts={{ loop: true }}
                plugins={[
                  Autoplay({
                    delay: 8000,
                  }),
                ]}
              >
                <CarouselContent className="py-4 flex justify-start gap-6 overflow-visible">
                  {secondHalf.map((award) => (
                    <CarouselItem
                      key={award.id}
                      className="flex-none min-w-65 sm:min-w-75 md:min-w-70 lg:min-w-65"
                    >
                      <AwardsCard {...award} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            ) : null}
          </section>
        </ScrollAnimation>
      </main>
    </>
  );
}
