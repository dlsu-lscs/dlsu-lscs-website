import Image from 'next/image';
import ImageGrid from '../components/image-grid';
import { CmsImage } from '../../home/services/getWebAssets';

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
    <main className="relative z-20 flex min-h-screen w-full flex-col px-6 sm:px-10 py-10 bg-[radial-gradient(circle_at_center,_#f5f5f5_0%,_#d9d9d9_70%,_#b3b3b3_100%)]">
      <div className="relative w-full min-h-screen mx-auto rounded-xl overflow-hidden flex">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A5D89] to-[#001E3B] z-0"></div>

        <Image
          src="/dots.png"
          alt="dots overlay"
          fill
          className="absolute top-0 left-0 z-10 pointer-events-none object-cover"
          style={{ transform: 'translate(-6rem, -8rem)' }}
        />

        <div className="relative z-20 flex flex-col md:flex-row w-full h-full">
          <div className="w-full md:w-1/2 flex justify-center items-center p-4 md:p-8">
            <ImageGrid images={images} />
          </div>

          <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center items-center md:items-start text-center md:text-left">
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
          </div>

          <Image
            src="/lscs.png"
            alt="LSCS logo"
            width={268}
            height={299}
            className={`
              block mx-auto mt-2 w-[120px] h-[130px] sm:w-[160px] sm:h-[180px]
              md:absolute md:top-10 md:right-12 md:w-[268px] md:h-[299px] 
              md:-z-10
            `}
            priority
          />
        </div>
      </div>
    </main>
  );
}
