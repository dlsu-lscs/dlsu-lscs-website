import AwardsRecognitionView from '@/features/about-us/containers/awards-recognition-view';
import OrgView from '@/features/about-us/containers/org-view';
import PartnersView from '@/features/about-us/containers/partners-view';
import About from '@/features/about-us/containers/about';
import CoreValuesView from '@/features/about-us/containers/core-values-view';
import ScrollAnimation from '@/components/animation/scroll-animation';

export default function AboutUs() {
  return (
    <>
      <div className="h-screen overflow-y-scroll snap-y snap-mandatory">
        <ScrollAnimation>
          <About />
        </ScrollAnimation>
        <ScrollAnimation>
          <CoreValuesView />
        </ScrollAnimation>
        <ScrollAnimation>
          <AwardsRecognitionView />
        </ScrollAnimation>
        <ScrollAnimation>
          <OrgView />
        </ScrollAnimation>
        <ScrollAnimation>
          <PartnersView />
        </ScrollAnimation>
      </div>
    </>
  );
}
