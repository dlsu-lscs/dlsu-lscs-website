import AwardsRecognitionView from '@/features/about-us/containers/awards-recognition-view';
import OrgView from '@/features/about-us/containers/org-view';
import PartnersView from '@/features/about-us/containers/partners-view';
import VisionMission from '@/features/about-us/containers/vision-mission';
import About from '@/features/about-us/containers/about';
import CoreValuesView from '@/features/about-us/containers/core-values-view';
import WhatWeDo from '@/features/about-us/containers/what-we-do';
import ScrollAnimation from '@/components/animation/scroll-animation';
import { getAwards } from '@/features/about-us/services/getAwards';
import { getWebAssets } from '@/features/home/services/getWebAssets';

export default async function AboutUs() {
  const awards = await getAwards();
  const webAssets = await getWebAssets();

  return (
    <div>
      <ScrollAnimation>
        <section className="snap-start ">
          <About aboutImages={webAssets?.about.images} />
        </section>
      </ScrollAnimation>

      <ScrollAnimation>
        <section className="snap-start min-h-screen">
          <WhatWeDo whatWeDoImages={webAssets?.whatWeDo} />
        </section>
      </ScrollAnimation>

      <ScrollAnimation>
        <section className="snap-start min-h-screen">
          <VisionMission />
        </section>
      </ScrollAnimation>

      <ScrollAnimation>
        <section className="snap-start min-h-screen">
          <CoreValuesView />
        </section>
      </ScrollAnimation>

      <ScrollAnimation>
        <section className="snap-start min-h-screen">
          <AwardsRecognitionView awards={awards} />
        </section>
      </ScrollAnimation>

      <ScrollAnimation>
        <section className="snap-start min-h-screen">
          <OrgView />
        </section>
      </ScrollAnimation>

      <ScrollAnimation>
        <section className="snap-start min-h-screen">
          <PartnersView />
        </section>
      </ScrollAnimation>
    </div>
  );
}
