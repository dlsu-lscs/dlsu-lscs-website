import PressReleaseTemplate from '@/features/home/components/templates/press-release-template';
import ContactUsTemplate from '@/features/home/components/templates/contact-us-template';
import LandingPageTemplate from '@/features/home/components/templates/landing-page-template';
import WhoAreWeTemplate from '@/features/home/components/templates/who-are-we-template';
import ScrollAnimation from '@/components/animation/scroll-animation';

export default function Home() {
  return (
    <>
      <div className="h-screen overflow-y-scroll snap-y snap-mandatory">
        <ScrollAnimation>
          <LandingPageTemplate />
        </ScrollAnimation>
        <ScrollAnimation>
          <WhoAreWeTemplate />
        </ScrollAnimation>
        <ScrollAnimation>
          <PressReleaseTemplate />
        </ScrollAnimation>
        <ScrollAnimation>
          <ContactUsTemplate />
        </ScrollAnimation>
      </div>
    </>
  );
}
