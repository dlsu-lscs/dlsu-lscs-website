import Image from 'next/image';

type PartnerCardProps = {
  partnerName?: string;
  partnerLogo?: string;
};

export default function PartnerCard({ partnerName, partnerLogo }: PartnerCardProps) {
  return (
    <>
      <div className="min-w-[260px] min-h-[280px] bg-[radial-gradient(circle_at_center,_#f5f5f5_0%,_#e5e5e5_70%,_#d9d9d9_100%)] rounded-xl shadow-[12px_12px_28px_rgba(0,0,0,0.18),-6px_-6px_18px_rgba(255,255,255,0.9)] flex flex-col items-center justify-center gap-2 p-6">
        <Image src={partnerLogo || '/cso.png'} width={180} height={180} alt="Partner Logo" />
        <h1 className="font-bold text-md sm:text-lg md:text-xl bg-gradient-to-b from-gray-900 to-gray-500 bg-clip-text text-transparent text-center break-words max-w-[200px]">
          {partnerName || 'Partner'}
        </h1>
      </div>
    </>
  );
}
