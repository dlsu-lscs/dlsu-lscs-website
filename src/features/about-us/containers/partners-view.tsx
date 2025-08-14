import PartnerCard from '../components/partner-card';
import partnersData from '../data/partners.json';
import { partners as PartnerType } from '../types/partners';

export default function PartnersView() {
  return (
    <>
      <div className="flex min-h-screen min-w-screen flex-col px-24 py-20 bg-[radial-gradient(circle_at_center,_#f5f5f5_0%,_#d9d9d9_70%,_#b3b3b3_100%)]">
        <div className="flex justify-center">
          <h1 className="text-[#003D6F] text-[52px] font-bold">
            <span className="text-[#DDB518]">Our</span> Partners
          </h1>
        </div>
        {/* List of Partners */}
        <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-16 mt-16">
          {partnersData.partners.map((partner: PartnerType, index: number) => {
            return (
              <PartnerCard key={index} partnerName={partner.name} partnerLogo={partner.logo} />
            );
          })}
        </main>
      </div>
    </>
  );
}
