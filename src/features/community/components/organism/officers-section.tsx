import * as React from 'react';
import OfficerCard from '@/features/community/components/molecules/officer-card';
import { Officer } from '@/features/community/types';

interface OfficersSectionProps {
  officers: Officer[];
}

export default function OfficersSection({ officers }: OfficersSectionProps) {
  const executiveAndVPs = officers.filter(
    (officer) => officer.position === 'Executive Core' || officer.position.startsWith('VP for')
  );

  return (
    <section className="mx-auto max-w-7xl px-4 py-16" id="officers-section">
      <div className="text-white font-Poppins mb-8 cursor-pointer font-bold text-lg text-center rounded-4xl py px-6 mx-auto w-fit bg-linear-180 from-[#ddb518] to-[#77610d]">
        COMMUNITY
      </div>
      <h2 className="mb-8 text-center text-5xl font-extrabold font-Poppins">BEYOND MEMBERSHIP</h2>
      <p className="text-lg text-center">Meet the present Officers per committee:</p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {executiveAndVPs.map((officer) => (
          <OfficerCard key={officer.id} officer={officer} />
        ))}
      </div>
    </section>
  );
}
