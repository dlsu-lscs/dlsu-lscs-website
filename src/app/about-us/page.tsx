import OrgView from '@/features/about-us/containers/org-view';
import PartnersView from '@/features/about-us/containers/partners-view';
import About from '@/features/about-us/section/about';
import WhatWeDo from '@/features/about-us/containers/what-we-do';

export default function AboutUs() {
  return (
    <>
      <About />
      <WhatWeDo />
      <OrgView />
      <PartnersView />
    </>
  );
}
