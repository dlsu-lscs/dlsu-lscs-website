import Image from 'next/image';
import ImageGrid from '../components/image-grid';
import { CmsImage } from '../../home/services/getWebAssets';
import ScrollAnimation from '@/components/animation/scroll-animation';

interface WhatWeDoProps {
  whatWeDoImages?: {
    image1: CmsImage;
    image2: CmsImage;
    image3: CmsImage;
    image4: CmsImage;
  };
}

export default function WhatWeDo({ whatWeDoImages }: WhatWeDoProps) {
  const defaultImages = [
    { src: '/example1.png', alt: 'Example 1' },
    { src: '/example2.png', alt: 'Example 2' },
    { src: '/example3.png', alt: 'Example 3' },
    { src: '/example4.png', alt: 'Example 4' },
  ];

  const images = whatWeDoImages
    ? [
        { src: whatWeDoImages.image1.url, alt: whatWeDoImages.image1.alt || 'What we do image 1' },
        { src: whatWeDoImages.image2.url, alt: whatWeDoImages.image2.alt || 'What we do image 2' },
        { src: whatWeDoImages.image3.url, alt: whatWeDoImages.image3.alt || 'What we do image 3' },
        { src: whatWeDoImages.image4.url, alt: whatWeDoImages.image4.alt || 'What we do image 4' },
      ]
    : defaultImages;

  return (
    <main className="relative z-20 flex min-h-screen w-full flex-col  sm:p-10 bg-linear-to-b from-[#f5f5f5] via-[#d9d9d9] to-[#b3b3b3]">
      <div className="relative w-full min-h-screen mx-auto sm:rounded-xl py-10 sm:py-8 overflow-hidden flex">
        <div className="absolute inset-0 bg-linear-to-b from-[#1A5D89] to-[#001E3B] z-0"></div>

        <Image
          src="/dots.png"
          alt="dots overlay"
          fill
          className="absolute top-0 left-0 z-10 pointer-events-none object-cover"
          style={{ transform: 'translate3d(-6rem, -8rem, 0)', willChange: 'transform' }}
        />

        <div className="relative z-20 flex flex-col lg:flex-row w-full h-full">
          <ScrollAnimation className="w-full lg:w-1/2 flex justify-center items-center p-4 md:p-8">
            <ImageGrid images={images} />
          </ScrollAnimation>

          <ScrollAnimation
            className="w-full lg:w-1/2 p-6 md:p-12 flex flex-col justify-center items-center md:items-start text-center md:text-left"
            delay={0.15}
          >
            <h1 className="text-[#FFFFFF] text-3xl sm:text-4xl md:text-[58px] font-bold leading-tight drop-shadow-2xl">
              What We Do
            </h1>
            <p className="text-[#FFFFFF] text-base sm:text-lg md:text-[24px] mt-4 max-w-xl">
              LSCS hold various activities, events, and projects, whether it be for the College of
              Computer Studies, general DLSU student body, or wider computer science community.
              These initiatives include academic workshops, career seminars, recreational
              activities, training programs, fundraising events, hackathons and contests, and
              socio-civic advocacy promotions.
            </p>
          </ScrollAnimation>

          <Image
            src="/lscs.png"
            alt="LSCS logo"
            width={240}
            height={267}
            className={`
              block mx-auto mt-2 w-30 h-33.5 sm:w-40 sm:h-44.5
              lg:absolute md:top-10 md:right-12 md:w-60 md:h-66.75 
              md:-z-10
            `}
            priority
          />
        </div>
      </div>
    </main>
  );
}
