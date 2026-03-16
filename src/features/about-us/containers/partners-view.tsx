import Image from 'next/image';
import PartnerCard from '../components/partner-card';
import { getPartners } from '../services/getPartners';

export default async function PartnersView() {
  const partners = await getPartners();

  return (
    <>
      <main className="relative z-20 flex min-h-screen w-full flex-col px-6 sm:px-12 md:px-24 py-12 sm:py-16 md:py-20 bg-[radial-gradient(circle_at_center,_#f5f5f5_0%,_#d9d9d9_70%,_#b3b3b3_100%)]">
        <Image
          src="/coil.png"
          alt="coil"
          width={175}
          height={175}
          className="absolute -top-12 sm:-top-16 md:-top-28 right-0 w-18.75 sm:w-30 md:w-43.75 h-auto -z-10 md:z-0 antialiased"
        />

        <header className="flex justify-center">
          <h1 className="text-[#003D6F] text-3xl sm:text-4xl md:text-[52px] font-bold text-center">
            <span className="text-[#DDB518]">Our</span> Partners
          </h1>
        </header>
        <h3 className="text-center text-xl font-semibold">For AY 2025-2026</h3>

        {/* List of Partners */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 mt-12 sm:mt-16">
          {partners && partners.length > 0 ? (
            partners.map((partner) => (
              <div key={partner.id} className="flex justify-center">
                <PartnerCard partner={partner} />
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600">
              No partners available at the moment.
            </p>
          )}
        </section>
      </main>
    </>
  );
}
