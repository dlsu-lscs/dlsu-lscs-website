import PressReleaseTemplate from '@/features/home/components/templates/press-release-template';
import ContactUsTemplate from '@/features/home/components/templates/contact-us-template';
import LandingPageTemplate from '@/features/home/components/templates/landing-page-template';
import WhoAreWeTemplate from '@/features/home/components/templates/who-are-we-template';
import { getWebAssets } from '@/features/home/services/getWebAssets';
import DiagonalLscsBg from '@/components/diagonal-lscs-bg';

export default async function Home() {
  const webAssets = await getWebAssets();

  return (
    <div className="relative">
      <DiagonalLscsBg />
      <section className="h-[90dvh]">
        <LandingPageTemplate heroImage={webAssets?.hero.image} />
      </section>
      <section className="min-h-screen">
        <WhoAreWeTemplate whoAreWeImage={webAssets?.whoAreWe.image} />
      </section>
      <section className="min-h-screen">
        <PressReleaseTemplate />
      </section>
      <section className="flex-1">
        <ContactUsTemplate />
      </section>
    </div>
  );
}
