import Image from 'next/image';
import ContentCallout from '../components/content-callout';
import GoldHeader from '../components/gold-header';

export default function OrgView() {
  return (
    <>
      <main className="relative z-20 min-h-screen w-full px-6 md:px-24 py-24 bg-[radial-gradient(circle_at_center,#f5f5f5_0%,#d9d9d9_70%,#b3b3b3_100%)]">
        <Image
          src="/virus.png"
          alt="virus"
          width={280}
          height={280}
          className="absolute -top-28 md:-top-36 right-0 w-50 md:w-75 h-auto -z-10 md:z-0 antialiased"
        />

        {/* CSO */}
        <section className="mt-12">
          <h2 className="mx-auto text-center text-2xl font-bold font-onest bg-linear-to-b from-[#1A5D89] to-[#001E3B] bg-clip-text text-transparent">
            La Salle Computer Society
          </h2>
          <h4 className="mx-auto mb-4  text-center text-sm md:text-xl font-geist text-black]">
            belongs to the following{' '}
            <span className="font-bold bg-linear-to-b from-[rgba(221,181,24,0.9)] to-[rgba(119,97,13,0.9)] bg-clip-text text-transparent">
              student organization
            </span>{' '}
            groups
          </h4>

          <div className="flex flex-col md:flex-row justify-center items-center gap-16">
            <Image
              src="/cso.png"
              alt="cso logo"
              width={320}
              height={320}
              className="w-72 md:w-80 h-auto"
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

        {/* ONE CCS*/}
        <section className="mt-6">
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
              height={224}
              className="w-48 md:w-56 h-auto antialiased order-1 md:order-2"
            />
          </div>
        </section>
      </main>
    </>
  );
}
