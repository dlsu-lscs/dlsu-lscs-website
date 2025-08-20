import ContentCallout from '../components/content-callout';
import GoldHeader from '../components/gold-header';

export default function OrgView() {
  return (
    <>
      <main className="relative z-20 min-h-screen w-full px-6 md:px-24 py-24 bg-[radial-gradient(circle_at_center,_#f5f5f5_0%,_#d9d9d9_70%,_#b3b3b3_100%)]">
        {/* CSO */}
        <section className="mt-12">
          <div className="flex flex-col md:flex-row justify-center items-center gap-16">
            <img src="/cso.png" alt="cso logo" className="w-72 md:w-80 h-auto" />
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
        <section className="mt-12">
          <div className="flex flex-col md:flex-row justify-center items-center gap-16">
            <div className="max-w-2xl text-center md:text-left order-2 md:order-1">
              <GoldHeader>ONECCS</GoldHeader>
              <ContentCallout>
                ONECCS is the College of Computer Studies Student Council consisting of the
                University Student Government College and Batch Units, and organizations of the
                Council of Student Organizations and the office of the Associate Dean.
              </ContentCallout>
            </div>
            <img
              src="/oneccs.png"
              alt="oneccs logo"
              className="w-48 md:w-56 h-auto antialiased order-1 md:order-2"
            />
          </div>
        </section>
      </main>
    </>
  );
}
