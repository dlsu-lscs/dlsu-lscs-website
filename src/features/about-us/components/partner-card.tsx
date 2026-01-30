import Image from 'next/image';
import { CmsPartner } from '../types/partners';

type PartnerCardProps = {
  partner: CmsPartner;
};

export default function PartnerCard({ partner }: PartnerCardProps) {
  return (
    <div className="w-full sm:w-[280px] md:w-[300px] h-auto sm:h-[360px] bg-[radial-gradient(circle_at_center,_#f5f5f5_0%,_#e5e5e5_70%,_#d9d9d9_100%)] rounded-xl shadow-[12px_12px_28px_rgba(0,0,0,0.18),-6px_-6px_18px_rgba(255,255,255,0.9)] flex flex-col items-center justify-center gap-2 p-4 sm:p-6 overflow-hidden">
      <div className="w-[120px] sm:w-[160px] md:w-[210px] h-[120px] sm:h-[160px] md:h-[210px] relative flex items-center justify-center">
        <Image
          src={partner.image.url}
          fill
          alt={partner.image.alt || partner.name}
          className="object-contain"
          sizes="(max-width: 640px) 120px, (max-width: 768px) 160px, 210px"
        />
      </div>
      <h1 className="font-bold text-base sm:text-xl bg-gradient-to-b from-gray-900 to-gray-500 bg-clip-text text-transparent text-center break-words max-w-[150px] sm:max-w-[200px]">
        {partner.name}
      </h1>
    </div>
  );
}
