import Image from 'next/image';
import ContentCallout from '../components/content-callout';
import GoldHeader from '../components/gold-header';
import ScrollAnimation from '@/components/animation/scroll-animation';

export default function OrgView() {
  return (
    <>
      <main className="relative z-20 min-h-screen w-full px-6 md:px-24 py-24 overflow-visible bg-linear-to-b from-[#f5f5f5] via-[#d9d9d9] to-[#b3b3b3]">
        <ScrollAnimation className="absolute -top-28 md:-top-36 right-0 z-0 w-50 md:w-75 h-auto pointer-events-none select-none">
          <Image
            src="/virus.png"
            alt="virus"
            width={280}
            height={0}
            className="w-full h-auto object-contain antialiased"
          />
        </ScrollAnimation>

        {/* CSO */}
        <ScrollAnimation className="mt-12">
          <section className="w-full">
            <h2 className="mx-auto text-center text-2xl font-bold font-onest bg-linear-to-b from-[#1A5D89] to-[#001E3B] bg-clip-text text-transparent">
              La Salle Computer Society
            </h2>
            <h3 className="mx-auto mb-4  text-center text-sm md:text-xl font-geist text-black">
              belongs to the following{' '}
              <span className="font-bold bg-linear-to-b from-[rgba(221,181,24,0.9)] to-[rgba(119,97,13,0.9)] bg-clip-text text-transparent">
                student organization
              </span>{' '}
              groups
            </h3>

            <div className="flex flex-col md:flex-row justify-center items-center gap-16">
              <Image
                src="/cso.png"
                alt="cso logo"
                width={480}
                height={0}
                className="w-72 md:w-80 h-auto antialiased"
              />
              <div className="max-w-2xl text-center md:text-left">
                <GoldHeader>Council of Student Organizations</GoldHeader>
                <ContentCallout>
                  The Council of Student Organizations (CSO) is the union of 42 accredited student
                  organizations, categorized as professional, special interest and the socio-civic
                  organizations, of De La Salle University Manila. Since its founding in 1974, the
                  Council continuously delivered quality student services and produced outstanding
                  student leaders dedicated to serving the Lasallian community.
                </ContentCallout>
              </div>
            </div>
          </section>
        </ScrollAnimation>

        {/* ONE CCS*/}
        <ScrollAnimation className="mt-6" delay={0.15}>
          <section className="w-full">
            <div className="flex flex-col md:flex-row justify-center items-center gap-16">
              <div className="max-w-2xl text-center md:text-left order-2 md:order-1">
                <GoldHeader>ONECCS</GoldHeader>
                <ContentCallout>
                  ONECCS is the College of Computer Studies Student Council consisting of the
                  University Student Government College and Batch Units, and organizations of the
                  Council of Student Organizations and the office of the Associate Dean.
                </ContentCallout>
              </div>
              <Image
                src="/oneccs.png"
                alt="oneccs logo"
                width={224}
                height={0}
                className="w-44 md:w-54 h-auto antialiased order-1 md:order-2"
              />
            </div>
          </section>
        </ScrollAnimation>
      </main>
    </>
  );
}
