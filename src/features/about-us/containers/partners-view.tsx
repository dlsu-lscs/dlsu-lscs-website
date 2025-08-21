import Image from 'next/image';
import PartnerCard from '../components/partner-card';
import partnersData from '../data/partners.json';
import { partners as PartnerType } from '../types/partners';

export default function PartnersView() {
  return (
    <>
      <main className="relative z-20 flex min-h-screen w-full flex-col px-24 py-20 bg-[radial-gradient(circle_at_center,_#f5f5f5_0%,_#d9d9d9_70%,_#b3b3b3_100%)]">
        <Image
          src="/coil.png"
          alt="coil"
          width={175}
          height={175}
          className="absolute -top-20 md:-top-28 right-0 w-[100px] md:w-[175px] h-auto -z-10 md:z-0 antialiased"
        />

        <header className="flex justify-center">
          <h1 className="text-[#003D6F] text-[52px] font-bold text-center">
            <span className="text-[#DDB518]">Our</span> Partners
          </h1>
        </header>
        {/* List of Partners */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mt-16 place-items-center">
          {partnersData.partners.map((partner: PartnerType, index) => (
            <PartnerCard
              key={index}
              partnerName={partner.name}
              partnerLogo={partner.logo}
              partnerLink={partner.link}
            />
          ))}
        </section>
      </main>
    </>
  );
}
