import PressReleaseCard from '../components/press-release-card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import pressReleasesData from '../data/press-releases.json';
import { pressRelease as PressReleaseType } from '../types/press-releases';

export default function PressReleaseView() {
  return (
    <>
      <div className="min-h-screen min-w-screen bg-white border-black border-2">
        <div className="flex justify-center text-center mt-20">
          <h1 className="font-bold text-5xl">PRESS RELEASES</h1>
        </div>
        <main className="w-[95%] px-20 py-24">
          <Carousel>
            <CarouselContent>
              {pressReleasesData.pressReleases.map((pressRelease: PressReleaseType, index) => (
                <CarouselItem key={index} className="basis-1/4">
                  <PressReleaseCard
                    type={pressRelease.type}
                    title={pressRelease.title}
                    content={pressRelease.content}
                    buttonText={pressRelease.buttonText}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </main>
      </div>
    </>
  );
}
