'use client';

import HorizontalLscsBg from '../../../components/horizontal-lscs-bg';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import Image from 'next/image';
import { CmsImage } from '../../home/services/getWebAssets';

interface AboutProps {
  aboutImages?: Array<{
    id: string;
    image: CmsImage;
  }>;
}

export default function About({ aboutImages }: AboutProps) {
  const defaultImages = [
    {
      url: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=600&h=800&fit=crop',
      label: 'Programming workspace',
    },
    {
      url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=200&fit=crop',
      label: 'Code on laptop',
    },
    {
      url: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=400&h=200&fit=crop',
      label: 'Team collaboration',
    },
    {
      url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=400&fit=crop',
      label: 'Students learning',
    },
    {
      url: 'https://plus.unsplash.com/premium_photo-1678566111481-8e275550b700?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      label: 'Screen',
    },
    {
      url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=200&fit=crop',
      label: 'Computer setup',
    },
    {
      url: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&h=200&fit=crop',
      label: 'Developer coding',
    },
  ];

  const images =
    aboutImages && aboutImages.length > 0
      ? aboutImages.map((item) => ({
          url: item.image.url,
          label: item.image.alt || 'About image',
        }))
      : defaultImages;

  return (
    <>
      <div className="min-h-screen relative flex items-center justify-between p-8 sm:p-16">
        {/* Background image with fade mask */}
        <HorizontalLscsBg />
        {/* Content */}
        <main className="flex flex-wrap gap-8">
          <section
            className="flex flex-col flex-1 gap-8 justify-center
          "
          >
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
                is the pioneering organization in the College of Computer Studies now on its 38th
                year of service for the Lasallian community. Developing members to become competent
                and well-rounded Lasallians who are aware of the numerous advances in computer
                technology.
              </p>
            </div>
          </section>
          <section className="flex-1">
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
              gutterBreakPoints={{ 350: '12px', 750: '16px', 900: '24px' }}
            >
              <Masonry>
                {images.map((image, index) => (
                  <div key={index} className="relative rounded-lg shadow-lg overflow-hidden">
                    <Image
                      src={image.url}
                      alt={image.label}
                      width={400}
                      height={300}
                      className="w-full h-auto rounded-lg object-cover"
                    />
                  </div>
                ))}
              </Masonry>
            </ResponsiveMasonry>
          </section>
        </main>
      </div>
    </>
  );
}
