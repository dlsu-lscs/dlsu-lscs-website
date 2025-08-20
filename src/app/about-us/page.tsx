import OrgView from '@/features/about-us/containers/org-view';
import PartnersView from '@/features/about-us/containers/partners-view';
import About from '@/features/about-us/section/about';

export default function AboutUs() {
  return (
    <>
      <About />
      <OrgView />
      <PartnersView />
    </>
  );
}
