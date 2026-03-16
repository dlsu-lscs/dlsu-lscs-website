'use client';

import HorizontalLscsBg from '../../../components/horizontal-lscs-bg';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import Image from 'next/image';
import { CmsImage } from '../../home/services/getWebAssets';

interface AboutProps {
  aboutImages?: {
    id: string;
    image: CmsImage;
  }[];
}

export default function About({ aboutImages }: AboutProps) {
  return (
    <>
      <div className="min-h-screen relative flex items-center justify-between p-8 sm:p-16">
        {/* Background image with fade mask */}
        <HorizontalLscsBg />
        {/* Content */}
        <main className="flex flex-wrap gap-8">
          <section className="flex flex-col flex-1 gap-8 justify-center">
            <h1 className=" self-start flex bg-linear-to-r from-[#DDB518] to-[#AA8B12] text-white font-bold px-4 py-1.5 rounded-lg text-[18px] tracking-wider drop-shadow-2xl ">
              ABOUT US
            </h1>

            <div className="text-[#003D6F] sm:text-7xl text-5xl font-extrabold leading-none drop-shadow-lg">
              <h1 className="drop-shadow-lg">LA SALLE</h1>
              <h1 className="drop-shadow-lg">COMPUTER</h1>
              <h1 className="drop-shadow-lg">SOCIETY</h1>
            </div>

            <div>
              <p className="text-lg mr-8">
                is the pioneering organization in the College of Computer Studies now in its 40th
                year of service for the Lasallian community. We are committed to developing members
                to become competent and well-rounded Lasallians who are aware of the numerous
                advances in computer studies.
              </p>
            </div>
          </section>
          <section className="flex-1 flex items-center justify-center">
            <Image
              src={aboutImages ? aboutImages[0].image.url : '/40th_logo.png'}
              alt={aboutImages ? aboutImages[0].image.alt : 'logo'}
              width={600}
              height={600}
            />
          </section>
        </main>
      </div>
    </>
  );
}
