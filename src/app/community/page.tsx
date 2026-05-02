import DiagonalLscsBg from '@/components/diagonal-lscs-bg';
import CommunityHero from '@/features/community/components/organism/community-hero';
import OfficersSection from '@/features/community/components/organism/officers-section';
import TestimonialsSection from '@/features/community/components/organism/testimonials-section';
import { getOfficers } from '@/features/community/services/officers-service';
import { getTestimonials } from '@/features/community/services/testimonials-service';

export default async function Community() {
  const officers = await getOfficers();
  const testimonialsData = await getTestimonials();

  return (
    <main className="min-h-screen w-full bg-transparent overflow-x-hidden">
      <DiagonalLscsBg />

      <section className="min-h-screen w-full bg-transparent overflow-x-hidden">
        <CommunityHero />
      </section>

      <OfficersSection officers={officers} />
      <TestimonialsSection testimonialsData={testimonialsData} />
    </main>
  );
}
