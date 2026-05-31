import HeroSection from '../molecules/hero-section';
import { CmsImage } from '../../services/getWebAssets';

interface LandingPageTemplateProps {
  heroImage?: CmsImage;
}

export default function LandingPageTemplate({ heroImage }: LandingPageTemplateProps) {
  return (
    <div className="h-full flex flex-col sm:p-8 p-0 gap-8">
      {/* Background image with fade effect */}
      <HeroSection heroImage={heroImage} />
    </div>
  );
}
