import ContentCallout from '../components/content-callout';
import GoldHeader from '../components/gold-header';

export default function OrgView() {
  return (
    <>
      <div className="relative z-20 flex min-h-screen min-w-screen flex-col px-24 py-20 bg-[radial-gradient(circle_at_center,_#f5f5f5_0%,_#d9d9d9_70%,_#b3b3b3_100%)]">
        <div>
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
        <div>
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
      </div>
    </>
  );
}
