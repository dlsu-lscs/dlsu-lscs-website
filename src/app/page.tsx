import PressReleaseView from '@/features/home/containers/press-release-view';
import ContactUsPage from '@/features/home/containers/contact-us';
import LandingPage from '@/features/home/containers/landing-page';
import WhoAreWe from '@/features/home/containers/who-are-we';
import ScrollAnimation from '@/components/animation/scroll-animation';

export default function Home() {
  return (
    <>
      <div className="h-screen overflow-y-scroll snap-y snap-mandatory">
        <ScrollAnimation>
          <LandingPage />
        </ScrollAnimation>
        <ScrollAnimation>
          <WhoAreWe />
        </ScrollAnimation>
        <ScrollAnimation>
          <PressReleaseView />
        </ScrollAnimation>
        <ScrollAnimation>
          <ContactUsPage />
        </ScrollAnimation>
      </div>
    </>
  );
}
