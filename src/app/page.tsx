import PressReleaseTemplate from '@/features/home/components/templates/press-release-template';
import ContactUsTemplate from '@/features/home/components/templates/contact-us-template';
import LandingPageTemplate from '@/features/home/components/templates/landing-page-template';
import WhoAreWeTemplate from '@/features/home/components/templates/who-are-we-template';
import ScrollAnimation from '@/components/animation/scroll-animation';

export default function Home() {
  return (
    <div>
      <ScrollAnimation>
        <section className="snap-start h-[90dvh]">
          <LandingPageTemplate />
        </section>
      </ScrollAnimation>

      <ScrollAnimation>
        <section className="snap-start h-screen">
          <WhoAreWeTemplate />
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
