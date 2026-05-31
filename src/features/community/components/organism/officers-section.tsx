import OfficerCard from '@/features/community/components/molecules/officer-card';
import CyclingVpGrid from '@/features/community/components/organism/cycling-vp-grid';
import FadeInSection from '@/features/community/components/ui/fade-in-section';
import { Officer } from '@/features/community/types';

interface OfficersSectionProps {
  officers: Officer[];
}

export default function OfficersSection({ officers }: OfficersSectionProps) {
  const groupedByRole: Record<string, Officer[]> = {};
  let president: Officer | undefined;
  const evps: Officer[] = [];

  officers.forEach((officer) => {
    if (officer.position === 'President') {
      president = officer;
      return;
    }

    if (officer.position === 'EVP') {
      evps.push(officer);
      return;
    }

    if (officer.position === 'VP') {
      const key = officer.committeeId || officer.committee;

      if (!groupedByRole[key]) {
        groupedByRole[key] = [];
      }

      groupedByRole[key].push(officer);
    }
  });

  return (
    <section className="mx-auto max-w-7xl px-4 py-20" id="officers-section">
      {/* Section header */}
      <FadeInSection className="flex flex-col items-center gap-4 mb-14">
        <span className="text-white font-Poppins font-bold text-sm tracking-widest uppercase rounded-full py-2 px-8 bg-linear-180 from-[#ddb518] to-[#77610d] shadow-md shadow-[#ddb518]/15">
          COMMUNITY
        </span>
        <h2 className="text-center text-5xl font-extrabold font-Poppins tracking-tight">
          BEYOND MEMBERSHIP
        </h2>
        <p className="text-lg text-center text-muted-foreground max-w-lg">
          Meet the present Officers per committee:
        </p>
      </FadeInSection>

      {/* President - prominent display */}
      {president && (
        <FadeInSection delay={0.1} className="mb-14 flex justify-center">
          <div className="w-full max-w-sm">
            <OfficerCard officer={president} isPresident />
          </div>
        </FadeInSection>
      )}

      {/* EVPs Grid */}
      {evps.length > 0 && (
        <FadeInSection delay={0.2} className="mb-14">
          <div className="grid grid-cols-1 sm:gap-12 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {evps.map((officer) => (
              <OfficerCard key={officer.id} officer={officer} />
            ))}
          </div>
        </FadeInSection>
      )}

      {/* VPs Grid - show current VP for each committee */}
      <FadeInSection delay={0.15}>
        <CyclingVpGrid vpsByCommittee={groupedByRole} />
      </FadeInSection>
    </section>
  );
}
