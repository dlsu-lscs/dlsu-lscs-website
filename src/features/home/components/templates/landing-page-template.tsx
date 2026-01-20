import DiagonalLscsBg from '@/components/diagonal-lscs-bg';
import HeroSection from '../molecules/hero-section';

export default function LandingPageTemplate() {
  return (
    <div className="h-full flex flex-col p-8 gap-8 relative">
      {/* Background image with fade effect */}
      <DiagonalLscsBg />

      <HeroSection />
    </div>
  );
}
