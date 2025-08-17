import Image from 'next/image';

export default function WhatWeDo() {
  return (
    <div className="min-h-screen flex items-center justify-between">
      <div className="relative w-[98%] h-screen mx-auto my-16 rounded-xl overflow-hidden flex">
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
          <div className="w-1/2 p-8 flex items-center justify-center"></div>

          <div className="w-1/2 p-8 flex flex-col justify-start items-start mt-32 mr-20">
            {/* change font to poppins */}
            <h1 className="text-[#FFFFFF] text-[48px] font-extrabold leading-none drop-shadow-2xl">
              What We Do
            </h1>
            <p className="text-[#FFFFFF] text-[20px] mt-4">
              LSCS holds many on-campus and off-campus activities for the college. Some of these
              on-campus activities include programming seminars, workshops, fund-raising programs,
              and bazaars. For off-campus activities, these include outreach programs, company
              career talks, and many more.
            </p>

            <Image
              src="/lscs.png"
              alt="Right side illustration"
              width={232}
              height={259}
              className="absolute top-10 right-10 -z-10"
              style={{ marginTop: '20px', marginRight: '20px' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
