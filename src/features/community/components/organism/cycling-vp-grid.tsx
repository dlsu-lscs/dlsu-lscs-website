'use client';

import * as React from 'react';
import OfficerCard from '@/features/community/components/molecules/officer-card';
import { Officer } from '@/features/community/types';

interface CyclingVpGridProps {
  vpsByCommittee: Record<string, Officer[]>;
}

export default function CyclingVpGrid({ vpsByCommittee }: CyclingVpGridProps) {
  const [cycleCount, setCycleCount] = React.useState(0);

  const committeeEntries = Object.entries(vpsByCommittee);
  const hasMultipleVps = committeeEntries.some(([, committeeVps]) => committeeVps.length > 1);

  React.useEffect(() => {
    if (!hasMultipleVps) {
      return;
    }

    const interval = setInterval(() => {
      setCycleCount((prev) => prev + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, [hasMultipleVps]);

  return (
    <div className="grid grid-cols-1 sm:gap-12 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {committeeEntries.map(([committee, committeeVps]) => {
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
  );
}
