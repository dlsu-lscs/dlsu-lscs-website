import PartnerCard from '../components/partner-card';
import partnersData from '../data/partners.json';
import { partners as PartnerType } from '../types/partners';

export default function PartnersView() {
  return (
    <>
      <div className="flex min-h-screen min-w-screen flex-col px-24 py-20 bg-[radial-gradient(circle_at_center,_#f5f5f5_0%,_#d9d9d9_70%,_#b3b3b3_100%)]">
        <div className="flex justify-center">
          <h1 className="text-[#003D6F] text-[52px] font-bold text-center">
            <span className="text-[#DDB518]">Our</span> Partners
          </h1>
        </div>
        {/* List of Partners */}
        <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mt-16 place-items-center">
          {partnersData.partners.map((partner: PartnerType, index) => (
            <PartnerCard
              key={index}
              partnerName={partner.name}
              partnerLogo={partner.logo}
              partnerLink={partner.link}
            />
          ))}
        </main>
      </div>
    </>
  );
}
