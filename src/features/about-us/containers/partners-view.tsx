import Image from 'next/image';
import PartnerCard from '../components/partner-card';
import { getPartners } from '../services/getPartners';
import ScrollAnimation from '@/components/animation/scroll-animation';

export default async function PartnersView() {
  const partners = await getPartners();

  return (
    <>
      <main className="relative z-20 flex min-h-screen w-full flex-col px-6 sm:px-12 md:px-24 py-12 sm:py-16 md:py-20 bg-linear-to-b from-[#f5f5f5] via-[#d9d9d9] to-[#b3b3b3]">
        <ScrollAnimation className="absolute -top-12 sm:-top-16 md:-top-28 right-0 w-18 sm:w-30 md:w-44 h-auto -z-10 md:z-0">
          <Image
            src="/coil.png"
            alt="coil"
            width={175}
            height={0}
            className="w-full h-auto antialiased"
          />
        </ScrollAnimation>

        <ScrollAnimation>
          <div>
            <header className="flex justify-center">
              <h1 className="text-[#003D6F] text-3xl sm:text-4xl md:text-[52px] font-bold text-center">
                <span className="text-[#DDB518]">Our</span> Partners
              </h1>
            </header>
            <h2 className="text-center text-xl font-semibold font-geist mt-2">For AY 2025-2026</h2>
          </div>
        </ScrollAnimation>

        {/* List of Partners */}
        <div className="w-full mt-12 sm:mt-16">
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 w-full">
            {partners && partners.length > 0 ? (
              partners.map((partner, index) => (
                <ScrollAnimation
                  key={partner.id}
                  className="flex justify-center"
                  delay={(index % 4) * 0.05}
                  viewportAmount={0.1}
                >
                  <PartnerCard partner={partner} />
                </ScrollAnimation>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-600">
                No partners available at the moment.
              </p>
            )}
          </section>
        </div>
      </main>
    </>
  );
}
