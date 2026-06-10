import AwardsRecognitionView from '@/features/about-us/containers/awards-recognition-view';
import OrgView from '@/features/about-us/containers/org-view';
import PartnersView from '@/features/about-us/containers/partners-view';
import VisionMission from '@/features/about-us/containers/vision-mission';
import About from '@/features/about-us/containers/about';
import CoreValuesView from '@/features/about-us/containers/core-values-view';
import WhatWeDo from '@/features/about-us/containers/what-we-do';
import { getAwards } from '@/features/about-us/services/getAwards';
import { getWebAssets } from '@/features/home/services/getWebAssets';

export default async function AboutUs() {
  const awards = await getAwards();
  const webAssets = await getWebAssets();

  return (
    <div>
      <section className="">
        <About aboutImages={webAssets?.about.images} />
      </section>

      <section className="min-h-screen">
        <WhatWeDo whatWeDoImages={webAssets?.whatWeDo} />
      </section>

      <section className="min-h-screen">
        <VisionMission />
      </section>

      <section className="min-h-screen">
        <CoreValuesView />
      </section>

      <section className="min-h-screen">
        <AwardsRecognitionView awards={awards} />
      </section>

      <section className="min-h-screen">
        <OrgView />
      </section>

      <section className="min-h-screen">
        <PartnersView />
      </section>
    </div>
  );
}
