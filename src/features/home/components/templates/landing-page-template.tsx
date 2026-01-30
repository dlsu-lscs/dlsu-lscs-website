import DiagonalLscsBg from '@/components/diagonal-lscs-bg';
import HeroSection from '../molecules/hero-section';
import { CmsImage } from '../../services/getWebAssets';

interface LandingPageTemplateProps {
  heroImage?: CmsImage;
}

export default function LandingPageTemplate({ heroImage }: LandingPageTemplateProps) {
  return (
    <div className="h-full flex flex-col p-8 gap-8 relative">
      {/* Background image with fade effect */}
      <DiagonalLscsBg />

      <HeroSection heroImage={heroImage} />
    </div>
  );
}
