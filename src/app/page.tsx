import PressReleaseView from '@/features/home/containers/press-release-view';
import ContactUsPage from '@/features/home/containers/contact-us';
import LandingPage from '@/features/home/containers/landing-page';
import WhoAreWe from '@/features/home/containers/who-are-we';

export default function Home() {
  return (
    <>
      <LandingPage />
      <WhoAreWe />
      <PressReleaseView />
      <ContactUsPage />
    </>
  );
}
