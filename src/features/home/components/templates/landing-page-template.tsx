import DiagonalLscsBg from '@/components/diagonal-lscs-bg';
import HeroSection from '../molecules/hero-section';

export default function LandingPageTemplate() {
  return (
    <div className="min-h-screen flex flex-col p-8 gap-8 relative">
      {/* Background image with fade effect */}
      <DiagonalLscsBg />

      {/* TEMPORARY NAV */}
      <nav className="h-12 bg-[#002D57] max-w-7xl w-full rounded-xl mx-auto"></nav>

      <HeroSection />
    </div>
  );
}
