import PressReleaseTemplate from '@/features/home/components/templates/press-release-template';
import ContactUsTemplate from '@/features/home/components/templates/contact-us-template';
import LandingPageTemplate from '@/features/home/components/templates/landing-page-template';
import WhoAreWeTemplate from '@/features/home/components/templates/who-are-we-template';
import ScrollAnimation from '@/components/animation/scroll-animation';

export default function Home() {
  return (
    <div className="overflow-y-scroll snap-y snap-mandatory min-h-[100dvh]">
      <ScrollAnimation>
        <section className="snap-start min-h-screen">
          <LandingPageTemplate />
        </section>
      </ScrollAnimation>

      <ScrollAnimation>
        <section className="snap-start min-h-screen">
          <WhoAreWeTemplate />
        </section>
      </ScrollAnimation>

      <ScrollAnimation>
        <section className="snap-start min-h-screen">
          <PressReleaseTemplate />
        </section>
      </ScrollAnimation>

      <ScrollAnimation>
        <section className="snap-start min-h-screen">
          <ContactUsTemplate />
        </section>
      </ScrollAnimation>
    </div>
  );
}
