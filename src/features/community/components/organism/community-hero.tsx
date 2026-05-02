'use client';

import { Button } from '@/components/ui/button';
import { useCallback } from 'react';

export default function CommunityHero() {
  const scrollToOfficers = useCallback(() => {
    const section = document.getElementById('officers-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);

  return (
    <div
      className="flex p-4 text-white items-center justify-center min-h-screen relative w-full overflow-x-hidden bg-center bg-cover"
      style={{
        backgroundImage: `url('/cover/Web_Cover.jpg')`,
      }}
    >
      <div className="absolute inset-0 p-2 w-full bg-[#002D57]/70" />
      <div className="flex items-center justify-center flex-col z-10 mb-12 gap-6">
        <h1 className="md:text-7xl text-5xl font-bold font-onest">Community</h1>
        <p className="font-Poppins text-lg text-center max-w-2xl">
          Be part of our growing community to gain exceptional skills and unforgettable experiences.
        </p>
        <Button
          className="font-Poppins cursor-pointer font-bold text-xl sm:text-2xl w-72 rounded-4xl py-6 bg-linear-180 from-[#ddb518] to-[#77610d]"
          onClick={scrollToOfficers}
        >
          LEARN MORE
        </Button>
      </div>
    </div>
  );
}
