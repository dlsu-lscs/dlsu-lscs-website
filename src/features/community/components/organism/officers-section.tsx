'use client';

import * as React from 'react';
import OfficerCard from '@/features/community/components/molecules/officer-card';
import { Officer } from '@/features/community/types';

interface OfficersSectionProps {
  officers: Officer[];
}

export default function OfficersSection({ officers }: OfficersSectionProps) {
  const president = officers.find((o) => o.position === 'President');
  const evps = officers.filter((o) => o.position === 'EVP');

  // Group VPs by committee
  const vps = officers.filter((o) => o.position === 'VP');
  const vpsByCommittee = React.useMemo(() => {
    const grouped: Record<string, Officer[]> = {};
    vps.forEach((vp) => {
      const key = vp.committeeId || vp.committee;
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(vp);
    });
    return grouped;
  }, [vps]);

  // Counter for cycling through VPs
  const [cycleCount, setCycleCount] = React.useState(0);

  // Check if there are any committees with multiple VPs
  const hasMultipleVps = React.useMemo(() => {
    return Object.values(vpsByCommittee).some((committeeVps) => committeeVps.length > 1);
  }, [vpsByCommittee]);

  // Cycle through VPs every 5 seconds (only if there are multiple VPs)
  React.useEffect(() => {
    if (!hasMultipleVps) return;

    const interval = setInterval(() => {
      setCycleCount((prev) => prev + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, [hasMultipleVps]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16" id="officers-section">
      <div className="text-white font-Poppins mb-8 cursor-pointer font-bold text-lg text-center rounded-4xl py px-6 mx-auto w-fit bg-linear-180 from-[#ddb518] to-[#77610d]">
        COMMUNITY
      </div>
      <h2 className="mb-8 text-center text-5xl font-extrabold font-Poppins">BEYOND MEMBERSHIP</h2>
      <p className="text-lg text-center -mt-8 mb-8">Meet the present Officers per committee:</p>

      {/* President - prominent display */}
      {president && (
        <div className="mb-12 flex justify-center">
          <div className="w-full max-w-sm">
            <OfficerCard officer={president} isPresident />
          </div>
        </div>
      )}

      {/* EVPs Grid */}
      {evps.length > 0 && (
        <div className="mb-12">
          <div className="grid grid-cols-1 sm:gap-12 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {evps.map((officer) => (
              <OfficerCard key={officer.id} officer={officer} />
            ))}
          </div>
        </div>
      )}

      {/* VPs Grid - show current VP for each committee */}
      <div>
        <div className="grid grid-cols-1 sm:gap-12 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(vpsByCommittee).map(([committee, committeeVps]) => {
            const index = committeeVps.length > 1 ? cycleCount % committeeVps.length : 0;
            const currentVp = committeeVps[index];
            return (
              <OfficerCard
                key={committee}
                officer={currentVp}
                isCycling={committeeVps.length > 1}
                currentIndex={index}
                totalCount={committeeVps.length}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
