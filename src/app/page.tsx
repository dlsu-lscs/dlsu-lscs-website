import PressReleaseTemplate from '@/features/home/components/templates/press-release-template';
import ContactUsTemplate from '@/features/home/components/templates/contact-us-template';
import LandingPageTemplate from '@/features/home/components/templates/landing-page-template';
import WhoAreWeTemplate from '@/features/home/components/templates/who-are-we-template';
import ScrollAnimation from '@/components/animation/scroll-animation';
import { getWebAssets } from '@/features/home/services/getWebAssets';

export default async function Home() {
  const webAssets = await getWebAssets();

  return (
    <div>
      <ScrollAnimation>
        <section className="snap-start h-[90dvh]">
          <LandingPageTemplate heroImage={webAssets?.hero.image} />
        </section>
      </ScrollAnimation>

      <ScrollAnimation>
        <section className="snap-start h-screen">
          <WhoAreWeTemplate whoAreWeImage={webAssets?.whoAreWe.image} />
        </section>
      </ScrollAnimation>

      <ScrollAnimation>
        <section className="snap-start min-h-screen">
          <PressReleaseTemplate />
        </section>
      </ScrollAnimation>

      <ScrollAnimation>
        <section className="snap-start flex-1">
          <ContactUsTemplate />
        </section>
      </ScrollAnimation>
    </div>
  );
}
