import Link from 'next/link';
import Image from 'next/image';
import { Url, UrlObject } from 'url';

type PartnerCardProps = {
  partnerName?: string;
  partnerLogo?: string;
  partnerLink: Url | string | UrlObject;
};

export default function PartnerCard({ partnerName, partnerLogo, partnerLink }: PartnerCardProps) {
  return (
    <>
      <Link
        href={partnerLink}
        className="w-full sm:w-[280px] md:w-[300px] h-auto sm:h-[360px] bg-[radial-gradient(circle_at_center,_#f5f5f5_0%,_#e5e5e5_70%,_#d9d9d9_100%)] rounded-xl shadow-[12px_12px_28px_rgba(0,0,0,0.18),-6px_-6px_18px_rgba(255,255,255,0.9)] flex flex-col items-center justify-center gap-2 p-4 sm:p-6 overflow-hidden"
      >
        <div className="w-[120px] sm:w-[160px] md:w-[210px] h-[120px] sm:h-[160px] md:h-[210px] relative flex items-center justify-center">
          <Image
            src={partnerLogo || '/cso.png'}
            fill
            alt="Partner Logo"
            className="object-contain"
          />
        </div>
        <h1 className="font-bold text-base sm:text-xl bg-gradient-to-b from-gray-900 to-gray-500 bg-clip-text text-transparent text-center break-words max-w-[150px] sm:max-w-[200px]">
          {partnerName || 'Partner'}
        </h1>
      </Link>
    </>
  );
}
