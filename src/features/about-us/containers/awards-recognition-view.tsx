import AwardsCard from '../components/awards-card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import awardDate from '../data/awards.json';
import { awards as AwardsType } from '../types/awards';

export default function AwardsRecognitionView() {
  const mid = Math.ceil(awardDate.awards.length / 2);
  const firstHalf: AwardsType[] = awardDate.awards.slice(0, mid);
  const secondHalf: AwardsType[] = awardDate.awards.slice(mid);

  return (
    <>
      <div className="relative z-20 min-h-screen min-w-screen bg-gradient-to-b from-[#003D6F] to-[#041019] flex flex-col items-center justify-center">
        <img src="/puzzle.png" alt="puzzle" className="absolute -top-24 left-0 w-[380px] h-auto" />
        <div
          className="absolute inset-0 bg-[url('/dots.png')] bg-cover bg-left-top min-h-screen opacity-60"
          style={{
            maskImage: 'radial-gradient(ellipse 90% 85% at center, black 30%, transparent 90%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 90% 85% at center, black 30%, transparent 90%)',
            zIndex: -1,
          }}
        />

        <div className="flex flex-col gap-10">
          <h1
            className="text-[#FEE373] font-bold text-5xl text-center"
            style={{ textShadow: '3px 3px 7px rgba(0,0,0,0.8)' }}
          >
            Awards <span className="text-[#003D6F]">&</span> Recognition
          </h1>

          <p className="text-center text-[#FFFF] text-lg w-[540px] h-[186px]">
            The La Salle Computer Society shall serve as a venue for the growth and development of
            its member through a three-step course of:
          </p>
        </div>
        <main className="w-[94%]">
          {firstHalf.length > 0 ? (
            <Carousel>
              <CarouselContent className="p-4 -ml-1">
                {firstHalf.map((award, index) => (
                  <CarouselItem key={index} className="basis-1/4 px-2">
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
            <>
              <Carousel>
                <CarouselContent className="p-4 -ml-1">
                  {secondHalf.map((award, index) => (
                    <CarouselItem key={index} className="basis-1/4 px-2">
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
            </>
          ) : null}
        </main>
      </div>
    </>
  );
}
