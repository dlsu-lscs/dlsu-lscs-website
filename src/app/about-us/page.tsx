import AwardsRecognitionView from '@/features/about-us/containers/awards-recognition-view';
import OrgView from '@/features/about-us/containers/org-view';
import PartnersView from '@/features/about-us/containers/partners-view';
import About from '@/features/about-us/containers/about';
import CoreValuesView from '@/features/about-us/containers/core-values-view';

export default function AboutUs() {
  return (
    <>
      <About />
      <CoreValuesView />
      <AwardsRecognitionView />
      <OrgView />
      <PartnersView />
    </>
  );
}
