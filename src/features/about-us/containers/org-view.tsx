import ContentCallout from '../components/content-callout';
import GoldHeader from '../components/gold-header';

export default function OrgView() {
  return (
    <>
      <div className="relative z-20 flex flex-col items-center min-h-screen min-w-screen px-24 py-20 bg-[radial-gradient(circle_at_center,_#f5f5f5_0%,_#d9d9d9_70%,_#b3b3b3_100%)]">
        <div className="flex mt-12">
          <div></div>
          <div>
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
        <div className="mt-12">
          <div></div>
          <div>
            <GoldHeader>ONECCS</GoldHeader>
            <ContentCallout>
              ONECCS is the College of Computer Studies Student Council consisting of the University
              Student Government College and Batch Units, and organizations of the Council of
              Student Organizations and the office of the Associate Dean.
            </ContentCallout>
          </div>
        </div>
      </div>
    </>
  );
}
