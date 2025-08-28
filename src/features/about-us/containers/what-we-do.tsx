import Image from 'next/image';
import ImageGrid from '../components/image-grid';

export default function WhatWeDo() {
  const images = [
    { src: '/example1.png', alt: 'Example 1' },
    { src: '/example2.png', alt: 'Example 2' },
    { src: '/example3.png', alt: 'Example 3' },
    { src: '/example4.png', alt: 'Example 4' },
  ];
  return (
    <main className="relative z-20 flex min-h-screen w-full flex-col px-10 py-10 bg-[radial-gradient(circle_at_center,_#f5f5f5_0%,_#d9d9d9_70%,_#b3b3b3_100%)]">
      <div className="relative w-full min-h-screen mx-auto rounded-xl overflow-hidden flex">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A5D89] to-[#001E3B] z-0"></div>

        {/* unsure if dots should be png or tailwind, using image for now */}
        <Image
          src="/dots.png"
          alt="dots overlay"
          fill
          className="absolute top-0 left-0 z-10 pointer-events-none"
          style={{ objectFit: 'cover', transform: 'translate(-6rem, -8rem)' }}
        />

        <div className="relative z-20 flex w-full h-full">
          <div className="w-1/2 p-8 flex items-center justify-center mx-auto my-auto">
            <ImageGrid images={images} />
          </div>

          <div className="w-1/2 p-8 flex flex-col justify-start items-start mt-32 mr-20 pl-20 pr-2">
            {/* change font to poppins */}
            <h1 className="pt-10 text-[#FFFFFF] text-[58px] font-bold leading-none drop-shadow-2xl">
              What We Do
            </h1>
            <p className="text-[#FFFFFF] text-[24px] mt-4">
              LSCS holds many on-campus and off-campus activities for the college. Some of these
              on-campus activities include programming seminars, workshops, fund-raising programs,
              and bazaars. For off-campus activities, these include outreach programs, company
              career talks, and many more.
            </p>

            <Image
              src="/lscs.png"
              alt="LSCS logo"
              width={268}
              height={299}
              className="absolute top-9 right-10 -z-10"
              style={{ marginTop: '20px', marginRight: '20px' }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
