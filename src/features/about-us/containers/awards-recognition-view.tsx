import AwardsCard from '../components/awards-card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';
import awardDate from '../data/awards.json';
import { awards as AwardsType } from '../types/awards';

export default function AwardsRecognitionView() {
  const mid = Math.ceil(awardDate.awards.length / 2);
  const firstHalf: AwardsType[] = awardDate.awards.slice(0, mid);
  const secondHalf: AwardsType[] = awardDate.awards.slice(mid);

  return (
    <>
      <main className="relative z-20 min-h-screen bg-gradient-to-b from-[#003D6F] to-[#041019] flex flex-col items-center justify-center">
        <Image
          src="/puzzle.png"
          alt="puzzle"
          width={380}
          height={380}
          className="absolute -top-24 left-0 w-[200px] md:w-[380px] h-auto -z-10 md:z-0 object-contain"
        />

        {/* Dots BG */}
        <div
          className="absolute inset-0 bg-[url('/dots.png')] bg-cover bg-left-top min-h-screen opacity-60"
          style={{
            maskImage: 'radial-gradient(ellipse 90% 85% at center, black 30%, transparent 90%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 90% 85% at center, black 30%, transparent 90%)',
            zIndex: -1,
          }}
        />
        <header className="flex flex-col gap-10">
          <h1
            className="text-[#FEE373] font-bold px-2 text-4xl md:text-5xl text-center"
            style={{ textShadow: '3px 3px 7px rgba(0,0,0,0.8)' }}
          >
            Awards <span className="text-[#003D6F]">&</span> Recognition
          </h1>

          <p className="text-center text-[#FFFF] text-wrap px-4 text-md md:text-lg">
            The La Salle Computer Society shall serve as a venue for the growth and
            <br /> development of its member through a three-step course of:
          </p>
        </header>
        <section className="w-[75%] sm:w-[90%] lg:w-[85%] mx-auto mt-12">
          {firstHalf.length > 0 ? (
            <Carousel>
              <CarouselContent className="py-4 flex justify-center md:justify-start gap-6 overflow-visible">
                {firstHalf.map((award, index) => (
                  <CarouselItem
                    key={index}
                    className="flex-none basis-[85%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                  >
                    <AwardsCard
                      standing={award.standing}
                      awardCommmittee={award.awardCommmittee}
                      awardName={award.awardName}
                      awardType={award.awardType}
                      academicYear={award.academicYear}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious /> <CarouselNext />
            </Carousel>
          ) : null}

          {secondHalf.length > 0 ? (
            <Carousel>
              <CarouselContent className="py-4 flex justify-center md:justify-start gap-6 overflow-visible">
                {secondHalf.map((award, index) => (
                  <CarouselItem
                    key={index}
                    className="flex-none basis-[85%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                  >
                    <AwardsCard
                      standing={award.standing}
                      awardCommmittee={award.awardCommmittee}
                      awardName={award.awardName}
                      awardType={award.awardType}
                      academicYear={award.academicYear}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious /> <CarouselNext />
            </Carousel>
          ) : null}
        </section>
      </main>
    </>
  );
}
